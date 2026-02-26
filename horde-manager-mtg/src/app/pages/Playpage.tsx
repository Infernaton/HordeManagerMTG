import { Deck } from "../models/Deck";
import { Store } from "../store";

function Playpage() {
	const currentDeck = Store.Local.getObject("currentDeck") as Deck;

	console.log(currentDeck);
	return (
		<div className="Main-page">
			<div className="Main-body grid-pattern"></div>
		</div>
	);
}

export default Playpage;
