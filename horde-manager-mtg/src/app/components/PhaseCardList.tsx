import { Phase } from "../models/Phase";
import "./components.css";

function PhaseCardList({ title, phase }: { title: string; phase: Phase }) {
	return (
		<div>
			<h3>{title}</h3>
			{phase?.description && <p>{phase?.description}</p>}
			<hr />
			<div className="card-container col7">
				{phase?.card_list && phase?.card_list.map((cardObj) => <div>{cardObj.name}</div>)}
			</div>
		</div>
	);
}

export default PhaseCardList;
