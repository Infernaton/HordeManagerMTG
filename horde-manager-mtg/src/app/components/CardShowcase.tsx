import "./components.css";
import { useRef, useState } from "react";
import { Card } from "../models/Card";

function CardDisplay({
	card,
	occurence,
	colorBack,
	frontFaceVisible,
	visibleArrow,
}: {
	card: Card;
	occurence: number;
	colorBack?: string;
	frontFaceVisible?: boolean;
	visibleArrow?: boolean;
}) {
	const [isFrontFaceSide, setIsFrontFaceSide] = useState(true);
	const [isFrontSide, setIsFrontSide] = useState(frontFaceVisible ?? true);

	const seeArrowButton = visibleArrow ?? true;

	const changeSide = () => setIsFrontFaceSide(!isFrontFaceSide);
	const returnCard = () => {
		console.log("test", isFrontSide);
		setIsFrontSide(!isFrontSide);
	};
	let backSide = null;
	if (colorBack != undefined) {
		const backgroundCover = { "--background-color": colorBack } as React.CSSProperties;
		backSide = <div className="card-back-side" style={backgroundCover}></div>;
	}

	return (
		<div className={"card" + (isFrontSide ? "" : " rotate")}>
			<div className={"card-content" + (isFrontFaceSide ? "" : "rotate")}>
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

export default CardDisplay;
