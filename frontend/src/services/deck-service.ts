import axios from "axios";
import { Deck, DetailedDeck } from "../../../shared/card-types";

const base_URL = 'https://gitcg-deck-db.onrender.com'

const getAllDeck = async () => {
    const response = await axios.get<Deck[]>(`${base_URL}/api/deck`)
    return response.data
}

const getDeckById = async (id: string) => {
    const response = await axios.get<DetailedDeck>(`${base_URL}/api/deck/${id}`)
    return response.data
}

export default {getAllDeck, getDeckById}