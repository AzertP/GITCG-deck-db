import express from 'express'
import { decodeDeck } from 'utils/cards-util'
import { Deck, DetailedDeck } from '../../types/card-types'
import { DeckSchema } from 'models/deckModel'
import { deckSchemaToDeck, deckSchemaToDetailed } from 'utils/deck-utils'

interface NewDeckQuery {
    deckcode: string
}

const deckData2: DeckSchema[] = [
    {
        id: 0,
        name: "Crime and Punishment",
        description: "Archetype: Aggro, Combo?",
        deckcode: "G1AAyRMMAZDQ0U8NBBHwZ1kWCHDh3WMPCUAw9JcPCVBx9lcPFWFwC7QQC7FAEMURDAAA",
        characters: [432, 19, 29],
        actions: [79,79,89,142,355,147,151,151,343,343,180,180,
                    197,197,201,201,209,209,359,359,221,244,244,
                    245,246,246,267,267,272,272]
    },
    {
        id: 1,
        name: "Hydro Chiori",
        description: "Real Chiori deck, play only this one",
        deckcode: "FkHixaUNF5HCyqgOGxFy0mIOClLCO0kPGSES44IQHGJyi7gZDKJhC7cRDPLRasIXDZEB",
        characters: [350,420,364],
        actions: [423,423,353,156,328,385,385,439,439,182,182,
                    189,193,196,196,201,201,209,209,213,314,226,
                    226,246,394,394,266,271,361,361]
    }
]

const deckRouter = express.Router()

const isNewDeckQuery = (data: any): data is NewDeckQuery => {
    return 'deckcode' in data
}

deckRouter.get("/", (_req, res) => {
    res.send(deckData2.map(deck => deckSchemaToDeck(deck)))
})

// Get a detailed deck with id
deckRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const deck = deckData2.find(deck => deck.id === id)

    if (deck === undefined) {
        res.status(404).json({error: "Can't find content"})
        return
    }

    const detailedDeck = deckSchemaToDetailed(deck)
    // This should not happen
    if (detailedDeck === undefined) {
        res.status(500).json({error: "Internal error"})
        return
    }
    
    res.send(detailedDeck)
})

deckRouter.post("/submit", async (req, res) => {
    const data = req.body
    
    if (isNewDeckQuery(data)) {
        res.send("okay")
        const deck = await decodeDeck(data.deckcode)
        if (deck !== undefined) {
            deck.characters.forEach(character => {
                console.log(character.name)
            })
            console.log('==================')
            deck.actions.forEach(action => {
                console.log(action.name)
            })
        }
    }
    else {
        res.status(400).json({error: "Invalid request"})
    } 
})

export default deckRouter