import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import DeckList from "./DeckList";
import DeckPage from "./Deckpage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DeckList />} />
                <Route path="/deck/:id" element={<DeckPage />} />
                <Route path="/deck/:id/play" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
