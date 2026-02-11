// import logo from "../../public/logo.svg";
import "./App.css";
import DeckCard from "../components/DeckCard";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <p>Deck List</p>
                <hr />
            </header>
            <div className="App-body">
                <DeckCard />
            </div>
        </div>
    );
}

export default App;
