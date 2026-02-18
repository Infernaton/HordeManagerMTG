class CardFace {
	name: String;
	mana_cost?: String;
	type_line: String;
	oracle_text: String;
	power?: String;
	toughness?: String;

	crop_image: URL;
	full_image: URL;

	constructor(fetch: any, image_uris: any) {
		this.name = fetch.name;
		this.mana_cost = fetch.mana_cost;
		this.type_line = fetch.type_line;
		this.oracle_text = fetch.oracle_text;
		this.power = fetch.power;
		this.toughness = fetch.toughness;
		this.crop_image = new URL(image_uris.art_crop);
		this.full_image = new URL(image_uris.normal);
	}
}

export class Card {
	id: String;

	front_card: CardFace;
	back_card?: CardFace;

	constructor(fetch: any) {
		this.id = fetch.id;
		if (["transform", "modal_dfc"].includes(fetch.layout)) {
			this.front_card = new CardFace(fetch.card_faces[0], fetch.card_faces[0].image_uris);
			this.back_card = new CardFace(fetch.card_faces[1], fetch.card_faces[1].image_uris);
		} else if (["split", "flip"].includes(fetch.layout)) {
			this.front_card = new CardFace(fetch.card_faces[0], fetch.image_uris);
			this.back_card = new CardFace(fetch.card_faces[1], fetch.image_uris);
		} else {
			this.front_card = new CardFace(fetch, fetch.image_uris);
		}
	}
}
