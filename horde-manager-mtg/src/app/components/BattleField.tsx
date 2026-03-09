import { Deck } from "../models/Deck";
import "./components.css";
import { CardsSlot, CardsContainer } from "./CardContainer";
import { useEffect, useRef } from "react";
import { ICardData, ICardState } from "../middleware/IType";
import { calculateCoord, canDragCard, moveToNewSlot } from "../middleware/battlefieldHelper";
import { isParent, toNumber } from "../middleware/handler";

function setupGrabEvent(allowGrabZone: React.RefObject<CardsSlot>[], dropZone: React.RefObject<CardsSlot>[]): void {
	let dragging: HTMLElement | null = null;
	let currentContainer = (): HTMLElement | null | undefined => dragging?.closest(".card-list");
	let nextDropSlot: CardsSlot | null = null;

	document.addEventListener("pointerdown", (e: PointerEvent) => {
		const target = canDragCard(e.target as HTMLElement, allowGrabZone.map((el) => el.current.props.id) as string[]);
		if (!target) return;

		dragging = target;
		target.classList.add("dragging");
	});

	document.addEventListener("pointermove", (ev: PointerEvent) => {
		if (!dragging) return;
		const newCoordinates = calculateCoord(currentContainer(), dragging, [ev.pageX, ev.pageY]);
		if (!newCoordinates) return;

		dragging.style.left = `${newCoordinates[0]}px`;
		dragging.style.top = `${newCoordinates[1]}px`;
	});

	dropZone.forEach((el) => {
		const dropContainer = document.querySelector<HTMLElement>(`#${el.current.props.id} .container`);
		if (!dropContainer) return;

		dropContainer.addEventListener("pointerenter", (e: PointerEvent) => {
			if (!dragging) return;
			dropContainer.classList.add("overlapping");
			nextDropSlot = el.current;
		});
		dropContainer.addEventListener("pointerleave", () => {
			dropContainer.classList.remove("overlapping");
			if (nextDropSlot == el.current) nextDropSlot = null;
		});
	});

	document.addEventListener("pointerup", () => {
		if (dragging) {
			dragging.classList.remove("dragging");

			if (nextDropSlot) moveToNewSlot(dragging, allowGrabZone, nextDropSlot);
		}

		dragging = null;
	});
}

function BattleField({ deck, handVisible }: { deck: Deck; handVisible: boolean }) {
	const deckPileRef = useRef<CardsSlot>(null);
	const graveyardRef = useRef<CardsSlot>(null);
	const exileRef = useRef<CardsSlot>(null);
	const handRef = useRef<CardsSlot>(null);
	const stackRef = useRef<CardsSlot>(null);
	const battlefieldRef = useRef<CardsSlot>(null);
	const Deck = deck.sections[0];

	const allowGrabZone = [battlefieldRef];
	const dropZone = [exileRef, graveyardRef];

	useEffect(() => {
		if (
			allowGrabZone
				.concat(dropZone)
				.map((ref) => ref.current)
				.includes(null)
		)
			return;
		setupGrabEvent(allowGrabZone as React.RefObject<CardsSlot>[], dropZone as React.RefObject<CardsSlot>[]);
	}, allowGrabZone.concat(dropZone));

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

	const moveFromStack = () => {
		if (stackRef.current == null) return;
		const state = structuredClone(stateTemplate);
		state.visibleArrow = true;

		const index: number = stackRef.current.state.currentCardList.length - 1;
		const currentCard = stackRef.current.state.currentCardList[index];

		// If a sorcery or instant card is the top card of the stack,
		// it goes in the graveyard upon resolution
		const destination: CardsSlot | null =
			currentCard.card.front_card.type_line.includes("Sorcery") ||
			currentCard.card.front_card.type_line.includes("Instant")
				? graveyardRef.current
				: battlefieldRef.current;
		stackRef.current?.moveChildrenTo(index, destination, state);
	};

	return (
		<div className="playfield">
			<div></div>
			<CardsSlot ref={battlefieldRef} id="battlefield-slot" card_list={[]} />

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
			<CardsSlot ref={stackRef} id="stack-slot" card_list={[]} onClick={moveFromStack} />
		</div>
	);
}

export default BattleField;
