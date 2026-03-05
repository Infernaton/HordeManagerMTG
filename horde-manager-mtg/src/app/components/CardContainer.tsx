import { Children, Component, ReactNode } from "react";
import { CardDisplayComponent } from "./CardShowcase";

type CardContainerProps = {
	id: string;
	placeholder?: string;
	children: CardDisplayComponent[];
};

export class CardSlot extends Component<CardContainerProps> {
	addChildren(...newChild: CardDisplayComponent[]) {
		// this.props.children.push(...newChild);
	}

	moveChildrenTo(indexChild: number, otherContainer: CardContainer) {
		const currentChild = this.props.children[indexChild];
		this.props.children.splice(indexChild, 1);

		otherContainer.addChildren(currentChild);
	}

	render(): ReactNode {
		return (
			<div id={this.props.id}>
				<div className="card-list">
					{this.props.children.map((child, index) => (
						<div className="card-holder" key={child.getUniqueID(index)}>
							{child.render()}
						</div>
					))}
				</div>
			</div>
		);
	}
}

export class CardContainer extends CardSlot {
	render(): ReactNode {
		return (
			<div id={this.props.id}>
				<div className="card-slot container">
					<div className="placeholder">{this.props.placeholder}</div>
					<div className="card-list">
						{this.props.children.map((child, index) => (
							<div className="card-holder" key={child.getUniqueID(index)}>
								{child.render()}
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
