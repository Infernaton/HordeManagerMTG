import type { IBulkReturn, IDictionary } from "../models/interface";

export const bulkReadFormat = (entry: string): IBulkReturn => {
	let stringArrBulk = entry.split("\n\n");
	let storedBulk: any = {};
	let apiCallBody: { name: string; set?: string }[] = [];

	const regex = new RegExp("^[^0-9]");

	// pass for each card section (main deck, sideboard ...)
	for (let i = 0; i < stringArrBulk.length; i++) {
		// split every card from the bulk from that section
		const strSplit: Array<string> = stringArrBulk[i].split("\n");
		const objSplit: IDictionary<number> = {};

		// Each element are currently in the form => "<number> <card's name>" like "5 Plains"
		// Display each element as <key>: the name of the card = <value>: the number present in that section
		// to better read what cards are in
		strSplit.forEach((e) => {
			const s = e.split(/ (.*)/s); // split the string on the first space character found
			objSplit[s[1]] = +s[0];
			// s[1].substring(s[1].indexOf("/")) is about split card not finding by Scryfall api
			// -> we will receive a card like "Wear/Tear" and only send the "/Tear" part to search for
			// For normal card, it will not modify
			if (s[1] != undefined) apiCallBody.push({ name: s[1].substring(s[1].indexOf("/")) });
		});

		// if the first element of the split don't have a number as a first character, it means a section name
		// -> putting that as a key name for that section
		if (regex.test(strSplit[0])) {
			delete objSplit["undefined"];
			storedBulk[strSplit[0].replace(":", "")] = objSplit;
		} else {
			storedBulk[i] = objSplit;
		}
	}
	return {
		apiCallBody,
		sortedCard: storedBulk,
	};
};
