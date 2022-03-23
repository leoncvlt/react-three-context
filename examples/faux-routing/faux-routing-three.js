import { TorusGeometry } from "three";
import { TorusKnotGeometry } from "three";
import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

class ThreeScene {
  init({ canvas }) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      canvas: canvas,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);

    this.clock = new Clock();
    this.scene = new Scene();
    this.camera = new PerspectiveCamera();
    this.camera.position.z = 10;
  }

  update() {
    const canvas = this.renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = canvas.clientWidth / canvas.clientHeight;
      this.camera.updateProjectionMatrix();
    }

    this.renderer.render(this.scene, this.camera);
  }
}

export class BoxScene extends ThreeScene {
  init(props) {
    super.init(props);
    this.box = new Mesh(new BoxGeometry(2, 2, 2), new MeshNormalMaterial());
    this.scene.add(this.box);
  }

  update() {
    super.update();
    const delta = this.clock.getDelta();
    this.box.rotateY(delta);
  }
}

export class TorusScene extends ThreeScene {
  init(props) {
    super.init(props);
    this.torus = new Mesh(new TorusGeometry(1, 0.5, 8, 16), new MeshNormalMaterial());
    this.scene.add(this.torus);
  }

  update() {
    super.update();
    const delta = this.clock.getDelta();
    this.torus.rotateY(delta);
  }
}

export class TorusKnotScene extends ThreeScene {
  init(props) {
    super.init(props);
    this.torus = new Mesh(new TorusKnotGeometry(), new MeshNormalMaterial());
    this.scene.add(this.torus);
  }

  update() {
    super.update();
    const delta = this.clock.getDelta();
    this.torus.rotateY(delta);
  }
}
