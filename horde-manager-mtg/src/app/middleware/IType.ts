import { Card } from "../models/Card";

export type ICardState = {
	isFrontFaceSide: boolean; // Useful only if the current card as multiple face
	isFrontSide: boolean;
	sleeveColor?: string;
	visibleArrow?: boolean;
};

export type ICardData = {
	card: Card;
	state: ICardState;
};
