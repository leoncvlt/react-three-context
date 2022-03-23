import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

import "./styles.css";

const modules = import.meta.globEager("./**/*.jsx");
const examples = Object.entries(modules).reduce(
  (examples, [key, module]) => ({ ...examples, [key.split("/")[1]]: module.default }),
  {}
);

const gui = new GUI({ title: "Examples" });
const query = new URLSearchParams(location.search).get("example");
const params = { example: query in examples ? query : Object.keys(examples)[0] };

const App = () => {
  const [example, setExample] = useState(params.example);

  useEffect(() => {
    gui.add(params, "example", Object.keys(examples)).onChange(() => {
      const url = new URL(window.location);
      url.searchParams.set("example", params.example);
      window.history.pushState({}, "", url);
      window.location.hash = "";
      setExample(params.example);
    });
  }, []);

  const Example = examples[example];

  return (
    <main>
      <h1>
        <b>react-three-context</b> - Context & provider to integrate vanilla three.js in your React
        app
      </h1>
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
