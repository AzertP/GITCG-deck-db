import { useParams } from "react-router-dom"
import { Box, Typography,   
    List, ListItem, ListItemText, ListItemIcon, 
    Button} from "@mui/material";

import cardService from "../services/card-service"
import { ActionCard, CharacterCard, isActionCard, Skill } from "../../../types/card-types"

import TextInIcon from "./text-in-icon";
import getDiceIcon from "../utils/get-dice-icon";
import hpIcon from '../assets/hp-icon.png'
import SmallDecklist from "./smallDecklist";
import LoadingScreen from "./loading";
import NotFoundPage from "./404page";
import { useCardIdQuery } from "../queries/queries";

const ActionDescription = (action: ActionCard) => {
    return <Box>
            <Box display="flex" alignItems="center">
                    <Box sx={{width: "50px", height: "auto"}}>
                        <TextInIcon icon={getDiceIcon(action.cost.type)} 
                                    text={String(action.cost.count)}/>
                    </Box>
                    <Typography variant="h4" align="center">
                        {action.name}
                    </Typography>
            </Box>
            <Box padding={1}>
                <Typography>
                    {action.description}
                </Typography>
            </Box>
        </Box>
}

const SkillLine = (skill: Skill) => {
    return <ListItem divider>
        <ListItemIcon>
            <Box width="100px" display="flex" justifyContent="center">
                {skill.cost.map((cost, index) => {
                    return <Box maxWidth="50px" key={index}>
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

        <Box padding={1}>
            <Typography sx={{
                whiteSpace: "nowrap",
                color: "gray"
            }} variant="caption">
                {skill.type}
            </Typography>
        </Box>
    </ListItem>
}

const CharacterDescription = (character: CharacterCard) => {
    return <Box>
        <Box display="flex" alignItems="center">
            <Box width="50px" height="auto">
                <TextInIcon icon={hpIcon} 
                            text={String(character.hp)}/>
            </Box>
            <Typography variant="h4" padding={1}>    
                {character.name}
            </Typography>
        </Box>
        <List>
            {character.skills.map((skill, index) => (
                <SkillLine key={index} {...skill}/>
            ))}
        </List>
        
    </Box>
}

const CardDetailed = () => {
    const {id} = useParams()
    
    const cardStat = useCardIdQuery(id)
    
    if (cardStat.isError) {
        console.log('error?')
        return <NotFoundPage/>
    }

    if (cardStat.isLoading || !cardStat.data) {
        return <LoadingScreen/>
    }



    const card = cardStat.data.card
    const appears_in = cardStat.data.appears_in

    return (
        <>
        <Box padding={4} 
             display="flex" 
             sx={{
                border: "1px solid #ccc"
             }}
             flexDirection={{ xs: "column", sm: "row" }}
        >
            <Box component="img" src={card.img_link} sx={{
                // flex: "1 1 30%",
                width: "250px",
                height: "auto",
                objectFit: "scale-down"
            }} alt={card.name}>
            </Box>

            <Box width="100%" padding={3}>
                {isActionCard(card)
                    ? <ActionDescription {...card}/>
                    : <CharacterDescription {...card}/>
                }
                <Button href={`https://gi.yatta.moe/en/gcg/${card.id}`}>
                    More details
                </Button>
            </Box>
        </Box>
        <Box padding={1}>
            <Typography variant="h4">
                Appears in
            </Typography>
            <SmallDecklist decks={appears_in}/>
        </Box>
        </>
    )
}


export default CardDetailed