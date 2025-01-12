import mongoose from "mongoose";

import {MONGODB_URI} from "../utils/config";
import { DBDeck } from "types/deck-type";

console.log('connecting to', MONGODB_URI);
mongoose.connect(MONGODB_URI);

const DeckSchema = new mongoose.Schema<DBDeck>({

    name: {
        type: String,
        required: true
    },
    deckcode: {
        type: String,
        required: true
    },
    description: String,
    characters: [Number],
    actions: [Number]
})

DeckSchema.set('toObject', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

export const DeckModel = mongoose.model<DBDeck>('Deck', DeckSchema);