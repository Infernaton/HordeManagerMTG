import { Component, ReactNode } from "react";
import { CardDisplayComponent } from "./CardShowcase";
import { ICardData, ICardState } from "../middleware/IType";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";

type CardContainerProps = {
	id: string;
	placeholder?: string;
	card_list: ICardData[];
	cardContextMenu?: ContextMenuItem[];
	onClick?: () => void;
};

export class CardsSlot extends Component<CardContainerProps> {
	state = {
		overlapped: false,
		currentCardList: this.props.card_list,
	};

	overlapped(isOverlapped: boolean) {
		this.setState({ overlapped: isOverlapped });
	}

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
		const id = this.props.id + "_" + cardData.card.id + "_" + index;

		const card = (
			<div className="card-holder" id={id} key={id}>
				<CardDisplayComponent
					card={cardData.card}
					occurence={1}
					colorBack={cardData.state.sleeveColor}
					frontFaceVisible={cardData.state.isFrontSide}
					visibleArrow={cardData.state.visibleArrow}
				/>
			</div>
		);

		return (
			<>
				{this.props.cardContextMenu ? (
					<ContextMenu
						id={"context-menu-" + this.props.id}
						cardIndex={index}
						items={this.props.cardContextMenu}>
						{card}
					</ContextMenu>
				) : (
					card
				)}
			</>
		);
	}

	render(): ReactNode {
		return (
			<div id={this.props.id} onClick={this.props.onClick}>
				<div className={"container" + (this.state.overlapped ? " overlapping" : "")}>
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
				<div className={"card-slot bg container" + (this.state.overlapped ? " overlapping" : "")}>
					<div className="placeholder">{this.props.placeholder}</div>
					<div className="card-list">
						{this.state.currentCardList.map((card, index) => this.renderCard(card, index))}
					</div>
				</div>
			</div>
		);
	}
}
