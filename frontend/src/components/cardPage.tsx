import { useQuery } from "@tanstack/react-query"
import { useMemo, useState } from "react"
import { Box, Button, Grid2 } from "@mui/material"

import cardService from '../services/card-service'
import { CardElement } from "./cardElement"
import { ActionCard, CharacterCard, isCharacterCard } from "../../../types/card-types"
import FilterCharacterBoard from "./filter-boards/filterCharacter"

import useCardStore from "../store/characterStore"
import useActionStore from "../store/actionStore"
import FilterActionBoard from "./filter-boards/filterAction"

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

    const selectedCharacterTags = useCardStore(state => state.selectedTags)
    const selectedActionTag = useActionStore(state => state.selectedTag)

    const filterCharacter = (card: CharacterCard) => {
        if (Object.keys(selectedCharacterTags).length === 0) return true
        return Object.entries(selectedCharacterTags).every(([_group, tag]) => {
            if (!tag) return true
            return card.tags.includes(tag)
        })
    }

    console.log(selectedActionTag)
    const filterAction = (card: ActionCard) => {
        if (!selectedActionTag) return true
        return card.tags.includes(selectedActionTag)
    }
    
    const filteredCharacterCards = useMemo(() => characterCards.data?.filter(filterCharacter),
                                        [characterCards.data, selectedCharacterTags])
    const filteredActionCards = useMemo(() => actionCards.data?.filter(filterAction),
                                        [actionCards.data, selectedActionTag])
    console.log(filteredActionCards)
    const [displayCharacter, setDisplayCharacter] = useState(true)
    // console.log("Hi")

    return (
        <div>
            <Button onClick={() => setDisplayCharacter(true)}>Character</Button>
            <Button onClick={() => setDisplayCharacter(false)}>Action</Button>
            {displayCharacter? <FilterCharacterBoard /> : <FilterActionBoard />}
            <CardGrid cardList={displayCharacter ? filteredCharacterCards : filteredActionCards} />
        </div>
    )
}

export default CardPage 