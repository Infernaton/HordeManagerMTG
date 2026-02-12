import { useEffect, useState } from "react";
import { Deck } from "../models/Deck";
import { Store } from "../store";
import "./App.css";
import { useNavigate, useParams } from "react-router";

function DeckList() {
    const params = useParams();
    const [currentDeck, setCurrentDeck] = useState(Store.getObject("currentDeck") as Deck);

    const updateDeck = (updated: Deck) => {
        //Make API Call to update deck
        setCurrentDeck(updated);
        Store.setObject("currentDeck", updated);
    };

    if (currentDeck == null) {
        // Do not work like intended
        // currentDeck in not updated correctly OR data display is priorise and crash the app
        useEffect(() => {
            if (params.id == null || params.id == undefined) {
                let navigate = useNavigate();
                navigate("/");
            }
            let tmp = Store.Decks.find((deck: Deck) => deck.id == parseInt(params.id || "0"));
            console.log(tmp);
            if (tmp == null || tmp == undefined) {
                let navigate = useNavigate();
                navigate("/");
            }
            setCurrentDeck(tmp || ({} as Deck));
            // Make API Call to fetch with params.id
            // const fetch = await ...
            // setCurrentDeck(fetch);
            Store.setObject("currentDeck", currentDeck);
        });
    }
    return (
        <div className="Main-page">
            <header className="Main-header deck-page">
                <h1>{currentDeck.name ?? "No Deck Found"}</h1>
                <div className="header-cover left" style={{ backgroundImage: "url(" + currentDeck.image + ")" }}></div>
            </header>
            <div className="Main-body">
                <hr />
                <div className="card-container col10"></div>
            </div>
        </div>
    );
}

export default DeckList;
