import { Deck } from "../../../types/card-types"

import { useMemo, useState } from "react"
import { Link, Route, Routes, useParams } from "react-router-dom"
import { Box, Button, Grid2, List, ListItem, ListItemIcon, ListItemText, 
    Pagination, Snackbar, Typography } from "@mui/material"


import { CardElement } from "./cardElement"
import LoadingScreen from "./loading"
import NotFoundPage from "./404page"

import useDeckPageStore from "../store/deckPageStore"
import { useDeckByIdQuery, useDecksQuery } from "../queries/queries"

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
            <Typography variant="h4" component={Link} to={`${deck.id}`}
                        sx={{
                            textDecoration: 'none', // Remove underline
                            color: 'primary', // Use primary color
                            fontWeight: 'bold', // Bold text
                            '&:visited': {
                                color: 'primary.light', 
                            },
                            '&:hover': {
                                color: 'primary.main', 
                                textDecoration: 'underline',
                            },
                        }}>
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
    const deck = useDeckByIdQuery(id)

    const [copied, setCopied] = useState(false)

    if (deck.isError) {
        return <NotFoundPage/>
    }
    
    const handleCopy = () => {
        if (deck.data === undefined) return

        navigator.clipboard.writeText(deck.data.deckcode)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000);
    }

    if (deck.isLoading || deck.data === undefined) {
        return <LoadingScreen/>
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
        
        {/* <Typography variant="h5"> Deckcode </Typography> */}
        <Box display="flex" justifyContent="center" alignContent="center" padding={5}>
            {/* <Typography color="primary" bgcolor="ButtonFace"> Deckcode: </Typography> */}
            <Typography alignContent="center" whiteSpace="pre-wrap"
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            border: "1px black solid"
                        }}>
                {deck.data.deckcode}
            </Typography>
            <Button variant="contained" sx={{borderRadius: 0}} onClick={handleCopy}>
                {copied? "Copied" : "Copy"}
            </Button>
        </Box>
        <Snackbar
            anchorOrigin={{"horizontal": "center", "vertical": "bottom"}}
            open={copied}
            message={"Copied to clipboard"}/>
    </Box>
}

const DeckList = ({decks, page, pageSize, setPage}: {decks: Deck[], 
                                                    page: number, 
                                                    pageSize: number,
                                                    setPage: (newPage: number) => void}) => {
    const currentCards = useMemo(() => {
        const startIndex = (page - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return decks.slice(startIndex, endIndex)
    }, [page])

    return <Box>
        <List>
            {currentCards.map(deck => 
                <DeckElement key={deck.id} {...deck}/>)}
        </List>

        <Box display="flex" justifyContent="center" padding={2}>
            <Pagination count={Math.ceil(decks.length / pageSize)} 
                        variant="outlined" 
                        color="primary"
                        onChange={(_e, newPage) => setPage(newPage)}
                        page={page}/>
        </Box>
    </Box>
}

const DeckPage = () => {
    const decks = useDecksQuery()

    const {currentPage, pageLimit, setCurrentPage} = useDeckPageStore()

    
    if (decks.isLoading || decks.data === undefined) {
        return <LoadingScreen/>
    }
 
    return (<div>
        <Routes>
            <Route index element={<DeckList decks={decks.data}
                                            page={currentPage}
                                            pageSize={pageLimit}
                                            setPage={setCurrentPage}/>}/>
            <Route path=":id" element={<DetailedDeckView/>}/>
        </Routes>
    </div>)
}

export default DeckPage 