import { useRef } from "react/cjs/react.production.min";
import { ThreeProvider, useThree } from "../../src/ThreeContext";
import threeScript from "./css-example-three";

import "./css-example.css";

const Content = () => {
  const three = useThree();
  const { ThreeCanvas } = three;

  return (
    <div className="renderers">
      <ThreeCanvas />
      {/* CSS renderer will be appended here */}
    </div>
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
