import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/pages/App";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <title>Horde Manager MTG</title>
        <App />
    </React.StrictMode>,
);
