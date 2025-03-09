import express from "express"
import cors from 'cors'

import cardRouter from "./controllers/card"
import deckRouter from "controllers/deck"
import logger from "middlewares/logger"
import { errorHandler } from "middlewares/errorHandler"

const app = express()

app.use(cors())
app.use(express.json())

app.use(logger)
app.use("/card", cardRouter)
app.use("/deck", deckRouter)

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server running on PORT=${PORT}`)
})