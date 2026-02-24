import ListDeckCard from "../components/ListDeckCard";
import { Store } from "../store";

async function DeckList() {
	const allDecks = await Store.getAllDecks();
	return (
		<div className="Main-page">
			<header className="Main-header">
				<h1>Deck List</h1>
			</header>
			<div className="Main-body">
				<hr />
				<div className="card-container col3">
					{allDecks.map((deck) => (
						<ListDeckCard key={deck.id as React.Key} deck={deck} />
					))}
				</div>
			</div>
		</div>
	);
}

export default DeckList;
