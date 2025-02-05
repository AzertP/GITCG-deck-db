import express from 'express'
import { decodeDeck } from 'utils/cards-util'
import { deckSchemaToDeck, deckSchemaToDetailed } from 'utils/deck-utils'
import { DeckModel } from 'models/deck-model'
import { DeckSchema } from 'types/deck-type'
import { Types } from 'mongoose'
import authenticate from 'utils/authenticate'

interface NewDeckQuery {
    name: string,
    description: string,
    deckcode: string,
    password: string
}

const deckRouter = express.Router()

const isNewDeckQuery = (data: any): data is NewDeckQuery => {
    return ('deckcode' in data 
        && 'description' in data
        && 'name' in data
        && 'password' in data)
}

deckRouter.get("/", async (_req, res) => {
    const decks = await DeckModel.find({})
    res.send(decks.map(decks => deckSchemaToDeck(decks.toObject<DeckSchema>())))
})

// Get a detailed deck with id
deckRouter.get("/:id", async (req, res) => {
    const id = req.params.id
    if (Types.ObjectId.isValid(id) === false) {
        res.status(400).json({error: "Invalid ID"})
        return
    }

    const deck = await DeckModel.findById(id)

    if (deck === null) {
        res.status(404).json({error: "Can't find content"})
        return
    }

    const detailedDeck = deckSchemaToDetailed(deck.toObject<DeckSchema>())
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
        if (authenticate(data.password) === false) {
            res.status(400).json({error: 'Wrong password'})
            return
        }

        const deck = await decodeDeck(data.deckcode)
        if (deck === undefined) {
            res.status(400).json({error: "Invalid deck code"})
            return
        }
        
        deck.characters.forEach(character => {
            console.log(character.name)
        })
        console.log('==================')
        deck.actions.forEach(action => {
            console.log(action.name)
        })

        const newDeck = new DeckModel({
            ...data,
            characters: deck.characters.map(character => character.id),
            actions: deck.actions.map(action => action.id)
        })
        
        const savedDeck = await newDeck.save()
        res.status(201).json(savedDeck)
    }
    else {
        res.status(400).json({error: "Invalid request, missing field(s)"})
    } 
})

export default deckRouter