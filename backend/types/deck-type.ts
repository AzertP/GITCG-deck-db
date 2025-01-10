export interface DeckSchema {
    id: number
    name: string
    deckcode: string
    description: string
    characters: number[] // shareID
    actions: number[] // shareID
}