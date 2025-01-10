import mongoose from "mongoose";

import {MONGODB_URI} from "../utils/config";

console.log('connecting to', MONGODB_URI);
mongoose.connect(MONGODB_URI);

const deckSchema = new mongoose.Schema({

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

export const DeckModel = mongoose.model('Deck', deckSchema);