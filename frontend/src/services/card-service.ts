import axios from "axios";
import {CharacterCard} from '../../../types/card-types'

const base_URL = 'http://localhost:3001/api/card'

const getCharacterCards = async () => {
    console.log(`${base_URL}/characters`)
    const response = await axios.get<CharacterCard[]>(`${base_URL}/characters`)
    return response.data
}

export default {getCharacterCards}