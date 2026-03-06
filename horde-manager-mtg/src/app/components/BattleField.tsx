import { Deck } from "../models/Deck";
import "./components.css";
import { CardsSlot, CardsContainer } from "./CardContainer";
import { forwardRef, useEffect, useRef } from "react";
import { ICardData, ICardState } from "../middleware/IType";

function BattleField({ deck, handVisible }: { deck: Deck; handVisible: boolean }) {
	const deckPileRef = useRef<CardsSlot>(null);
	const graveyardRef = useRef<CardsSlot>(null);
	const exileRef = useRef<CardsSlot>(null);
	const handRef = useRef<CardsSlot>(null);
	const stackRef = useRef<CardsSlot>(null);
	const battlefieldRef = useRef<CardsSlot>(null);
	const Deck = deck.sections[0];

	const stateTemplate: ICardState = {
		sleeveColor: deck.sections[0].color,
		isFrontFaceSide: false,
		isFrontSide: true,
		visibleArrow: false,
	};

	const CardDataList: ICardData[] = Deck.card_list.map((card) => {
		const state = structuredClone(stateTemplate);
		state.isFrontSide = false;
		return {
			card: card,
			state,
		};
	});

	return (
		<div className="playfield">
			<div></div>
			<CardsContainer
				ref={deckPileRef}
				id="deck-pile-slot"
				placeholder="Deck"
				card_list={CardDataList}
				onClick={() => deckPileRef.current?.moveChildrenTo(0, stackRef.current, structuredClone(stateTemplate))}
			/>

			<CardsContainer ref={exileRef} id="exile-slot" placeholder="Exile" card_list={[]} />

			<CardsContainer ref={graveyardRef} id="graveyard-slot" placeholder="Graveyard" card_list={[]} />

			<CardsSlot ref={handRef} id="hand-slot" card_list={[]} />
			<CardsSlot
				ref={stackRef}
				id="stack-slot"
				card_list={[]}
				onClick={() => {
					const state = structuredClone(stateTemplate);
					state.visibleArrow = true;
					stackRef.current?.moveChildrenTo(
						stackRef.current.state.currentCardList.length - 1,
						battlefieldRef.current,
						state,
					);
				}}
			/>
			<CardsSlot
				ref={battlefieldRef}
				id="battlefield-slot"
				card_list={[]}
				grabbable={true}
				// onCardClick={(index) =>
				// 	battlefieldRef.current?.moveChildrenTo(index, graveyardRef.current, structuredClone(stateTemplate))
				// }
			/>
		</div>
	);
}

export default BattleField;
