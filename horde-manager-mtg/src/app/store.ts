import { Deck } from "./models/Deck";
import { Phase } from "./models/Phase";

export namespace Store {
	export const Decks: Array<Deck> = [
		{
			id: 1,
			name: "Invasion Phyrexianne",
			description: "",
			image: new URL(
				"https://cards.scryfall.io/art_crop/front/a/a/aace4c44-7250-414b-aac4-df042a1e2e1d.jpg?1675956894",
			),
			bosses: {
				id: 1,
				color: "gold",
				description: "One will spawn between phases",
				card_list: [
					{
						id: "f0d31ae7-8580-402a-a917-3d626a9e1f49",
						name: "Brimaz, Blight of Oreskos",
						mana_cost: "{2}{W}{B}",
						type_line: "Legendary Creature — Phyrexian Cat",
						oracle_text:
							'Whenever you cast a Phyrexian creature or artifact creature spell, incubate X, where X is that spell\'s mana value. (Create an Incubator token with X +1/+1 counters on it and "{2}: Transform this token." It transforms into a 0/0 Phyrexian artifact creature.)\nAt the beginning of each end step, if a Phyrexian died under your control this turn, proliferate.',
						power: "3",
						toughness: "4",
						crop_image: new URL(
							"https://cards.scryfall.io/art_crop/front/f/0/f0d31ae7-8580-402a-a917-3d626a9e1f49.jpg?1682207211",
						),
						full_image: new URL(
							"https://cards.scryfall.io/normal/front/f/0/f0d31ae7-8580-402a-a917-3d626a9e1f49.jpg?1682207211",
						),
					},
					{
						id: "6c299066-dfdd-47a3-85e6-225508ba95fe",
						name: "Glissa, Herald of Predation",
						mana_cost: "{3}{B}{G}",
						type_line: "Legendary Creature — Phyrexian Zombie Elf",
						oracle_text:
							'At the beginning of combat on your turn, choose one —\n• Incubate 2 twice. (To incubate 2, create an Incubator token with two +1/+1 counters on it and "{2}: Transform this token." It transforms into a 0/0 Phyrexian artifact creature.)\n• Transform all Incubator tokens you control.\n• Phyrexians you control gain first strike and deathtouch until end of turn.',
						power: "3",
						toughness: "5",
						crop_image: new URL(
							"https://cards.scryfall.io/art_crop/front/6/c/6c299066-dfdd-47a3-85e6-225508ba95fe.jpg?1682205268",
						),
						full_image: new URL(
							"https://cards.scryfall.io/normal/front/6/c/6c299066-dfdd-47a3-85e6-225508ba95fe.jpg?1682205268",
						),
					},
				],
			},
			phases: [
				{
					id: 1,
					color: "green",
					description: "",
					card_list: [],
				},
			],
		},
		{
			id: 2,
			name: "Haunted One",
			description: "",
			image: new URL(
				"https://cards.scryfall.io/art_crop/front/9/c/9c735bda-5454-4177-a23a-f9f00b7480d2.jpg?1562878661",
			),
			bosses: {} as Phase,
			phases: [],
		},
		{
			id: 3,
			name: "24h du Mans",
			description: "",
			image: new URL(
				"https://cards.scryfall.io/art_crop/front/9/8/98a79557-8ed6-4d9a-b4e1-cece05664984.jpg?1738356552",
			),
			bosses: {} as Phase,
			phases: [],
		},
		{
			id: 4,
			name: "Zombie Army",
			description: "",
			image: new URL(
				"https://cards.scryfall.io/art_crop/front/e/9/e9e00112-8c6c-4551-ad68-389e315fe148.jpg?1543676118",
			),
			bosses: {} as Phase,
			phases: [],
		},
		{
			id: 5,
			name: "Le donjon",
			description: "",
			image: new URL(
				"https://cards.scryfall.io/art_crop/front/2/f/2ff39de2-d071-4568-baac-25b505a2da56.jpg?1562013207",
			),
			bosses: {} as Phase,
			phases: [],
		},
	];

	export function get(key: string) {
		return window.localStorage.getItem(key);
	}
	export function getObject(key: string): Object | null {
		const value = get(key);
		if (value == null) return null;
		return JSON.parse(value);
	}

	export function set(key: string, value: any) {
		window.localStorage.setItem(key, value);
	}
	export function setObject(key: string, value: Object) {
		set(key, JSON.stringify(value));
	}

	export function remove(key: string) {
		window.localStorage.removeItem(key);
	}
}
