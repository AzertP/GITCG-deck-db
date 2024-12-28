import { useQuery } from "@tanstack/react-query"
import { Deck } from "../../../types/card-types"
import deckService from "../services/deck-service"

import { Link, Route, Routes, useParams } from "react-router-dom"
import { CharacterCardElement } from "./card-element"

const DeckElement = (deck: Deck) => {
    return <div>
        <Link to={`${deck.id}`}><h2>{deck.name}</h2></Link>
        <p>{deck.deckcode}</p>
        <p>{deck.description}</p>
    </div>
}

const DetailedDeckView = () => {
    const {id} = useParams()
    const deck = useQuery({
        queryKey: ['getDeckById'],
        queryFn: () => deckService.getDeckById(Number(id))
    })

    if (deck.isLoading || deck.data === undefined) {
        return <div>
            Loading...
        </div>
    }

    return <div>
        <h2>{deck.data.name}</h2>
        <p> Deck code: {deck.data.description} </p>
        <h4>Characters</h4>
        {deck.data.characters.map(character => <CharacterCardElement {...character}/>)}
        <h4>Action Cards</h4>
        {deck.data.actions.map(action => <CharacterCardElement {...action}/>)}
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