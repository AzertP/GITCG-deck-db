interface Card {
    name: string
    id: number
    img_link: string
}

interface Deck {
    name: string
    description: string
    deckcode: string
    id: number
}

type DiceType = 'GCG_COST_DICE_VOID' | 'GCG_COST_DICE_SAME'
                | 'GCG_COST_DICE_CRYO' | 'GCG_COST_DICE_ANEMO' |'GCG_COST_DICE_GEO'
                | 'GCG_COST_DICE_PYRO' | 'GCG_COST_DICE_ELECTRO' | 'GCG_COST_DICE_DENDRO'
                | 'GCG_COST_DICE_HYDRO'

interface ActionCard extends Card {
    cost: {type: DiceType, count: number}
}

interface CharacterCard extends Card {
    hp: number
}

interface DetailedDeck {
    name: string
    deckcode: string
    description: string
    characters: CharacterCard[]
    actions: ActionCard[]
}

function isCharacterCard(card: any): card is CharacterCard {
    return 'hp' in card
}

function isActionCard(card: any): card is ActionCard {
    return 'cost' in card
}

function isDiceType(type: string): type is DiceType {
    switch (type) {
        case 'GCG_COST_DICE_VOID':
        case 'GCG_COST_DICE_SAME':
        case 'GCG_COST_DICE_CRYO':
        case 'GCG_COST_DICE_ANEMO':
        case 'GCG_COST_DICE_GEO':
        case 'GCG_COST_DICE_PYRO':
        case 'GCG_COST_DICE_ELECTRO':
        case 'GCG_COST_DICE_DENDRO':
        case 'GCG_COST_DICE_HYDRO':
            return true
        default:
            return false
    }
}

export type {CharacterCard, ActionCard, Deck, DetailedDeck, DiceType}

export {isActionCard, isCharacterCard, isDiceType}