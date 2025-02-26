import axios from "axios";
import { Deck, DetailedDeck } from "../../../shared/card-types";
import { API_URL } from "../utils/config";

const getAllDeck = async () => {
    const response = await axios.get<Deck[]>(`${API_URL}/api/deck`)
    return response.data
}

const getDeckById = async (id: string) => {
    const response = await axios.get<DetailedDeck>(`${API_URL}/api/deck/${id}`)
    return response.data
}

export default {getAllDeck, getDeckById}