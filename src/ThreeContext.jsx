import { createContext, useContext, useEffect, useMemo, useRef } from "react";

export const ThreeContext = createContext();

export const ThreeProvider = ({ script, children, canvas, ...props }) => {
  const three = useMemo(script, [script]);
  const threeCanvas = useRef(null);

  useEffect(() => {
    if (!three) return;
    three.init({ props, canvas: canvas?.current || threeCanvas.current });
    const update = () => {
      three.update();
      requestAnimationFrame(update);
    };
    const loop = requestAnimationFrame(update);
    return () => cancelAnimationFrame(loop);
  }, [three]);

  const ThreeCanvas = (props) => <canvas {...props} ref={threeCanvas}></canvas>;

  return (
    <ThreeContext.Provider value={{ ...three, ThreeCanvas }}>{children}</ThreeContext.Provider>
  );
};

export const useThree = () => {
  const three = useContext(ThreeContext);
  return three;
};
