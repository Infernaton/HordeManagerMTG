import { CardsSlot } from "../components/CardContainer";
import { isParent, stayRange, toNumber } from "./handler";

export function canDragCard(clickedTarget: HTMLElement, allowID: string[]) {
	// do not init the drag if user clicked on a element on the card (like a button)
	if (clickedTarget.classList.contains("onCard")) return;

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

export function moveToNewSlot(
	dragged: HTMLElement,
	possibleOriginParent: React.RefObject<CardsSlot>[],
	nextDropSlot: CardsSlot,
) {
	// get index of the card in the container internal list
	const splitId = dragged.id.split("_");
	const index = toNumber(splitId[splitId.length - 1]);

	// get container as CardsSlot object
	const originSlot = possibleOriginParent.find((zone) => {
		const container = document.getElementById(zone.current.props.id);
		if (!container) return;
		return isParent(dragged, container);
	});
	originSlot?.current.moveChildrenTo(index, nextDropSlot);
}
