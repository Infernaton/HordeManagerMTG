export class Card {
    id: String;
    name: String;
    mana_cost: String;
    type_line: String;
    oracle_text: String;
    power: String;
    toughness: String;
    crop_image: URL;
    full_image: URL;

    constructor(fetch: any) {
        this.id = fetch.id;
        this.name = fetch.name;
        this.mana_cost = fetch.mana_cost;
        this.type_line = fetch.type_line;
        this.oracle_text = fetch.oracle_text;
        this.power = fetch.power;
        this.toughness = fetch.toughness;
        this.crop_image = new URL(fetch.image_uris.art_crop);
        this.full_image = new URL(fetch.image_uris.normal);
    }
}
