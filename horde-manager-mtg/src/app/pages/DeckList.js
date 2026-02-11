import "./App.css";
import DeckCard from "../components/DeckCard";

function DeckList() {
    const decks = [
        {
            id: 1,
            name: "Invasion Phyrexianne",
            image: new URL("https://cards.scryfall.io/art_crop/front/a/a/aace4c44-7250-414b-aac4-df042a1e2e1d.jpg?1675956894"),
        },
        {
            id: 2,
            name: "Haunted One",
            image: new URL("https://cards.scryfall.io/art_crop/front/9/c/9c735bda-5454-4177-a23a-f9f00b7480d2.jpg?1562878661"),
        },
        {
            id: 3,
            name: "24h du Mans",
            image: new URL("https://cards.scryfall.io/art_crop/front/9/8/98a79557-8ed6-4d9a-b4e1-cece05664984.jpg?1738356552"),
        },
        {
            id: 4,
            name: "Zombie Army",
            image: new URL("https://cards.scryfall.io/art_crop/front/e/9/e9e00112-8c6c-4551-ad68-389e315fe148.jpg?1543676118"),
        },
        {
            id: 5,
            name: "Le donjon",
            image: new URL("https://cards.scryfall.io/art_crop/front/2/f/2ff39de2-d071-4568-baac-25b505a2da56.jpg?1562013207"),
        },
    ];
    return (
        <div className="App">
            <header className="App-header">
                <p>Deck List</p>
                <hr />
            </header>
            <div className="App-body card-container col3">
                {decks.map((deck) => (
                    <DeckCard key={deck.id} deck={deck} />
                ))}
            </div>
        </div>
    );
}

export default DeckList;
