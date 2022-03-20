import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export default () => {
  let renderer, scene, clock, camera, box, speed;
  return {
    init: (props) => {
      const { canvas } = props;

      renderer = new WebGLRenderer({
        antialias: true,
        canvas: canvas,
      });
      renderer.setPixelRatio(window.devicePixelRatio);

      clock = new Clock();
      scene = new Scene();
      camera = new PerspectiveCamera();
      camera.position.z = 4;

      box = new Mesh(new BoxGeometry(), new MeshNormalMaterial());
      scene.add(box);

      speed = 1;
    },

    update: () => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      const needResize = canvas.width !== width || canvas.height !== height;
      if (needResize) {
        renderer.setSize(width, height, false);
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      const delta = clock.getDelta();
      box.rotateY(delta * speed);

      renderer.render(scene, camera);
    },

    changeSpeed: () => {
      speed = Math.random() * 10 - 5;
    },
  };
};
