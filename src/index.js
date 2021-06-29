import 'bootstrap/dist/css/bootstrap.min.css';

import React from "react";
import {render} from "react-dom";
import "./index.css";

import Timeline from "./components/Timeline";

const App = () => (
  <div className="timeline">
    <Timeline />
  </div>
);

render(<App />, document.getElementById("root"));
