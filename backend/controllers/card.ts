import express from 'express'
import { actionCards, characterCards, convertActionCard, convertCharacterCard,
        getCardById, isTcgCharacterCard
 } from 'utils/cards-util'
import { CardStats } from '../../types/card-types'
import { DeckModel } from 'models/deck-model'
import { deckSchemaToDeck } from 'utils/deck-utils'
import { DeckSchema } from 'types/deck-type'

const cardRouter = express.Router()

cardRouter.get("/characters", (_req, res) => {
    res.send(characterCards.map(character => convertCharacterCard(character)))
})

cardRouter.get("/actions", (_req, res) => {
    res.send(actionCards.map(action => convertActionCard(action)))
})

cardRouter.get("/:id", async (req, res) => {
    const id = Number(req.params.id)
    const card = getCardById(id)
    
    if (card === undefined) {
        res.status(404).json({
            'error': 'Cannot find card'
        })
        return
    }

    if (isTcgCharacterCard(card)) {
        const decks = await DeckModel.find({
            characters: card.id  
        })
        const appears_in = decks.map(deck => deckSchemaToDeck(deck.toObject<DeckSchema>()))
                                .filter(deck => deck !== undefined)
        const msg: CardStats = {
            card: convertCharacterCard(card),
            appears_in: appears_in
        }

        res.send(msg)
        return
    }
    
    // Action card
    const decks = await DeckModel.find({
        actions: card.id  
    })
    const appears_in = decks.map(deck => deckSchemaToDeck(deck.toObject<DeckSchema>()))
                            .filter(deck => deck !== undefined)
    const msg: CardStats = {
        card: convertActionCard(card),
        appears_in: appears_in
    }
    res.send(msg)
    return
})

export default cardRouter