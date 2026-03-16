import { Deck } from "../models/Deck";
import "./components.css";
import { CardsSlot } from "./CardContainer";
import { useEffect, useRef, useState } from "react";
import { ICardData, ICardState, Zone } from "../middleware/IType";
import { calculateCoord, canDragCard, getGlobalCardIndex, newFullDeck } from "../middleware/battlefieldHelper";
import { isParent } from "../middleware/handler";

function BattleField({ deck, handVisible }: { deck: Deck; handVisible: boolean }) {
	const Deck = deck.sections[0];
	const [cardDataList, setCardDataList] = useState<ICardData[]>(newFullDeck(Deck.card_list, Deck.color));

	const ZoneRef: Map<Zone, React.RefObject<HTMLDivElement | null>> = new Map();
	ZoneRef.set(Zone.Deck, useRef<HTMLDivElement>(null));
	ZoneRef.set(Zone.Graveyard, useRef<HTMLDivElement>(null));
	ZoneRef.set(Zone.Exile, useRef<HTMLDivElement>(null));
	ZoneRef.set(Zone.Hand, useRef<HTMLDivElement>(null));
	ZoneRef.set(Zone.Stack, useRef<HTMLDivElement>(null));
	ZoneRef.set(Zone.Battlefield, useRef<HTMLDivElement>(null));

	const allowGrabZone = [Zone.Battlefield, Zone.Graveyard, Zone.Exile];
	const dropZone = [Zone.Battlefield, Zone.Graveyard, Zone.Exile];

	const getContainer = (slot: Zone) => {
		return ZoneRef.get(slot)?.current?.querySelector<HTMLElement>(".container");
	};

	const setupEvent = (allowGrabZone: Zone[], dropZone: Zone[]): void => {
		let dragging: HTMLElement | null = null;
		let currentContainer = (): HTMLElement | null | undefined => dragging?.closest(".card-list");
		let nextDropSlot: Zone | null = null;

		const setOverlapped = (slot: Zone, isOverlapped: boolean) => {
			// slot.overlapped(isOverlapped);
			if (isOverlapped) {
				getContainer(slot)?.classList.add("overlapping");
				nextDropSlot = slot;
			} else if (nextDropSlot == slot) {
				getContainer(slot)?.classList.remove("overlapping");
				nextDropSlot = null;
			}
		};

		document.addEventListener("pointerdown", (e: PointerEvent) => {
			const target = canDragCard(
				e.target as HTMLElement,
				allowGrabZone.map((el) => ZoneRef.get(el)!.current!.id),
			);
			// prevent drag if a other click than e.button == 0 (left click) was pressed
			if (!target || e.button != 0) return;

			dragging = target;
			target.classList.add("dragging");
			// IMPORTANT
			// On mobile, if not present, prevent event "pointerenter" and "pointerleave" to fire on other element
			(e.target as HTMLElement).releasePointerCapture(e.pointerId);
		});

		document.addEventListener("pointermove", (ev: PointerEvent) => {
			if (!dragging) return;
			const newCoordinates = calculateCoord(currentContainer(), dragging, [ev.pageX, ev.pageY]);
			if (!newCoordinates) return;

			dragging.style.left = `${newCoordinates[0]}px`;
			dragging.style.top = `${newCoordinates[1]}px`;
		});

		dropZone.forEach((el) => {
			const dropContainer = getContainer(el);
			if (!dropContainer) return;

			dropContainer.addEventListener("pointerenter", () => {
				if (!dragging) return;
				if (isParent(dragging, dropContainer)) return;

				setOverlapped(el, true);
			});
			dropContainer.addEventListener("pointerleave", () => setOverlapped(el, false));
		});

		document.addEventListener("pointerup", () => {
			if (dragging) {
				dragging.classList.remove("dragging");

				if (nextDropSlot !== null) {
					// get index of the card in the container internal list
					const index = getGlobalCardIndex(dragging);

					changeCardState(index, { zone: nextDropSlot });
					setOverlapped(nextDropSlot, false);
				}
			}

			dragging = null;
		});
	};

	useEffect(() => {
		setupEvent(allowGrabZone, dropZone);
	}, allowGrabZone.concat(dropZone));

	const changeCardState = (cardIndex: number, newState: ICardState) => {
		const newList = [...cardDataList];
		const currentCard = newList[cardIndex]; // find element from a new list
		if (!currentCard) return;

		for (const [key, value] of Object.entries(newState)) {
			if (currentCard.state[key] !== undefined && currentCard.state[key] != value) {
				console.log(key, currentCard.state[key], "=>", value);
				currentCard.state[key] = value;
			}
		}
		setCardDataList(newList);
	};

	const moveFromStack = (currentCardList: ICardData[]) => {
		if (currentCardList.length < 1) return;

		const tmpIndex = currentCardList.length - 1;
		const currentCard = currentCardList[tmpIndex];
		const globalIndex = getGlobalCardIndex(currentCard);

		// If a sorcery or instant card is the top card of the stack,
		// it goes in the graveyard upon resolution
		const destination: Zone =
			currentCard.card.front_card.type_line.includes("Sorcery") ||
			currentCard.card.front_card.type_line.includes("Instant")
				? Zone.Graveyard
				: Zone.Battlefield;
		changeCardState(globalIndex, { zone: destination, visibleArrow: true });
	};

	return (
		<div className="playfield">
			<CardsSlot
				ref={ZoneRef.get(Zone.Battlefield)!}
				id="battlefield-slot"
				cardList={cardDataList.filter((card) => card.state.zone == Zone.Battlefield)}
				cardContextMenu={[
					{
						id: "to-graveyard",
						caption: "Move to Graveyard",
						onClick: (cardIndex) => {
							changeCardState(cardIndex, { zone: Zone.Graveyard });
							// console.log("test caption click");
						},
					},
					{
						id: "to-exile",
						caption: "Move to Exile",
						onClick: (cardIndex) => {
							changeCardState(cardIndex, { zone: Zone.Exile });
						},
					},
					{
						id: "face-down",
						caption: "Toggle Facing",
						onClick: (cardIndex) => {
							changeCardState(cardIndex, { isFrontSide: !cardDataList[cardIndex].state.isFrontSide });
						},
					},
				]}
			/>
			<CardsSlot
				ref={ZoneRef.get(Zone.Deck)!}
				id="deck-pile-slot"
				placeholder="Deck"
				cardList={cardDataList.filter((card) => card.state.zone == Zone.Deck)}
				onClick={() => {
					changeCardState(
						cardDataList.findIndex((card) => card.state.zone == Zone.Deck),
						{ zone: Zone.Stack, isFrontSide: true },
					);
				}}
			/>

			<CardsSlot
				ref={ZoneRef.get(Zone.Exile)!}
				id="exile-slot"
				placeholder="Exile"
				cardList={cardDataList.filter((card) => card.state.zone == Zone.Exile)}
			/>

			<CardsSlot
				ref={ZoneRef.get(Zone.Graveyard)!}
				id="graveyard-slot"
				placeholder="Graveyard"
				cardList={cardDataList.filter((card) => card.state.zone == Zone.Graveyard)}
			/>

			<CardsSlot
				ref={ZoneRef.get(Zone.Hand)!}
				id="hand-slot"
				cardList={cardDataList.filter((card) => card.state.zone == Zone.Hand)}
			/>
			<CardsSlot
				ref={ZoneRef.get(Zone.Stack)!}
				id="stack-slot"
				cardList={cardDataList.filter((card) => card.state.zone == Zone.Stack)}
				onClick={moveFromStack}
				cardContextMenu={[
					{
						id: "to-graveyard",
						caption: "Move to Graveyard",
						onClick: (cardIndex) => {
							changeCardState(cardIndex, { zone: Zone.Graveyard, visibleArrow: true });
						},
					},
					{
						id: "to-exile",
						caption: "Move to Exile",
						onClick: (cardIndex) => {
							changeCardState(cardIndex, { zone: Zone.Exile, visibleArrow: true });
						},
					},
				]}
			/>
		</div>
	);
}

export default BattleField;
