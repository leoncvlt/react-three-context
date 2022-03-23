import { ThreeProvider, useThree } from "../../src/ThreeContext";
import threeScript from "./basic-three";

import styles from "./basic-example.module.css";

const Content = () => {
  const three = useThree();
  const { ThreeCanvas, changeSpeed } = three;

  return (
    <>
      <button onClick={() => changeSpeed()}>Change Speed</button>
      <ThreeCanvas className={styles.canvas} />
    </>
  );
};

const BasicExample = () => {
  return (
    <ThreeProvider script={threeScript}>
      <p>Basic react component → three scene communication example</p>
      <Content />
    </ThreeProvider>
  );
};

export default BasicExample;
