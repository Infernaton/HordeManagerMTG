import { Deck } from "../models/Deck";
import "./components.css";
import { CardDisplayComponent } from "./CardShowcase";
import { CardSlot, CardContainer } from "./CardContainer";

function BattleField({ deck, handVisible }: { deck: Deck; handVisible: boolean }) {
	const Deck = deck.sections[0];

	const cardsElement = Deck?.card_list.map(
		(card, i) =>
			new CardDisplayComponent({
				card: card,
				occurence: 1,
				colorBack: Deck.color,
				frontFaceVisible: false,
				visibleArrow: false,
			}),
	);

	// Set differents battlefield zone
	const deckPile = new CardContainer({ id: "deck-pile-slot", placeholder: "Deck", children: cardsElement });
	const graveyardPile = new CardContainer({ id: "graveyard-slot", placeholder: "Graveyard", children: [] });
	const exilePile = new CardContainer({ id: "exile-slot", placeholder: "Exile", children: [] });
	const handPile = new CardSlot({ id: "hand-slot", children: [] });
	const stackPile = new CardSlot({ id: "stack-slot", children: [] });
	const battlefield = new CardSlot({ id: "battlefield-slot", children: [] });

	return (
		<div className="playfield">
			{deckPile.render()}

			{graveyardPile.render()}

			{exilePile.render()}

			{handPile.render()}
			{stackPile.render()}
			{battlefield.render()}
		</div>
	);
}

export default BattleField;
