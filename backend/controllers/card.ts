import express from 'express'
import { actionCards, characterCards, convertActionCard, convertCharacterCard,
        getCardById, isTcgCharacterCard
 } from 'utils/cards-util'
import { isActionCard } from '../../types/card-types'

const cardRouter = express.Router()

cardRouter.get("/characters", (_req, res) => {
    res.send(characterCards.map(character => convertCharacterCard(character)))
})

cardRouter.get("/actions", (_req, res) => {
    res.send(actionCards.map(action => convertActionCard(action)))
})

cardRouter.get("/:id", (req, res) => {
    const id = Number(req.params.id)
    const card = getCardById(id)

    if (card === undefined) {
        res.status(404).json({
            'error': 'Cannot find card'
        })
        return
    }

    if (isTcgCharacterCard(card)) {
        res.send(convertCharacterCard(card))
        return
    }

    res.send(convertActionCard(card))
    return
})

export default cardRouter