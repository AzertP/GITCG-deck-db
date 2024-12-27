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

export type {CharacterCard, ActionCard, Deck}