import { Card } from "../models/Card";
import { shuffle, stayRange, toNumber } from "./handler";
import { ICardData, ICardState, Zone } from "./IType";

export function newFullDeck(cardList: Card[], sleeveColor: string) {
	return shuffle(cardList).map((card, index) => {
		const state: ICardState = {
			id: card.id + "_" + index,
			sleeveColor: sleeveColor, // deck.sections[0].color,
			isFrontFaceSide: false,
			isFrontSide: false,
			visibleArrow: false,
			zone: Zone.Deck,
		};
		return {
			card: card,
			state,
		};
	});
}

export function getGlobalCardIndex(card: ICardData) {
	return toNumber(card.state.id!.slice(card.state.id!.indexOf("_") + 1));
}

export function canDragCard(clickedTarget: HTMLElement, allowID: string[]) {
	// do not init the drag if user clicked on a element on the card (like a button)
	if (clickedTarget.classList.contains("onCard")) return;

	// if the context menu is clicked, prevent drag
	if (clickedTarget.closest(".context-menu")) return;

	// get the parent element, to drag the whole card and no just an image
	const target = clickedTarget?.closest(".card-holder") as HTMLElement;
	if (!target || !target.classList.contains("card-holder")) return;

	const container = target.closest(".container");
	// If there's is no container or the container parent is not listed on the list
	if (!container || !allowID.includes((container.parentElement as HTMLElement).id)) return;

	return target;
}

export function calculateCoord(
	container: HTMLElement | undefined | null,
	dragged: HTMLElement,
	startingCoord: [x: number, y: number],
) {
	if (!container) return;

	const maxCoordinates = [container.offsetWidth - dragged.offsetWidth, container.offsetHeight - dragged.offsetHeight];
	return [
		stayRange(0, maxCoordinates[0], startingCoord[0] - container.offsetLeft - dragged.offsetWidth / 2),
		stayRange(0, maxCoordinates[1], startingCoord[1] - container.offsetTop - dragged.offsetHeight / 2),
	];
}
