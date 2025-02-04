import { useQuery } from "@tanstack/react-query";

import cardService from "../services/card-service";
import deckService from "../services/deck-service";

export const useCharactersQuery = () => useQuery({
    queryKey: ['characterCards'],
    queryFn: cardService.getCharacterCards
})

export const useActionsQuery = () => useQuery({
    queryKey: ['actionCards'],
    queryFn: cardService.getActionCards
})

export const useCardIdQuery = (id: string | undefined) => useQuery({
    queryKey: ['cardId'],
    queryFn: () => cardService.getCardById(Number(id))
})

export const useDeckByIdQuery = (id: string | undefined) => useQuery({
        queryKey: ['deckId'],
        queryFn: () => deckService.getDeckById(id? id : 'undefined')
})

export const useDecksQuery = () => useQuery({
        queryKey: ['decks'],
        queryFn: deckService.getAllDeck
})