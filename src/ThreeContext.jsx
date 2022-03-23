import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

export const ThreeContext = createContext();

export const ThreeProvider = ({ script, children, canvas, ...props }) => {
  const [initialized, setInitialized] = useState(false);
  const three = useMemo(
    () => (!!script.prototype?.constructor ? new script() : script()),
    [script]
  );

  const threeCanvas = useCallback(async (node) => {
    if (!three?.init || !node) {
      return null;
    }
    await three.init({ props, canvas: node });
    setInitialized(true);
  });

  useEffect(() => {
    if (!three?.update || !initialized) {
      return null;
    }

    const update = () => {
      three.update();
      requestAnimationFrame(update);
    };
    const loop = requestAnimationFrame(update);
    return () => cancelAnimationFrame(loop);
  }, [threeCanvas, initialized]);

  const ThreeCanvas = (props) => <canvas {...props} ref={threeCanvas}></canvas>;

  return (
    <ThreeContext.Provider value={{ ...three, ThreeCanvas }}>{children}</ThreeContext.Provider>
  );
};

export const useThree = () => {
  const three = useContext(ThreeContext);
  return three;
};
