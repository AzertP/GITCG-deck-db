import axios from "axios";
import {ActionCard, CardStats, CharacterCard} from '../../../shared/card-types'
import {API_URL} from '../utils/config'

const getCharacterCards = async () => {
    // console.log(`${base_URL}/characters`)
    const response = await axios.get<CharacterCard[]>(`${API_URL}/api/card/characters`)
    return response.data
}

const getActionCards = async () => {
    // console.log(`${API_URL}/actions`)
    const response = await axios.get<ActionCard[]>(`${API_URL}/api/card/actions`)
    return response.data
}

const getCardById = async (id: number) => {
    const response = await axios.get<CardStats>(`${API_URL}/api/card/${id}`)
    return response.data
}


export default {getCharacterCards, getActionCards, getCardById}