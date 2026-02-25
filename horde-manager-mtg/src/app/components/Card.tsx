import "./components.css";
import { useState } from "react";
import { Card } from "../models/Card";

function CardDisplay({ card, occurence }: { card: Card; occurence: number }) {
	const [isFrontSide, setIsFrontSide] = useState(true);
	const cardElementID = "card-image-" + card.id;
	const changeSide = () => {
		const img = document.getElementById(cardElementID);
		setIsFrontSide(!isFrontSide);
		if (isFrontSide) img?.classList.add("rotate");
		else img?.classList.remove("rotate");
	};
	return (
		<div className="card">
			<div className="card-content" id={cardElementID}>
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
				{card.back_card && (
					<div className="revertCard onCard" onClick={changeSide}>
						<button>↩</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default CardDisplay;
