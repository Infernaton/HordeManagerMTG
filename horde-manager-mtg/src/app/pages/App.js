import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router";
import DeckList from "./DeckList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<DeckList />} />
                <Route path="/deck" />
                <Route path="/deck/play" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
