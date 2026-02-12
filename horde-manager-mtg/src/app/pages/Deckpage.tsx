import "./App.css";
import { useParams } from "react-router";

function DeckList() {
    const params = useParams();
    return (
        <div className="App">
            <header className="App-header">
                <h1>{params.id}</h1>
                <hr />
            </header>
            <div className="App-body">
                <div className="card-container col10"></div>
            </div>
        </div>
    );
}

export default DeckList;
