import { Card } from "../models/Card";

interface CardDisplay {
	id: string;
	occurence: number;
	card_data: Card;
}

function CardList({ cardList }: { cardList: Card[] }) {
	let uniqueCard: CardDisplay[] = [];
	for (let i = 0; i < cardList.length; i++) {
		const currentCardIndex = uniqueCard.findIndex((u) => u.id == cardList[i].id);
		if (currentCardIndex != -1) {
			uniqueCard[currentCardIndex].occurence++;
		} else {
			uniqueCard.push({
				id: cardList[i].id,
				occurence: 1,
				card_data: cardList[i],
			});
		}
	}
	return (
		<div>
			<div className="card-container col7">
				{uniqueCard.length > 0 &&
					uniqueCard.map((cardObj) => (
						<div key={cardObj.id}>
							<img
								src={cardObj.card_data.front_card.full_image.toString()}
								alt={cardObj.card_data.front_card.name}
							/>
							{cardObj.card_data.front_card.name} //// {cardObj.occurence}
						</div>
					))}
			</div>
		</div>
	);
}

export default CardList;
