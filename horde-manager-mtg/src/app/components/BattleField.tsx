import { Children } from "react";
import { Deck } from "../models/Deck";
import "./components.css";
import CardDisplay from "./CardShowcase";

function CardContainer({ id, placeholder, children }: { id: string; placeholder: string; children?: any }) {
	return (
		<div id={id}>
			<div className="card-slot container">
				<div className="placeholder">{placeholder}</div>
				<div className="card-list">
					{Children.map(children, (child) => (
						<div className="card-holder"> {child} </div>
					))}
				</div>
			</div>
		</div>
	);
}

function BattleField({ deck, handVisible }: { deck: Deck; handVisible: boolean }) {
	const Deck = deck.sections[0];
	// Set differents battlefield zone
	return (
		<div className="playfield">
			<CardContainer id="deck-pile-slot" placeholder="Deck">
				{Deck?.card_list.map((card, i) => (
					<CardDisplay
						card={card}
						occurence={1}
						colorBack={Deck.color}
						frontFaceVisible={false}
						key={i + "-" + card.id}
						visibleArrow={false}
					/>
				))}
			</CardContainer>

			<CardContainer id="graveyard-slot" placeholder="Graveyard"></CardContainer>

			<CardContainer id="exile-slot" placeholder="Exile"></CardContainer>

			<div id="hand-slot">
				<div className="container">hand</div>
			</div>

			<div id="stack-slot">
				<div className="container">stack</div>
			</div>

			<div id="battlefield-slot"></div>
		</div>
	);
}

export default BattleField;
