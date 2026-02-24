import { Card } from "../models/Card";

function CardList({ cardList }: { cardList: Card[] }) {
	return (
		<div>
			<div className="card-container col7">
				{cardList && cardList.map((cardObj) => <div key={cardObj.id}>{cardObj.front_card.name}</div>)}
			</div>
		</div>
	);
}

export default CardList;
