import axios from "axios";
import {ActionCard, CardStats, CharacterCard} from '../../../shared/card-types'

const base_URL = 'https://gitcg-deck-db.onrender.com'

const getCharacterCards = async () => {
    // console.log(`${base_URL}/characters`)
    const response = await axios.get<CharacterCard[]>(`${base_URL}/api/card/characters`)
    return response.data
}

const getActionCards = async () => {
    // console.log(`${base_URL}/actions`)
    const response = await axios.get<ActionCard[]>(`${base_URL}/api/card/actions`)
    return response.data
}

const getCardById = async (id: number) => {
    const response = await axios.get<CardStats>(`${base_URL}/api/card/${id}`)
    return response.data
}


export default {getCharacterCards, getActionCards, getCardById}