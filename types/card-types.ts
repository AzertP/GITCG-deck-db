interface Card {
    name: string
    id: number
    img_link: string
}

interface ActionCard extends Card{
    
}

interface CharacterCard extends Card {

}

export {CharacterCard, ActionCard}