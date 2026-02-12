import "./components.css";
import { Link } from "react-router";
import type { Deck } from "../models/Deck";

function DeckCard({ deck }: { deck: Deck }) {
    return (
        <Link className="deck-card" style={{ backgroundImage: "url(" + deck.image + ")" }} to={{ pathname: `/deck/${deck.id}` }}>
            <p className="deck-title">{deck.name}</p>
        </Link>
    );
}

export default DeckCard;
