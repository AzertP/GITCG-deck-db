import { useQuery } from "@tanstack/react-query"

import cardService from '../services/card-service'
import { CharacterCardElement } from "./card-element"
import { useState } from "react"

const CardPage = () => {
    const characterCards = useQuery({
        queryKey: ['characterCards'],
        queryFn: cardService.getCharacterCards,
        staleTime: 12000
    })

    const actionCards = useQuery({
        queryKey: ['actionCards'],
        queryFn: cardService.getActionCards,
        staleTime: 12000
    })
    
    const [displayCharacter, setDisplayCharacter] = useState(true)

    // useEffect(() => {
    //     cardService.getCharacterCards().then(
    //         result => setCharacters(result)
    //     )
    // }, [])
    // console.log(characters)

    if (displayCharacter) {
        return (<div>
            <button>Character</button>
            <button onClick={() => setDisplayCharacter(false)}>Action</button>
            {characterCards.data?.map(character => <CharacterCardElement key={character.id} {...character}/>)}
        </div>)
    }
    else {
        return (<div>
            <button onClick={() => setDisplayCharacter(true)}>Character</button>
            <button onClick={() => setDisplayCharacter(false)}>Action</button>
            {actionCards.data?.map(action => <CharacterCardElement key={action.id} {...action}/>)}
        </div>)
    }
}

export default CardPage 