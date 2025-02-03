import axios from "axios";
import {ActionCard, CardStats, CharacterCard} from '../../../types/card-types'

const base_URL = 'http://localhost:3001/api/card'

const getCharacterCards = async () => {
    // console.log(`${base_URL}/characters`)
    const response = await axios.get<CharacterCard[]>(`${base_URL}/characters`)
    return response.data
}

const getActionCards = async () => {
    // console.log(`${base_URL}/actions`)
    const response = await axios.get<ActionCard[]>(`${base_URL}/actions`)
    return response.data
}

const getCardById = async (id: number) => {
    const response = await axios.get<CardStats>(`${base_URL}/${id}`)
    return response.data
}


export default {getCharacterCards, getActionCards, getCardById}