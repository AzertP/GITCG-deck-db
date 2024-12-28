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

interface ActionCard extends Card{
    
}

interface CharacterCard extends Card {

}

interface DetailedDeck {
    name: string
    description: string
    characters: CharacterCard[]
    actions: ActionCard[]
}

export type {CharacterCard, ActionCard, Deck, DetailedDeck}