import { Component, ReactNode } from "react";
import { Card } from "../models/Card";
import { CardDisplayComponent } from "./CardShowcase";
import { ICardData, ICardState } from "../middleware/IType";

type CardContainerProps = {
	id: string;
	placeholder?: string;
	card_list: ICardData[];
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

	render(): ReactNode {
		return (
			<div id={this.props.id} onClick={this.props.onClick}>
				<div className="container card-slot">
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
