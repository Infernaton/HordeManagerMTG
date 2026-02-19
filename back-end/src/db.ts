import { readFile, writeFile } from "fs/promises";
import type { HordeDeck } from "./models/Deck.js";
import type { Phase } from "./models/Phase.js";
import type { Card } from "./models/Card.js";

export class DB {
	#data: Array<HordeDeck>;

	static path: string = "./db.example.json";
	static instance: DB;

	constructor() {
		this.#data = [];
	}

	async connect() {
		const jsonString = await readFile(DB.path, "utf8");
		this.#data = JSON.parse(jsonString);
	}

	static async connection(): Promise<DB> {
		if (this.instance == null || this.instance == undefined) {
			this.instance = new DB();
			await this.instance.connect();
		}

		return this.instance;
	}

	/**
	 * Push the updatedDeck from local modification through the global variable
	 * @param updatedDeck
	 */
	push(updatedDeck: HordeDeck): void {
		const deckIndex = this.#data.findIndex((e) => e.id == updatedDeck.id);
		this.#data.fill(updatedDeck, deckIndex, deckIndex + 1);
	}

	/**
	 * Commit the global variable into the json file
	 */
	commit() {
		writeFile(DB.path, JSON.stringify(this.#data));
	}

	//#region Decks

	getDecks(): Array<HordeDeck> {
		return this.#data;
	}

	getDeck(id: number) {
		return this.#data.find((e) => e.id == id);
	}

	createPhase(idDeck: number, newPhase: Phase) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		currentDeck.phases.push(newPhase);

		this.push(currentDeck);
		//commit change to file

		return true;
	}

	addUnsortedCard(idDeck: number, card: Card) {
		console.log(idDeck, card);
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		if (currentDeck.unsorted == undefined) currentDeck.unsorted = [];
		currentDeck.unsorted.push(card);

		this.push(currentDeck);
		//commit change to file

		return true;
	}

	modifyBosses(idDeck: number, bosses: Phase) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		currentDeck.bosses = bosses;

		this.push(currentDeck);
		//commit change to file

		return true;
	}

	//#endregion

	//#region Phases

	getPhases(idDeck: number): Array<Phase> | undefined {
		return this.getDeck(idDeck)?.phases;
	}

	getPhase(idDeck: number, idPhase: number): Phase | undefined {
		return this.getDeck(idDeck)?.phases.find((e) => e.id == idPhase);
	}

	updatePhase(idDeck: number, updated: Phase) {
		const currentDeck = this.getDeck(idDeck);
		if (currentDeck == undefined) return false;

		const tmp = currentDeck.phases.findIndex((e) => e.id == updated.id);
		if (tmp && tmp != -1) {
			currentDeck.phases.fill(updated, tmp, tmp + 1);
			this.push(currentDeck);
			//commit change to file
		}
		return tmp && tmp >= 0; // check if succeeded
	}

	removePhase(idDeck: number, idPhase: number) {
		const currentDeck = this.getDeck(idDeck) as HordeDeck;
		if (currentDeck == undefined) return false;

		const tmp = currentDeck.phases.findIndex((e) => e.id == idPhase);
		if (tmp != -1) {
			currentDeck.phases.splice(tmp, 1);
			this.push(currentDeck);
		}
		//commit change to file
		return tmp >= 0; // check if succeeded
	}

	addCardPhase(idDeck: number, idPhase: number, card: Card) {
		const currentPhase = this.getPhase(idDeck, idPhase);
		if (currentPhase == undefined) return false;

		currentPhase.card_list.push(card);

		return this.updatePhase(idDeck, currentPhase);
	}

	/**
	 *
	 * @param idDeck
	 * @param idPhase
	 * @param idCard Scryfall ID
	 */
	removeCardPhase(idDeck: number, idPhase: number, idCard: string) {
		const currentPhase = this.getPhase(idDeck, idPhase);
		if (currentPhase == undefined) return false;

		const tmp = currentPhase.card_list.findIndex((e) => e.id == idCard);
		if (tmp != -1) {
			currentPhase.card_list.splice(tmp, 1);
			this.updatePhase(idDeck, currentPhase);
		}
		return tmp >= 0; // check if succeeded
	}

	//#endregion
}
