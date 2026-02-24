import { Card } from "../models/Card";
import { Section } from "../models/Section";
import CardList from "./CardList";
import "./components.css";

function PhaseCardList({ title, phase }: { title: string; phase: Section }) {
	return (
		<div>
			<h3>{title}</h3>
			{phase?.description && <p>{phase?.description}</p>}
			<hr />
			<CardList cardList={phase?.card_list} />
		</div>
	);
}

export default PhaseCardList;
