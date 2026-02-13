import "./components.css";
import { Link } from "react-router";
import type { Deck } from "../models/Deck";
import { Store } from "../store";

const saveDeck = (deck: Deck) => {
	Store.setObject("currentDeck", deck);
};

function ListDeckCard({ deck }: { deck: Deck }) {
	return (
		<Link
			className="deck-card"
			style={{ backgroundImage: deck?.image ? "url(" + deck.image + ")" : "revert-layer" }}
			onClick={() => saveDeck(deck)}
			to={{ pathname: `/deck/${deck.id}` }}>
			<p className="deck-title">{deck.name}</p>
		</Link>
	);
}

export default ListDeckCard;
