import { ThreeProvider, useThree } from "../../src/ThreeContext";
import threeScript from "./css-renderer-three";

import styles from "./css-renderer.module.css";

const Content = () => {
  const three = useThree();
  const { ThreeCanvas } = three;

  return (
    <div className={styles.renderers}>
      <ThreeCanvas className={styles.canvas} />
      {/* CSS renderer will be appended here */}
    </div>
  );
};

const BasicExample = () => {
  return (
    <ThreeProvider script={threeScript}>
      <p>
        CSS renderer example, instantiating a CSS canvas with absolute positioning overlapping the
        3D one in the ThreeContext script.
      </p>
      <Content />
    </ThreeProvider>
  );
};

export default BasicExample;
