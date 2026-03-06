import { Component, ReactNode } from "react";
import { Card } from "../models/Card";
import { CardDisplayComponent } from "./CardShowcase";
import { ICardData, ICardState } from "../middleware/IType";
import { isBetween, stayRange } from "../middleware/handler";

type CardContainerProps = {
	id: string;
	placeholder?: string;
	card_list: ICardData[];
	grabbable?: boolean;
	onClick?: () => void;
	onLongClick?: () => void;
	onCardClick?: (cardIndex: number) => void;
	onCardLongClick?: (cardIndex: number) => void;
};

export class CardsSlot extends Component<CardContainerProps> {
	state = {
		currentCardList: this.props.card_list,
	};

	addChildren(...newChild: ICardData[]) {
		this.setState({ currentCardList: [...this.state.currentCardList, ...newChild] });
	}

	moveChildrenTo(indexChild: number, otherContainer: CardsSlot | null, newState?: ICardState) {
		if (otherContainer == null) return;
		const currentChild = this.state.currentCardList[indexChild];

		// remove the element by Index then update the state
		let newArray = this.state.currentCardList.slice();
		newArray.splice(indexChild, 1);
		this.setState({ currentCardList: newArray });

		if (newState != undefined) currentChild.state = newState;

		otherContainer.addChildren(currentChild);
	}

	renderCard(cardData: ICardData, index: number) {
		return (
			<div className="card-holder" key={index} onClick={() => this.props.onCardClick?.(index)}>
				<CardDisplayComponent
					card={cardData.card}
					occurence={1}
					colorBack={cardData.state.sleeveColor}
					frontFaceVisible={cardData.state.isFrontSide}
					visibleArrow={cardData.state.visibleArrow}
				/>
			</div>
		);
	}

	componentDidMount(): void {
		if (!this.props.grabbable) return;

		const container = document.querySelector<HTMLElement>(`#${this.props.id} .card-list`);
		if (!container) return;

		let dragging: HTMLElement | null = null;

		const initDrag = (e: Event) => {
			const clickedTarget = e.target as HTMLElement;
			if (clickedTarget.classList.contains("onCard")) return;
			const target = clickedTarget?.closest(".card-holder") as HTMLElement;
			if (target && target.classList.contains("card-holder")) {
				dragging = target;
				target.classList.add("dragging");
			}
		};
		container.addEventListener("mousedown", initDrag);
		container.addEventListener("touchstart", initDrag);

		const drag = (startingCoord: [x: number, y: number]) => {
			if (!dragging) return;
			const maxCoordinates = [
				container.offsetWidth - dragging.offsetWidth,
				container.offsetHeight - dragging.offsetHeight,
			];
			const newCoordinates = [
				stayRange(0, maxCoordinates[0], startingCoord[0] - container.offsetLeft - dragging.offsetWidth / 2),
				stayRange(0, maxCoordinates[1], startingCoord[1] - container.offsetTop - dragging.offsetHeight / 2),
			];
			dragging.style.left = `${newCoordinates[0]}px`;
			dragging.style.top = `${newCoordinates[1]}px`;
		};
		document.addEventListener("mousemove", (ev: MouseEvent) => drag([ev.pageX, ev.pageY]));
		document.addEventListener(
			"touchmove",
			(ev: TouchEvent) => {
				ev.preventDefault();
				drag([ev.touches[0].pageX, ev.touches[0].pageY]);
			},
			{ passive: dragging !== null },
		);

		const endDrag = () => {
			if (dragging) {
				dragging.classList.remove("dragging");
			}
			dragging = null;
		};
		document.addEventListener("mouseup", endDrag);
		document.addEventListener("touchend", endDrag);

		// container.addEventListener("dragover", (e: DragEvent) => {
		// 	e.preventDefault();
		// });
	}

	render(): ReactNode {
		return (
			<div id={this.props.id} onClick={this.props.onClick}>
				<div className="container">
					<div className="card-list">
						{this.state.currentCardList.map((card, index) => this.renderCard(card, index))}
					</div>
				</div>
			</div>
		);
	}
}

export class CardsContainer extends CardsSlot {
	render(): ReactNode {
		return (
			<div id={this.props.id} onClick={this.props.onClick}>
				<div className="card-slot bg container">
					<div className="placeholder">{this.props.placeholder}</div>
					<div className="card-list">
						{this.state.currentCardList.map((card, index) => this.renderCard(card, index))}
					</div>
				</div>
			</div>
		);
	}
}
