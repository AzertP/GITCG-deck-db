import { DeckSchema } from '../types/deck-type';
import { Deck, CharacterCard, ActionCard, DetailedDeck } from "../../types/card-types";
import { convertActionCard, convertCharacterCard, 
        findActionCardByID, findCharacterCardByID } from "./cards-util";

export const deckSchemaToDeck = (deck: DeckSchema): Deck | undefined => {
    let characters: CharacterCard[] = []

    deck.characters.forEach(shareID => {
        const character = findCharacterCardByID(shareID)
        // console.log(character)
        if (character !== undefined) {
            characters.push(convertCharacterCard(character))
        }
    })

    if (characters.length !== 3) {
        console.log("Invalid deck")
        return undefined
    }

    return {
        name: deck.name,
        description: deck.description,
        deckcode: deck.deckcode,
        id: deck.id,
        characters: characters,
    }
}

export const deckSchemaToDetailed = (deck: DeckSchema): DetailedDeck | undefined => {
    let characters: CharacterCard[] = []

    deck.characters.forEach(shareID => {
        const character = findCharacterCardByID(shareID)
        if (character !== undefined) {
            characters.push(convertCharacterCard(character))
        }
    })

    let actions: ActionCard[] = []

    deck.actions.forEach(shareID => {
        const action = findActionCardByID(shareID)
        if (action !== undefined) {
            actions.push(convertActionCard(action))
        }
    })

    if (characters.length !== 3 || actions.length !== 30) {
        return undefined
    }

    return {
        name: deck.name,
        description: deck.description,
        deckcode: deck.deckcode,
        characters: characters,
        actions: actions
    }
}