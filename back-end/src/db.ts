import { readFile } from "fs";
import type { Deck } from "./models/Deck.js";
import type { Phase } from "./models/Phase.js";
import type { Card } from "./models/Card.js";

export class DB {
	#data: Array<Deck> = [];

	static path: string = "../db.example.json";
	static instance: DB;

	constructor() {
		readFile(DB.path, "utf8", (err, jsonString: string) => {
			if (err) {
				console.error("Error reading file:", err);
			} else {
				this.#data = JSON.parse(jsonString);
			}
		});
	}

	static connection(): DB {
		if (this.instance == null || this.instance == undefined) this.instance = new DB();

		return this.instance;
	}

	//#region Decks

	getDecks(): Array<Deck> {
		return this.#data;
	}

	getDeck(id: number): Deck {
		return this.#data[id];
	}

	getDeckBosses(idDeck: number): Phase | undefined {
		return this.#data[idDeck]?.bosses;
	}

	getUnsortedCards(idDeck: number): Array<Card> | undefined {
		return this.#data[idDeck]?.unsorted;
	}

	createPhase(idDeck: number, newPhase: Phase) {
		if (idDeck >= this.#data.length) return false;

		this.#data[idDeck].phases.push(newPhase);
		//commit change to file
		return true;
	}

	addUnsortedCard(idDeck: number, card: Card) {
		if (idDeck >= this.#data.length) return false;

		if (this.#data[idDeck].unsorted == undefined) this.#data[idDeck].unsorted = [];
		this.#data[idDeck].unsorted.push(card);
		//commit change to file

		return true;
	}

	modifyBosses(idDeck: number, bosses: Phase) {
		if (idDeck >= this.#data.length) return false;

		this.#data[idDeck].bosses = bosses;
		//commit change to file

		return true;
	}

	//#endregion

	//#region Phases

	getPhases(idDeck: number): Array<Phase> {
		return this.#data[idDeck]?.phases;
	}

	getPhase(idDeck: number, idPhase: number): Phase {
		return this.#data[idDeck]?.phases[idPhase];
	}

	updatePhase(idDeck: number, updated: Phase) {
		if (idDeck >= this.#data.length) return false;

		const tmp = this.#data[idDeck].phases.findIndex((e) => e.id == updated.id);
		if (tmp != -1) {
			this.#data[idDeck].phases[tmp] = updated;
			//commit change to file
		}
		return tmp >= 0; // check if succeeded
	}

	removePhase(idDeck: number, idPhase: number) {
		if (idDeck >= this.#data.length) return false;

		if (idPhase >= this.#data[idDeck].phases.length) return false;

		this.#data[idDeck].phases.splice(idPhase, 1);
		//commit change to file
		return true;
	}

	addCardPhase(idDeck: number, idPhase: number, card: Card) {
		if (idDeck >= this.#data.length) return false;

		if (idPhase >= this.#data[idDeck].phases.length) return false;

		this.#data[idDeck].phases[idPhase].card_list.push(card);
		//commit change to file

		return true;
	}

	/**
	 *
	 * @param idDeck
	 * @param idPhase
	 * @param idCard Scryfall ID
	 */
	removeCardPhase(idDeck: number, idPhase: number, idCard: string) {
		if (idDeck >= this.#data.length) return false;

		if (idPhase >= this.#data[idDeck].phases.length) return false;

		const tmp = this.#data[idDeck].phases[idPhase].card_list.findIndex((e) => e.id == idCard);
		if (tmp != -1) {
			this.#data[idDeck].phases[idPhase].card_list.splice(tmp, 1);
			//commit change to file
		}
		return tmp >= 0; // check if succeeded
	}

	//#endregion
}
