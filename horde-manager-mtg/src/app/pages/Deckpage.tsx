import { useEffect, useState } from "react";
import { Deck } from "../models/Deck";
import { Store } from "../store";
import "./App.css";
import { useNavigate, useParams } from "react-router";
import PhaseCardList from "../components/PhaseCardList";

function DeckList() {
	const navigate = useNavigate();
	const params = useParams();
	const idDeck: Number = parseInt(params.id || "0");
	const [currentDeck, setCurrentDeck] = useState(Store.getObject("currentDeck") as Deck);

	const updateDeck = (updated: Deck) => {
		//Make API Call to update deck
		setCurrentDeck(updated);
		Store.setObject("currentDeck", updated);
	};

	// Do not work like intended
	// currentDeck in not updated correctly OR data display is priorise and crash the app
	useEffect(() => {
		if (currentDeck != null && currentDeck.id == idDeck) return;

		if (idDeck == 0) {
			navigate("/", { replace: true });
			return;
		}

		// Make API Call to fetch with params.id
		// const fetch = await ...
		const tmp = Store.Decks.find((deck: Deck) => deck.id == idDeck);
		setCurrentDeck(tmp || ({} as Deck));
		Store.setObject("currentDeck", currentDeck);
	}, [idDeck]);

	return (
		<div className="Main-page">
			<header className="Main-header deck-page">
				<h1>{currentDeck?.name ?? "No Deck Found"}</h1>
				<div
					className="header-cover left"
					style={{
						backgroundImage: currentDeck?.image ? "url(" + currentDeck.image + ")" : "revert-layer",
					}}></div>
			</header>
			<div className="Main-body">
				{currentDeck?.bosses && currentDeck?.bosses?.card_list?.length > 0 && (
					<PhaseCardList title="Boss" phase={currentDeck.bosses} />
				)}
				{currentDeck?.phases &&
					currentDeck?.phases.map((phaseObj) => (
						<PhaseCardList key={phaseObj.id as React.Key} title={`Phase ${phaseObj.id}`} phase={phaseObj} />
					))}
			</div>
		</div>
	);
}

export default DeckList;
