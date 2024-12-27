import axios from "axios";
import { Deck } from "../../../types/card-types";

const base_URL = 'http://localhost:3001/api/deck'

const getAllDeck = async () => {
    const response = await axios.get<Deck[]>(base_URL)
    return response.data
}

export default {getAllDeck}