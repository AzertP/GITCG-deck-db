import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { Button, Grid2 } from "@mui/material"

import cardService from '../services/card-service'
import { CardElement } from "./card-element"
import { ActionCard, CharacterCard, isCharacterCard } from "../../../types/card-types"

// const TopButtons = () => {

// }

const CardGrid = ({cardList}: {cardList: CharacterCard[] | ActionCard[] | undefined}) => {
    if (cardList === undefined) 
        return <div>Loading...</div>
    
    return <Grid2 container spacing={2}>
        {cardList.map(card => {
            if (isCharacterCard(card))
                return <Grid2 key={card.id}>
                    <CardElement {...card}/>
                </Grid2>

            return <Grid2 key={card.id}>
                <CardElement {...card}/>
            </Grid2>
        })}
    </Grid2>
}

const CardPage = () => {
    const characterCards = useQuery({
        queryKey: ['characterCards'],
        queryFn: cardService.getCharacterCards,
        staleTime: 12000
    })

    const actionCards = useQuery({
        queryKey: ['actionCards'],
        queryFn: cardService.getActionCards,
        staleTime: 12000
    })
    
    const [displayCharacter, setDisplayCharacter] = useState(true)

    // useEffect(() => {
    //     cardService.getCharacterCards().then(
    //         result => setCharacters(result)
    //     )
    // }, [])
    // console.log(characters)

    if (displayCharacter) {
        return (<div>
            <Button onClick={() => setDisplayCharacter(true)}>Character</Button>
            <Button onClick={() => setDisplayCharacter(false)}>Action</Button>
            <CardGrid cardList={characterCards.data}/>
        </div>)
    }
    else {
        return (<div>
            <Button onClick={() => setDisplayCharacter(true)}>Character</Button>
            <Button onClick={() => setDisplayCharacter(false)}>Action</Button>
            <CardGrid cardList={actionCards.data}/>
        </div>)
    }
}

export default CardPage 