import { Link } from "react-router-dom"
import { Card, CardActionArea, Tooltip, Typography } from "@mui/material"

import { CharacterCard, ActionCard, isCharacterCard } from "../../../types/card-types"
import getDiceIcon from "../utils/get-dice-icon"
import hpIcon from "../assets/hp-icon.png"

import './card-element.css'
import TextInIcon from "./text-in-icon"

export const CardElement = (card: CharacterCard | ActionCard) => {
    return (
    <Link to={`/card/${card.id}`}>
    <Tooltip title= {
        <Typography sx={{fontSize: '2em'}}>
            {card.name}
        </Typography>}>

        <Card elevation={3} sx={{
            overflow: 'visible',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            borderRadius: '8%',
            '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: 15, // Add shadow for the raised effect
            },
        }}>
            <CardActionArea>
                {isCharacterCard(card)
                    ? <CharacterCardElement {...card}/>
                    : <ActionCardElement {...card}/>
                }
            </CardActionArea>
        </Card>
    </Tooltip>

    </Link>
    )
}

const CharacterCardElement = (character: CharacterCard) => {
    return (
        <div className="card-container">
            <img src={character.img_link} 
                alt={character.name} className="card-img"/>
            <div className="top-icon">
                <TextInIcon icon={hpIcon} text={String(character.hp)}/>
            </div>
        </div>
    )
}

const ActionCardElement = (action: ActionCard) => {
    const icon = getDiceIcon(action.cost.type)

    // TODO
    // Action card with energy cost
    return (
        <div className="card-container">
            {/* <h2>{character.name}</h2> */}

            <img src={action.img_link} 
                alt={action.name}
                className="card-img"></img>
            <div className="top-icon">
                <TextInIcon icon={icon} text={String(action.cost.count)}/>
            </div>
        </div>
    )
}