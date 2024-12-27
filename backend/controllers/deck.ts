import express from 'express'
import { decodeDeck } from 'utils/cards_util'
import { ActionCard, CharacterCard, Deck } from '../../types/card-types'

interface NewDeckQuery {
    deckcode: string
}

const deckData: Deck[] = [
    {
        name: "Crime and Punishment",
        description: "Archetype: Aggro, Combo?",
        deckcode: "G1AAyRMMAZDQ0U8NBBHwZ1kWCHDh3WMPCUAw9JcPCVBx9lcPFWFwC7QQC7FAEMURDAAA",
        id: 0
    },
    {
        name: "Hydro Chiori",
        description: "Real Chiori deck, play only this one",
        deckcode: "FkHixaUNF5HCyqgOGxFy0mIOClLCO0kPGSES44IQHGJyi7gZDKJhC7cRDPLRasIXDZEB",
        id: 1
    }
]

const deckRouter = express.Router()

const isNewDeckQuery = (data: any): data is NewDeckQuery => {
    return 'deckcode' in data
}

deckRouter.get("/", (_req, res) => {
    res.send(deckData)
})

deckRouter.post("/submit", async (req, res) => {
    const data = req.body
    
    if (isNewDeckQuery(data)) {
        res.send("okay")
        const deck = await decodeDeck(data.deckcode)
        if (deck !== undefined) {
            deck.forEach(card => {
                console.log(card.name)
            })
        }
    }
    else {
        res.status(400).json({error: "Invalid request"})
    } 
})

export default deckRouter