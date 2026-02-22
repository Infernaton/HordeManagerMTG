import { readFile, writeFile } from "fs/promises";
import type { HordeDeck } from "./models/Deck.js";
import type { Section } from "./models/Section.js";
import type { Card } from "./models/Card.js";

// interface DBTree {
// 	decks: Array<HordeDeck>;
// 	sections: Array<GlobalSection>;
// }

export class DB {
	#data: Array<HordeDeck>;

	static path: string = "./db.example.json";
	static instance: DB;

	constructor() {
		this.#data = []; // { decks: [], sections: [] };
	}

	async #connect() {
		const jsonString = await readFile(DB.path, "utf8");
		this.#data = JSON.parse(jsonString);
	}

	static async connection(): Promise<DB> {
		if (this.instance == null || this.instance == undefined) {
			this.instance = new DB();
			await this.instance.#connect();
		}

		return this.instance;
	}

	//#region Helper

	/**
	 * Push the updatedDeck from local modification through the global variable
	 * @param updatedDeck
	 */
	push(updatedDeck: HordeDeck): void {
		const deckIndex = this.#data.findIndex((e) => e.id == updatedDeck.id);
		this.#data.fill(updatedDeck, deckIndex, deckIndex + 1);
	}
	// pushSection(updateSection: GlobalSection): void {
	// 	const sectionIndex = this.#data.sections.findIndex((e) => e.id == updateSection.id);
	// 	this.#data.sections.fill(updateSection, sectionIndex, sectionIndex + 1);
	// }

	/**
	 * Commit the global variable into the json file
	 */
	commit() {
		writeFile(DB.path, JSON.stringify(this.#data));
	}

	//#endregion

	//#region Decks

	getDecks(): Array<HordeDeck> {
		return this.#data;
	}

	getDeck(id: number) {
		return this.#data.find((e) => e.id == id);
	}

	createSection(idDeck: number, section: Section) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		currentDeck.sections.push(section);

		this.push(currentDeck);
		//commit change to file

		return true;
	}

	addUnsortedCard(idDeck: number, card: Card) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		if (currentDeck.unsorted == undefined) currentDeck.unsorted = [];
		currentDeck.unsorted.push(card);

		this.push(currentDeck);
		//commit change to file

		return true;
	}

	modifyBosses(idDeck: number, bosses: Section) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		currentDeck.bosses = bosses;

		this.push(currentDeck);
		//commit change to file

		return true;
	}

	//#endregion

	//#region Sections

	getSections(idDeck: number): Array<Section> | undefined {
		return this.getDeck(idDeck)?.sections;
	}

	getSectionById(idDeck: number, idSection: number): Section | undefined {
		return this.getDeck(idDeck)?.sections.find((e) => e.id == idSection);
	}

	getSection(idDeck: number, callback: (element: Section) => {}): Section | undefined {
		return this.getDeck(idDeck)?.sections.find(callback);
	}

	updateSection(idDeck: number, updated: Section) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		const tmp = currentDeck.sections.findIndex((e) => e.id == updated.id);
		if (tmp != -1) {
			currentDeck.sections.fill(updated, tmp, tmp + 1);
			this.push(currentDeck);
			//commit change to file
		}
		return tmp >= 0; // check if succeeded
	}

	removeSection(idDeck: number, idSection: number) {
		const currentDeck = this.getDeck(idDeck) as HordeDeck;
		if (currentDeck == undefined) return false;

		const tmp = currentDeck.sections.findIndex((e) => e.id == idSection);
		if (tmp != -1) {
			currentDeck.sections.splice(tmp, 1);
			this.push(currentDeck);
		}
		//commit change to file
		return tmp >= 0; // check if succeeded
	}

	//#endregion

	//#region card

	getCardSection(idDeck: number, idSection: number, idCard: string) {
		return this.getSectionById(idDeck, idSection)?.card_list.find((e) => e.id == idCard);
	}

	addCardSection(idDeck: number, idSection: number, card: Card) {
		const currentSection = this.getSectionById(idDeck, idSection);
		if (currentSection == undefined) return false;

		currentSection.card_list.push(card);

		return this.updateSection(idDeck, currentSection);
	}

	/**
	 *
	 * @param idDeck
	 * @param idSection
	 * @param idCard Scryfall ID
	 */
	removeCardSection(idDeck: number, idSection: number, idCard: string) {
		const currentSection = this.getSectionById(idDeck, idSection);
		if (currentSection == undefined) return false;

		const tmp = currentSection.card_list.findIndex((e) => e.id == idCard);
		if (tmp != -1) {
			currentSection.card_list.splice(tmp, 1);
			this.updateSection(idDeck, currentSection);
		}
		return tmp >= 0; // check if succeeded
	}

	//Move a card of a deck from unsorted to a section; from a section to another or from a section to unsorted
	/**
	 * Depending on what's define, will move a card from a location to another
	 * @param idDeck
	 * @param idCard
	 * @param fromIdSection will take the card from that section if define, otherwise will pick from unsorted
	 * @param toIdSection will take the card to that section if define, otherwise will transfer to unsorted
	 * @returns
	 */
	moveCard(idDeck: number, idCard: string, fromIdSection?: number, toIdSection?: number) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		const searchCard = () => {
			if (fromIdSection) {
				const card = this.getCardSection(idDeck, fromIdSection, idCard);
				this.removeCardSection(idDeck, fromIdSection, idCard);
				return card;
			} else {
				return currentDeck.unsorted?.find((e) => e.id == idCard);
			}
		};
		const card = searchCard();
		if (card == undefined) return false;

		if (toIdSection) return this.addCardSection(idDeck, toIdSection, card);
		else return this.addUnsortedCard(idDeck, card);
	}
	//#endregion
}
