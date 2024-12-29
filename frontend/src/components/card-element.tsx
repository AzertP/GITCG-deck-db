import { CharacterCard } from "../../../types/card-types"

export const CharacterCardElement = (character: CharacterCard) => {
    return (
        <div>
            {/* <h2>{character.name}</h2> */}
            <img src={character.img_link} 
                style={{maxWidth: '100%', height: 'auto'}}
                alt={character.name}></img>
        </div>
    )
}