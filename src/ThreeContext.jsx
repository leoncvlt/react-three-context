import { createContext, useContext, useEffect, useMemo, useCallback } from "react";

export const ThreeContext = createContext();

export const ThreeProvider = ({ script, children, canvas, ...props }) => {
  const three = useMemo(
    () => (!!script.prototype?.constructor ? new script() : script()),
    [script]
  );

  const threeCanvas = useCallback(async (node) => {
    if (!three?.init || !node) {
      return;
    }
    await three.init({ props, canvas: node });
  }, []);

  useEffect(() => {
    if (!three?.update || !threeCanvas) {
      return;
    }

    const update = () => {
      three.update();
      requestAnimationFrame(update);
    };
    const loop = requestAnimationFrame(update);
    return () => cancelAnimationFrame(loop);
  }, [threeCanvas]);

  const ThreeCanvas = (props) => <canvas {...props} ref={threeCanvas}></canvas>;

  return (
    <ThreeContext.Provider value={{ ...three, ThreeCanvas }}>{children}</ThreeContext.Provider>
  );
};

export const useThree = () => {
  const three = useContext(ThreeContext);
  return three;
};
