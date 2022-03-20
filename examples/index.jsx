import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

import "./styles.css";

const modules = import.meta.globEager("./**/*.jsx");
const examples = Object.entries(modules).reduce(
  (examples, [key, module]) => ({
    ...examples,
    [key.split("/")[1]]: module.default,
  }),
  {}
);

const App = () => {
  const gui = new GUI();
  const params = { example: Object.keys(examples)[0] };
  const [example, setExample] = useState(params.example);

  useEffect(() => {
    gui
      .add(params, "example", Object.keys(examples))
      .onChange(() => setExample(params.example), []);
  }, []);

  const Example = examples[example];
  return (
    <main>
      <h1>react-three-context</h1>
      <Example />
    </main>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
