import { useQuery } from "@tanstack/react-query"

import cardService from '../services/card-service'
import { CharacterCardElement } from "./card-element"

const CardPage = () => {
    const characterCards = useQuery({
        queryKey: ['characterCards'],
        queryFn: cardService.getCharacterCards
    })
    // const [characters, setCharacters] = useState([''])

    // useEffect(() => {
    //     cardService.getCharacterCards().then(
    //         result => setCharacters(result)
    //     )
    // }, [])
    // console.log(characters)
    return (<div>
        {/* {characters.map(character => <p>{character}</p>)} */}
        {characterCards.data?.map(character => <CharacterCardElement key={character.id} {...character}/>)}
    </div>)
}

export default CardPage 