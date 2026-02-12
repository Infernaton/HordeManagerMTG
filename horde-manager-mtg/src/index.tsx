import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import DeckList from "./app/pages/DeckList";
import DeckPage from "./app/pages/Deckpage";
import "./app/pages/App.css";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <title>Horde Manager MTG</title>

        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DeckList />} />
                <Route path="/deck/:id" element={<DeckPage />} />
                <Route path="/deck/:id/play" />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
);
