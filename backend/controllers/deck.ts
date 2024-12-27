import express from 'express'
import { decodeDeck } from 'utils/cards_util'

interface NewDeckQuery {
    deckcode: string
}

const deckRouter = express.Router()

const isNewDeckQuery = (data: any): data is NewDeckQuery => {
    return 'deckcode' in data
}

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