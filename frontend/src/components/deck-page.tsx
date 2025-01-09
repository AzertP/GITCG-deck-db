import { useQuery } from "@tanstack/react-query"
import { Deck } from "../../../types/card-types"
import deckService from "../services/deck-service"

import { Link, Route, Routes, useParams } from "react-router-dom"
import { CardElement } from "./card-element"
import { Box, Grid2, List, ListItem, ListItemIcon, Typography } from "@mui/material"

const DeckElement = (deck: Deck) => {
    return <ListItem divider>
        <ListItemIcon sx={{width: "33%"}}>
            <Box display="flex" width="100%">
                {deck.characters.map(character => (
                    <Box key={character.id} width="30%" padding={0.3}>
                        <img src={character.img_link} alt={character.name} style={{width: "100%"}}/>
                    </Box>
                ))}
            </Box>
        </ListItemIcon>
        <Box display="flex" flexDirection="column" padding={2}>
                <Typography variant="h4" component={Link} to={`${deck.id}`} gutterBottom>
                    {deck.name}
                </Typography>
                <Typography variant="body1" color="textSecondary">
                    Deck Code: {deck.deckcode}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {deck.description}
                </Typography>
        </Box>
</ListItem>
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
                <Grid2 key={character.id}>
                    <CardElement {...character}/>
                </Grid2>)}
        </Grid2>
        <h4>Action Cards</h4>
        <Grid2 container spacing={2}>
            {deck.data.actions.map((action, index) => 
                <Grid2 key={index}>
                    <CardElement {...action}/>
                </Grid2>)}
        </Grid2>
    </div>
}

const DeckList = ({decks}: {decks: Deck[]}) => {
    console.log(decks)
    return <List>
        {decks.map(deck => 
            <DeckElement key={deck.id} {...deck}/>)}
    </List>
}

const DeckPage = () => {
    const decks = useQuery({
        queryKey: ['getDecks'],
        queryFn: deckService.getAllDeck
    })

    if (decks.isLoading || decks.data === undefined) {
        return <div>
            Loading...
        </div>
    }
 
    return (<div>
        <Routes>
            <Route index element={<DeckList decks={decks.data}/>}/>
            <Route path=":id" element={<DetailedDeckView/>}/>
        </Routes>
    </div>)
}

export default DeckPage 