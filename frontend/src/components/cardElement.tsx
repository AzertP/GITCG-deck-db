import { Link } from "react-router-dom"
import { Card, CardActionArea, Skeleton, Tooltip, Typography } from "@mui/material"

import { CharacterCard, ActionCard, isCharacterCard } from "../../../types/card-types"
import getDiceIcon from "../utils/get-dice-icon"
import hpIcon from "../assets/hp-icon.png"

import './cardElement.css'
import TextInIcon from "./text-in-icon"
import { useState } from "react"
// import useCardElementStore from "../store/cardElementStore"

export const CardElement = (card: CharacterCard | ActionCard) => {
    const [loaded, setLoaded] = useState(false)

    const loadHandler = () => {
        // console.log('loaded')
        setLoaded(true)
    }
    // console.log(card.name, loaded)

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
                boxShadow: 15
            },
        }}>
            <CardActionArea>
                {!loaded && <Skeleton variant="rectangular" width={175} height={300}
                                    sx={{borderRadius: 6}}/>}
                <div style={{
                    display: loaded ? 'block' : 'none',
                    objectFit: 'cover',
                }}>
                {(isCharacterCard(card)? <CharacterCardElement character={card}
                                                                    handler={loadHandler}/>
                                            : <ActionCardElement action={card}
                                                                    handler={loadHandler}/>)}
                </div>
                {/* {isCharacterCard(card)
                    ? <CharacterCardElement {...card}/>
                    : <ActionCardElement {...card}/>
                } */}
            </CardActionArea>
        </Card>
    </Tooltip>

    </Link>
    )
}

const CharacterCardElement = ({character, handler} : {character: CharacterCard,
                                                    handler: () => void}) => {
    // console.log('hi')
    // const setLoaded = useCardElementStore().setLoaded

    return (
        <div className="card-container">
            <img src={character.img_link} 
                alt={character.name} className="card-img"
                onLoad={handler}/>
            <div className="top-icon">
                <TextInIcon icon={hpIcon} text={String(character.hp)}/>
            </div>
        </div>
    )
}

const ActionCardElement = ({action, handler} : {action: ActionCard,
                                                    handler: () => void}) => {
    const icon = getDiceIcon(action.cost.type)

    // TODO
    // Action card with energy cost
    return (
        <div className="card-container">
            {/* <h2>{character.name}</h2> */}
            <img src={action.img_link} 
                alt={action.name}
                className="card-img"
                onLoad={handler}></img>
            <div className="top-icon">
                <TextInIcon icon={icon} text={String(action.cost.count)}/>
            </div>
        </div>
    )
}

export const SkeletonCardElement = (card: CharacterCard | ActionCard) => {
    // const loaded = useCardElementStore().loaded

    // return (loaded? <Skeleton variant="rectangular" width={175} height={300}/>
    //               : isCharacterCard(card)? <CharacterCardElement {...card}/>
    //                                      : <ActionCardElement {...card}/>
    // )
}