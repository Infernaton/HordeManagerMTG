import "./components.css";
import { Component, ReactNode, useState } from "react";
import { Card } from "../models/Card";

type CardDisplayProps = {
	card: Card;
	occurence: number;
	colorBack?: string;
	frontFaceVisible?: boolean;
	visibleArrow?: boolean;
};

type CardState = {
	isFrontFaceSide: boolean;
	isFrontSide: boolean;
};
export class CardDisplayComponent extends Component<CardDisplayProps> {
	state: Readonly<CardState> = {
		isFrontFaceSide: true,
		isFrontSide: this.props.frontFaceVisible ?? true,
	};

	getUniqueID(index: number) {
		return index + "-" + this.props.card.id;
	}

	changeSide() {
		this.setState({ isFrontFaceSide: !this.state.isFrontFaceSide });
	}

	returnCard() {
		console.log("test", this.state.isFrontSide);
		this.setState({ isFrontSide: !this.state.isFrontSide });
	}

	render(): ReactNode {
		const seeArrowButton = this.props.visibleArrow ?? true;

		let backSide = null;
		if (this.props.colorBack != undefined) {
			const backgroundCover = { "--background-color": this.props.colorBack } as React.CSSProperties;
			backSide = <div className="card-back-side" style={backgroundCover}></div>;
		}

		return (
			<div className={"card" + (this.state.isFrontSide ? "" : " rotate")}>
				<div className={"card-content" + (this.state.isFrontFaceSide ? "" : " rotate")}>
					<div className="front-card">
						<img
							src={this.props.card.front_card.full_image.toString()}
							alt={this.props.card.front_card.name}
						/>
					</div>
					{this.props.card.back_card && (
						<div className="back-card">
							<img
								src={this.props.card.back_card.full_image.toString()}
								alt={this.props.card.back_card.name}
							/>
						</div>
					)}
					{this.props.occurence > 1 && (
						<div className="onCard occurence">
							<div>x {this.props.occurence}</div>
						</div>
					)}
					{this.props.card.back_card && seeArrowButton && (
						<div className="revertCard onCard" onClick={() => this.changeSide()}>
							<button>↩</button>
						</div>
					)}
				</div>
				{backSide ?? ""}
				{backSide && seeArrowButton && (
					<div className="returnCard onCard" onClick={() => this.returnCard()}>
						<button>↩</button>
					</div>
				)}
			</div>
		);
	}
}
