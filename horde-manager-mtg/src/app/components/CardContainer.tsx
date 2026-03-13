import { CardDisplayComponent } from "./CardShowcase";
import { ICardData } from "../middleware/IType";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";
import { getGlobalCardIndex } from "../middleware/battlefieldHelper";

type CardContainerProps = {
	ref: React.RefObject<HTMLDivElement | null>;
	id: string;
	placeholder?: string;
	cardList: ICardData[];
	cardContextMenu?: ContextMenuItem[];
	isOverlapped: boolean;
	onClick?: (currentCardList: ICardData[]) => void;
};

export function FnCardsSlot({ ref, id, placeholder, cardList, cardContextMenu, onClick }: CardContainerProps) {
	// 	state = {
	// 		overlapped: false,
	// 		currentCardList: this.props.cardList,
	// 	};

	// 	overlapped(isOverlapped: boolean) {
	// 		this.setState({ overlapped: isOverlapped });
	// 	}
	let currentCardElements = cardList.map((cardData) => {
		const idE = id + "_" + cardData.state.id;

		const card = (
			<CardDisplayComponent
				card={cardData.card}
				occurence={1}
				colorBack={cardData.state.sleeveColor}
				frontFaceVisible={cardData.state.isFrontSide}
				visibleArrow={cardData.state.visibleArrow}
			/>
		);

		return (
			<div className="card-holder" id={idE} key={idE}>
				{cardContextMenu ? (
					<ContextMenu
						id={"context-menu-" + id}
						cardIndex={getGlobalCardIndex(cardData)}
						items={cardContextMenu}>
						{card}
					</ContextMenu>
				) : (
					card
				)}
			</div>
		);
	});

	return (
		<div
			ref={ref}
			id={id}
			onClick={() => {
				onClick?.(cardList);
			}}>
			<div className={(placeholder ? "card-slot bg " : "") + "container"}>
				{placeholder && <div className="placeholder">{placeholder}</div>}
				<div className="card-list">{currentCardElements}</div>
			</div>
		</div>
	);
}
