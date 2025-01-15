import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Box, Button, Grid2 } from "@mui/material"

import cardService from '../services/card-service'
import { CardElement } from "./card-element"
import { ActionCard, CharacterCard, isCharacterCard } from "../../../types/card-types"
import FilterCharacterBoard from "./filter-character"
import useCardStore from "../store/card-store"

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

    const selectedTags = useCardStore(state => state.selectedTags)

    const filterCards = (card: CharacterCard | ActionCard) => {
        if (Object.keys(selectedTags).length === 0) return true
        return Object.entries(selectedTags).every(([_group, tag]) => {
            if (!tag) return true
            return card.tags.includes(tag)
        })
    }
    // console.log('selected', selectedTags)
    // console.log('key', Object.keys(selectedTags))
    // console.log('entries', Object.entries(selectedTags))

    const filteredCharacterCards = useMemo(() => characterCards.data?.filter(filterCards),
                                        [characterCards.data, selectedTags])
    const filteredActionCards = useMemo(() => actionCards.data?.filter(filterCards),
                                        [actionCards.data, selectedTags])

    const [displayCharacter, setDisplayCharacter] = useState(true)
    // console.log("Hi")

    return (
        <div>
            <Button onClick={() => setDisplayCharacter(true)}>Character</Button>
            <Button onClick={() => setDisplayCharacter(false)}>Action</Button>
            <FilterCharacterBoard />
            <CardGrid cardList={displayCharacter ? filteredCharacterCards : filteredActionCards} />
        </div>
    )
}

export default CardPage 