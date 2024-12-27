import { useQuery } from "@tanstack/react-query"
import { Deck } from "../../../types/card-types"
import deckService from "../services/deck-service"

import { Link, Route, useMatch, Routes } from "react-router-dom"

const DeckElement = (deck: Deck) => {
    return <div>
        <Link to={`${deck.id}`}><h2>{deck.name}</h2></Link>
        <p>{deck.deckcode}</p>
        <p>{deck.description}</p>
    </div>
}

const DetailedDeckView = () => {
    return <div>
        Hi you are viewing something
    </div>
}

const DeckPage = () => {
    const decks = useQuery({
        queryKey: ['getDecks'],
        queryFn: deckService.getAllDeck
    })
 
    return (<div>
        <Routes>
            <Route path="/" element
                            ={decks.data?.map(deck => 
                                <DeckElement key={deck.id} {...deck}/>)}/>
            <Route path=":id" element={<DetailedDeckView/>}/>
        </Routes>
    </div>)
}

export default DeckPage 