# react-three-context

Context & provider to integrate vanilla three.js in your React app.

## Reasoning

I like the usability of React for building user interfaces, but when it comes to three.js scenes, I prefer an imperative approach to the declarative one used by `react-three-fiber`.

This context / provider allows you to build your three.js scene in vanilla js, and use it in your React application.

## Usage

Wrap your component / app in a `ThreeProvider`, passing a `script` prop:

```js
import { ThreeProvider } from "react-three-context";

<ThreeProvider script={threeScript} initialColor="red">
  <App />
</ThreeProvider>
```

A script is nothing more than an arrow function (or a class) which returns (at least) two methods `init` and `update`: `init` will be called on provider mount, while `update` will be called on each frame.

A `canvas` prop will be available in the `init` function, alongside with any other prop passed to the `ThreeProvider`. Passing a custom `canvas` prop will override the built-in canvas reference (Useful if you want to pass a ref to your own canvas).

`init` can be an async function.

```js
import {
  BoxGeometry,
  Mesh,
  MeshNormalMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

const threeScript = () => {
  let renderer, scene, camera, box;
  return {
    init: (props) => {
      const { canvas, initialColor } = props;

      renderer = new WebGLRenderer({
        antialias: true,
        canvas: canvas,
      });

      scene = new Scene();
      camera = new PerspectiveCamera();
      camera.position.z = 4;

      box = new Mesh(
        new BoxGeometry(), 
        new MeshBasicMaterial({ color: new Color(initialColor)})
      );
      scene.add(box);
    },

    update: () => {
      renderer.render(scene, camera);
    },

    changeColor: () => {
      box.material.color = new Color(
        math.random(), 
        math.random(), 
        math.random()
      );
    }
  };
};

```

The built-in canvas will then be exported as a React component in the context as `ThreeCanvas`, alongside with any functions / parameters returned by the script passed to the `ThreeProvider`. Those can be accessed by using the convenience `useThree` hook.

Any props passed to `ThreeCanvas` will be passed on the canvas element, allowing you to style it.

```js
import { useThree } from "react-three-context";

const App = () => {
  const { ThreeCanvas, changeColor } = useThree();

  return (
    <div>
      <p>Hello Three.js app!</p>
      <button onClick={changeColor}>Change Color</button>
      <ThreeCanvas className="fullscreen"/>
    </div>
  );
};
```

## Support [![Buy me a coffee](https://img.shields.io/badge/-buy%20me%20a%20coffee-lightgrey?style=flat&logo=buy-me-a-coffee&color=FF813F&logoColor=white "Buy me a coffee")](https://www.buymeacoffee.com/leoncvlt)
If this tool has proven useful to you, consider [buying me a coffee](https://www.buymeacoffee.com/leoncvlt) to support development of this and [many other projects](https://github.com/leoncvlt?tab=repositories).