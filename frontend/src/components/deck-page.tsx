import { useQuery } from "@tanstack/react-query"
import { Deck } from "../../../types/card-types"
import deckService from "../services/deck-service"

import { Link, Route, Routes, useParams } from "react-router-dom"
import { CardElement } from "./card-element"
import { Grid2 } from "@mui/material"

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
        <p> {deck.data.description} </p>
        <h2>Characters</h2>
        <Grid2 container spacing={3}>
            {deck.data.characters.map(character => 
                <Grid2>
                    <CardElement {...character}/>
                </Grid2>)}
        </Grid2>
        <h4>Action Cards</h4>
        <Grid2 container spacing={1}>
            {deck.data.actions.map(action => 
                <Grid2>
                    <CardElement {...action}/>
                </Grid2>)}
        </Grid2>
    </div>
}

const DeckPage = () => {
    const decks = useQuery({
        queryKey: ['getDecks'],
        queryFn: deckService.getAllDeck
    })
 
    return (<div>
        <Routes>
            <Route index element
                            =<div>{
                                decks.data?.map(deck => 
                                    <DeckElement key={deck.id} {...deck}/>)}
                             </div>/>
            <Route path=":id" element={<DetailedDeckView/>}/>
        </Routes>
    </div>)
}

export default DeckPage 