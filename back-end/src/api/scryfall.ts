import axios, { type AxiosResponse } from "axios";

export namespace Scryfall {
	const API_URL = "https://api.scryfall.com";

	export async function getCard(id: string) {
		return await axios.get(`${API_URL}/cards/${id}`);
	}

	export async function searchCard(query: string) {
		return await axios.get(`${API_URL}/cards/search?q=${query}`);
	}

	export async function searchCollections(identifiers: Array<{}>) {
		let fetches: Array<Promise<AxiosResponse<any, any, {}>>> = [];
		const MAX_REQUEST_CARD = 75;

		for (let i = 0; i < identifiers.length; i = i + MAX_REQUEST_CARD) {
			fetches.push(
				axios.post(`${API_URL}/cards/collection`, {
					identifiers: identifiers.slice(i, i + MAX_REQUEST_CARD),
				}),
			);
		}
		const data = await Promise.all(fetches);

		const filteredData = data.map((d) => d.data);
		const found = filteredData.flatMap((e) => e.data);
		const notFound = filteredData.flatMap((e) => e.not_found);

		return { found, notFound };
	}
}
