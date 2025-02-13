import { Deck } from "../../../shared/card-types";
import {Link} from "react-router-dom";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } 
        from "@mui/material";

const DeckItem = ({deck} : {deck: Deck}) => {
    return <ListItem>
        <ListItemButton component={Link} to={`/deck/${deck.id}`}>
            <ListItemIcon>
                {deck.characters.map(character => 
                    <Box key={character.id} padding={0.3}>
                        <img src={character.img_link} 
                            alt={character.name} 
                            style={{width: "50px"}}/>
                    </Box>
                )}
            </ListItemIcon>
            <ListItemText primary={
                <Typography padding={1}>
                    {deck.name}
                </Typography>
            }/>
        </ListItemButton>
    </ListItem>
}

const SmallDecklist = ({ decks }: { decks: Deck[] }) => {
    if (decks.length === 0) {
        return <Box textAlign="center">
            <Typography variant="body1" sx={{color: "gray"}}>
                No deck found
            </Typography>
        </Box>
    }

    return <Box>
        <List>
            {decks.map(deck => {
                return <DeckItem key={deck.id} deck={deck}/>
            })}
        </List>
    </Box>
}

export default SmallDecklist;