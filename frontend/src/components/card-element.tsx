import { CharacterCard } from "../../../types/card-types"

export const CharacterCardElement = (character: CharacterCard) => {
    return (
        <div>
            <h2>{character.name}</h2>
            <img src={character.img_link}></img>
        </div>
    )
}