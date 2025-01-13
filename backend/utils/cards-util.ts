import axios from 'axios'

import gdb, { TcgActionCards, TcgCharacterCards } from '@genshin-db/tcg'
import {ActionCard, CharacterCard, DiceType, isDiceType, Cost, Skill} from '../../types/card-types'

export function isTgcActionCard(card: TcgActionCards | TcgCharacterCards): card is TcgActionCards {
    return 'playcost' in card
}

export function isTcgCharacterCard(card: TcgActionCards | TcgCharacterCards): card is TcgCharacterCards {
    return 'hp' in card
}

const getAllCharacterCards = () => {
    return gdb.tcgcharactercards("names", {
        matchCategories: true,
        verboseCategories: true,
    }).filter(character => {
        return 'shareid' in character
    }).sort((a, b) => (a.shareid - b.shareid))
}

const getAllActionCards = () => {
    return gdb.tcgactioncards("names", {
        matchCategories: true,
        verboseCategories: true,
    }).filter(action => {
        return 'shareid' in action
    }).sort((a, b) => (a.shareid - b.shareid))
}

function getImageUrl(filename: string) {
    filename = filename.replace(" ", "_");
    return `https://gi.yatta.moe/assets/UI/gcg/${filename}.png`;
}

export const convertCharacterCard = (character: TcgCharacterCards) => {
    const convertedCard: CharacterCard = {
        name: character.name,
        id: character.id,
        hp: character.hp,
        skills: character.skills.map<Skill>((skill): Skill => {
            return {
                cost: skill.playcost.map<Cost>((cost): Cost => {
                    return {
                        type: isDiceType(cost.costtype)? cost.costtype : 'GCG_COST_DICE_SAME',
                        count: cost.count
                    }
                }),
                type: skill.type,
                name: skill.name,
                description: skill.description
            }
        }),
        img_link: getImageUrl(character.images.filename_cardface)
    }
    return convertedCard
}

export const convertActionCard = (action: TcgActionCards) => {
    
    let newCost: {type: DiceType, count: number} = {type: 'GCG_COST_DICE_SAME', count: 0}
    if (action.playcost.length > 0) {
        if (action.playcost.length > 1) {
            // TODO
            // Do something with this
            // console.log(action.name)
        }

        if (isDiceType(action.playcost[0].costtype)) {
            newCost.type = action.playcost[0].costtype
            newCost.count = action.playcost[0].count
        }
    }

    const convertedCard: ActionCard = {
        name: action.name,
        id: action.id,
        cost: newCost,
        description: action.description,
        img_link: getImageUrl(action.images.filename_cardface)
    }
    return convertedCard
}

export const characterCards = getAllCharacterCards()
export const actionCards = getAllActionCards()

// Find card by share ID
const findCharacterCardByShareID = (id: number) => {
    return characterCards.find(card => card.shareid === id)
}
const findActionCardByShareID = (id: number) => {
    return actionCards.find(card => card.shareid === id)
}

// Find card by ID
export const findCharacterCardByID = (id: number) => {
    return characterCards.find(card => card.id === id)
}
export const findActionCardByID = (id: number) => {
    return actionCards.find(card => card.id === id)
}
export const getCardById = (id: number) => {
    const card = characterCards.find(card => card.id === id)
    if (card === undefined)
        return actionCards.find(card => card.id === id)
    return card
}

interface DeckShareID {
    deckcode: string,
    offset: number,
    cardshareids: number[]
}

const getDeckFromShareids = (deck: DeckShareID) => {
    let characters: CharacterCard[] = []
    let actions: ActionCard[] = []
    deck.cardshareids.forEach(shareID => {
        const character = findCharacterCardByShareID(shareID)
        const action = findActionCardByShareID(shareID)

        if (character != undefined) {
            characters.push(convertCharacterCard(character))
        } else if (action != undefined) {
            actions.push(convertActionCard(action))
        }
    })

    if (characters.length === 3 && actions.length === 30) {
        return {characters, actions}
    }
    else 
        return undefined
}

const URL = "https://genshin-db-api.vercel.app/api/"

export const decodeDeck = async (deckcode: string) => {
    const decodeLink = `${URL}tcgdeckshare/decode?code=${deckcode}`

    const response = await axios.get<DeckShareID>(decodeLink)
    return getDeckFromShareids(response.data)
}

