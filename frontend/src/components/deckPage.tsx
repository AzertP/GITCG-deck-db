import { useQuery } from "@tanstack/react-query"
import { Deck } from "../../../types/card-types"
import deckService from "../services/deck-service"

import { Link, Route, Routes, useParams } from "react-router-dom"
import { CardElement } from "./cardElement"
import { Box, Grid2, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"

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
        <ListItemText primary={
            <Typography variant="h4" component={Link} to={`${deck.id}`} gutterBottom>
                {deck.name}
            </Typography>
        }
        
        secondary={
            <Typography variant="body2" color="textSecondary">
                {deck.description}
            </Typography>
        }/>
</ListItem>
}

const DetailedDeckView = () => {
    const {id} = useParams()
    const deck = useQuery({
        queryKey: ['getDeckById'],
        queryFn: () => deckService.getDeckById(id? id : 'undefined')
    })

    if (deck.isLoading || deck.data === undefined) {
        return <div>
            Loading...
        </div>
    }

    return <Box>
        <Typography variant="h2" sx={{fontWeight: 550}}>{deck.data.name}</Typography>
        <Typography variant="body1"> {deck.data.description} </Typography>
        <Typography variant="h5" sx={{fontWeight: 550}}>Characters</Typography>
        <Grid2 container spacing={3} justifyContent="center">   
            {deck.data.characters.map(character => 
                <Grid2 key={character.id}>
                    <CardElement {...character}/>
                </Grid2>)}
        </Grid2>
        <Typography variant="h5" sx={{fontWeight: 550}}>Action Cards</Typography>
        <Grid2 container spacing={2}>
            {deck.data.actions.map((action, index) => 
                <Grid2 key={index}>
                    <CardElement {...action}/>
                </Grid2>)}
        </Grid2>
    </Box>
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