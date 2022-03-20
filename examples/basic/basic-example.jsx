import { ThreeProvider, useThree } from "../../src/ThreeContext";
import threeScript from "./basic-three";

import "./basic-example.css";

const Content = () => {
  const three = useThree();
  const { ThreeCanvas, changeSpeed } = three;

  return (
    <section>
      <button onClick={() => changeSpeed()}>Change Speed</button>
      <ThreeCanvas />
    </section>
  );
};

const BasicExample = () => {
  return (
    <ThreeProvider script={threeScript}>
      <main>
        <p>Context / provider / hook to integrate vanilla three.js in your React app</p>
        <Content />
      </main>
    </ThreeProvider>
  );
};

export default BasicExample;
