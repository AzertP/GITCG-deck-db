import { useEffect, useMemo } from "react"
import { Box, Button, Collapse, Grid2, Pagination, TextField } from "@mui/material"
import FilterAltIcon from '@mui/icons-material/FilterAlt'

import { ActionCard, CharacterCard, isCharacterCard } from "../../../types/card-types"

import { CardElement } from "./cardElement"
import FilterActionBoard from "./filter-boards/filterAction"
import FilterCharacterBoard from "./filter-boards/filterCharacter"
import LoadingScreen from "./loading"

import useCharacterStore from "../store/characterStore"
import useActionStore from "../store/actionStore"
import useCardPageStore from "../store/cardPageStore"
import { useActionsQuery, useCharactersQuery } from "../queries/queries"

const CardGrid = ({cardList}: {cardList: CharacterCard[] | ActionCard[] | undefined}) => {
    if (cardList === undefined) 
        return <LoadingScreen/>
    
    return <Grid2 container spacing={2} sx={{marginTop: 2}}>
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
    const characterCards = useCharactersQuery()
    const actionCards = useActionsQuery()

    const {displayCharacter, setDisplayCharacter, 
            showFilter, toggleFilter, 
            searchQuery, setSearchQuery,
            currentPage, setCurrentPage, pageLimit} = useCardPageStore()
    
    const selectedCharacterTags = useCharacterStore(state => state.selectedTags)
    const selectedActionTag = useActionStore(state => state.selectedTag)

    const filterCharacter = (card: CharacterCard) => {
        if (Object.keys(selectedCharacterTags).length === 0) return true
        return Object.entries(selectedCharacterTags).every(([_group, tag]) => {
            if (!tag) return true
            return card.tags.includes(tag)
        })
    }
    
    const filterAction = (card: ActionCard) => {
        if (!selectedActionTag) return true
        return card.tags.includes(selectedActionTag)
    }
    
    const filteredCharacterCards = useMemo(() => characterCards.data?.filter(card => 
        filterCharacter(card) && card.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [characterCards.data, selectedCharacterTags, searchQuery])
    const filteredActionCards = useMemo(() => actionCards.data?.filter(card => 
        filterAction(card) && card.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [actionCards.data, selectedActionTag, searchQuery])

    const currentCards = useMemo(() => {
        const startIndex = (currentPage - 1) * pageLimit;
        const endIndex = startIndex + pageLimit;
        return displayCharacter ? filteredCharacterCards?.slice(startIndex, endIndex) : filteredActionCards?.slice(startIndex, endIndex);
    }, [displayCharacter, filteredCharacterCards, filteredActionCards, currentPage, pageLimit]);
    // console.log(currentPage)
    // console.log("Hi")

    
    const maxPages = useMemo(() => {
        if (displayCharacter) {
            if (filteredCharacterCards === undefined) return 1
            return Math.ceil(filteredCharacterCards?.length / pageLimit)
        }
        if (filteredActionCards === undefined) return 1
        return Math.ceil(filteredActionCards?.length / pageLimit)
    }, [displayCharacter, filteredCharacterCards, filteredActionCards, pageLimit])
    
    useEffect(() => {
        setCurrentPage(1)
    }, [filteredCharacterCards, filteredActionCards, displayCharacter])

    return (
        <div>
            <Box display={'flex'} justifyContent="space-between" sx={{marginTop: 2}}>
                <Box>
                    <Button onClick={() => setDisplayCharacter(true)}>Character</Button>
                    <Button onClick={() => setDisplayCharacter(false)}>Action</Button>
                </Box>
                <Box display="flex">
                    <Button onClick={toggleFilter} sx={{marginRight: 2}}
                            startIcon={<FilterAltIcon/>}
                            color="primary"
                        >Filter</Button>
                    <TextField 
                        label="Search" 
                        variant="outlined" 
                        size="small"
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Box>
            </Box>
            <Collapse in={showFilter}>
                <Box display="flex" sx={{flexWrap: 'wrap', paddingTop: 1}}>
                    {displayCharacter ? <FilterCharacterBoard /> : <FilterActionBoard />}
                </Box>
            </Collapse>
            <CardGrid cardList={currentCards}/>
            <Box display="flex" justifyContent="center" padding={2}>
                <Pagination count={maxPages} variant="outlined" color="primary"
                            onChange={(_e, newPage) => setCurrentPage(newPage)}
                            page={currentPage}/>
            </Box>
        </div>
    )
}

export default CardPage 