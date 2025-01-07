import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import cardService from "../services/card-service"
import { ActionCard, CharacterCard, isActionCard, Skill } from "../../../types/card-types"
import { Box, Grid2, Typography, Card, CardContent, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Divider } from "@mui/material";

import './card-detailed.css'
import TextInIcon from "./text-in-icon";
import getDiceIcon from "../utils/get-dice-icon";

const ActionDescription = (action: ActionCard) => {
    return <Box padding={3}>
            <Box display="flex" alignItems="center">
                    <Box className="cost-icon">
                        <TextInIcon icon={getDiceIcon(action.cost.type)} 
                                    text={String(action.cost.count)}/>
                    </Box>
                    <Typography variant="h4" align="center">
                        {action.name}
                    </Typography>
            </Box>
            <Typography>
                {action.description}
            </Typography>
        </Box>
}

const SkillLine = (skill: Skill) => {
    return <ListItem>
        <ListItemIcon>
            <Box width="100px" display="flex" justifyContent="center">
            {skill.cost.map(cost => {
                return <Box maxWidth="50px">
                    <TextInIcon icon={getDiceIcon(cost.type)}
                        text={String(cost.count)}/>
                    </Box>
            })}
            </Box>
        </ListItemIcon>
        <ListItemText 
            primary={<Typography variant="h6">
                {skill.name}
            </Typography>}
            secondary={
                <Typography>
                    {skill.description}
                </Typography>
            }/>
        <ListSubheader sx={{whiteSpace: "nowrap"}}>
            {skill.type}
        </ListSubheader>
    </ListItem>
}

const CharacterDescription = (character: CharacterCard) => {
    return <Box padding={2}>
        <Typography variant="h4">    
            {character.name}
        </Typography>
        <List>
            {character.skills.map(skill => 
            <>
                <SkillLine {...skill}/> 
                <Divider variant="middle" component="li" />
            </>)}
        </List>
    </Box>
}

const CardDetailed = () => {
    const {id} = useParams()

    const card = useQuery({
        queryKey: ['singleCard'],
        queryFn: () => cardService.getCardById(Number(id))
    })

    if (card.isLoading || card.error || card.data === undefined) {
        return <div>
            Is loading...
        </div>
    }

    console.log(card.data)

    return (
        <Box padding={4} 
             display="flex" 
             sx={{
                border: "1px solid #ccc"
             }}
             flexDirection={{ xs: "column", sm: "row" }}
        >
            <Box component="img" src={card.data?.img_link} sx={{
                // flex: "1 1 30%",
                width: "250px",
                height: "auto",
                objectFit: "scale-down"
            }}>
            </Box>

            <Box>
                {isActionCard(card.data)
                    ? <ActionDescription {...card.data}/>
                    : <CharacterDescription {...card.data}/>
                }
            </Box>
        </Box>
    )
}


export default CardDetailed