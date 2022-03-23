import { useEffect, useState } from "react";
import { ThreeProvider, useThree } from "../../src/ThreeContext";
import { BoxScene, TorusKnotScene, TorusScene } from "./faux-routing-three";

import styles from "./faux-routing.module.css";

const Content = () => {
  const three = useThree();
  const { ThreeCanvas } = three;

  return <ThreeCanvas className={styles.canvas} />;
};

const FauxRoutingExample = () => {
  const scenes = {
    box: BoxScene,
    torus: TorusScene,
    knot: TorusKnotScene,
  };

  const hash = window.location.hash.replace("#", "");
  const [currentScene, setCurrentScene] = useState(hash in scenes ? hash : Object.keys(scenes)[0]);

  const handleHashChange = () => {
    const hash = window.location.hash.replace("#", "");
    if (hash in scenes) {
      setCurrentScene(hash);
    }
  };

  useEffect(() => {
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <ThreeProvider script={scenes[currentScene]}>
      <p>
        Dynamic script on "route" change example (using URL hash). Also shows how ThreeContext
        scripts can be defined as Classes (check example sourcecode)
      </p>
      <a className={styles.link} href="#box">Box</a>
      <a className={styles.link} href="#torus">Torus</a>
      <a className={styles.link} href="#knot">Knot</a>
      <Content />
    </ThreeProvider>
  );
};

export default FauxRoutingExample;
