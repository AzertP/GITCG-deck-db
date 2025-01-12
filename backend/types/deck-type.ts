export interface DBDeck {
    name: string
    deckcode: string
    description: string
    characters: number[] // shareID
    actions: number[] // shareID
}

export interface DeckSchema extends DBDeck  {
    id: string
}