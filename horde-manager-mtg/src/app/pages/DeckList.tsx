import DeckCard from "../components/DeckCard";
import { Store } from "../store";

function DeckList() {
    return (
        <div className="Main-page">
            <header className="Main-header">
                <h1>Deck List</h1>
            </header>
            <div className="Main-body">
                <hr />
                <div className="card-container col3">
                    {Store.Decks.map((deck) => (
                        <DeckCard key={deck.id as React.Key} deck={deck} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DeckList;
