import "./components.css";
import { useEffect, useState } from "react";
import { Card } from "../models/Card";

type CardDisplayProps = {
	card: Card;
	occurence: number;
	colorBack?: string;
	frontFaceVisible?: boolean;
	visibleArrow?: boolean;
};

export function CardShowcase({ card, occurence, colorBack, frontFaceVisible, visibleArrow }: CardDisplayProps) {
	const [isFrontFaceSide, setIsFrontFaceSide] = useState(true);
	const [isFrontSide, setIsFrontSide] = useState(frontFaceVisible ?? true);

	useEffect(() => {
		if (frontFaceVisible === undefined) return;
		setIsFrontSide(frontFaceVisible);
	}, [frontFaceVisible]);

	const changeSide = () => setIsFrontFaceSide(!isFrontFaceSide);
	const returnCard = () => setIsFrontSide(!isFrontSide);

	const seeArrowButton = visibleArrow ?? true;

	let backSide = null;
	if (colorBack != undefined) {
		const backgroundCover = { "--background-color": colorBack } as React.CSSProperties;
		backSide = <div className="card-back-side" style={backgroundCover}></div>;
	}

	return (
		<div className={"card" + (isFrontSide ? "" : " rotate")}>
			<div className={"card-content" + (isFrontFaceSide ? "" : " rotate")}>
				<div className="front-card">
					<img src={card.front_card.full_image.toString()} alt={card.front_card.name} />
				</div>
				{card.back_card && (
					<div className="back-card">
						<img src={card.back_card.full_image.toString()} alt={card.back_card.name} />
					</div>
				)}
				{occurence > 1 && (
					<div className="onCard occurence">
						<div>x {occurence}</div>
					</div>
				)}
				{card.back_card && seeArrowButton && (
					<div className="revertCard onCard" onClick={changeSide}>
						<button>↩</button>
					</div>
				)}
			</div>
			{backSide ?? ""}
			{backSide && seeArrowButton && (
				<div className="returnCard onCard" onClick={returnCard}>
					<button>↩</button>
				</div>
			)}
		</div>
	);
}
