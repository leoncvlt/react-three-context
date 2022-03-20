import { TorusKnotGeometry } from "three";
import { Vector3 } from "three";
import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default () => {
  let renderer, cssRenderer, controls, scene, clock, camera, box, torus;
  return {
    init: (props) => {
      const { canvas } = props;

      renderer = new WebGLRenderer({
        antialias: true,
        canvas: canvas,
      });
      renderer.setPixelRatio(window.devicePixelRatio);

      cssRenderer = new CSS2DRenderer();
      Object.assign(cssRenderer.domElement.style, {
        pointerEvents: "none",
        position: "absolute",
        top: 0,
      });
      renderer.domElement.parentElement.appendChild(cssRenderer.domElement);

      clock = new Clock();
      scene = new Scene();
      camera = new PerspectiveCamera();
      camera.position.z = 10;
      
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;

      const createLabel = ({ text, target }) => {
        const label = new CSS2DObject();
        label.element.textContent = text;
        label.element.classList.add("label");
        label.position.copy(target.position.clone());
        return label;
      };

      box = new Mesh(new BoxGeometry(2, 2, 2), new MeshNormalMaterial());
      box.position.x = -2;
      scene.add(box);
      scene.add(createLabel({ text: "Box", target: box }));

      torus = new Mesh(new TorusKnotGeometry(), new MeshNormalMaterial());
      torus.position.x = 2;
      scene.add(torus);
      scene.add(createLabel({ text: "Torus", target: torus }));
    },

    update: () => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
        cssRenderer.setSize(width, height, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      const delta = clock.getDelta();
      box.rotateY(delta);
      torus.rotateY(delta);

      controls.update();

      renderer.render(scene, camera);
      cssRenderer.render(scene, camera);
    },
  };
};
