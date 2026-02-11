import "./components.css";

function DeckCard({ deck }) {
    return (
        <div className="deck-card" style={{ backgroundImage: "url(" + deck.image + ")" }}>
            <p className="deck-title">{deck.name}</p>
        </div>
    );
}

export default DeckCard;
