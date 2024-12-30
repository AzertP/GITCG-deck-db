import { CharacterCard, ActionCard } from "../../../types/card-types"
import hpIcon from "../assets/hp-icon.png"
import diceIcons from "../assets/dice-icons/dice-icons"

import './card.css'

export const CharacterCardElement = (character: CharacterCard) => {
    return (
        <div className="card-container">
            <img src={character.img_link} 
                alt={character.name} className="card-img"/>
            <div className="top-icon">
                <div className="icon-container">
                    <img src={hpIcon} className="top-icon-img"/>
                    <div className="text-in-icon"> {character.hp} </div>
                </div>
            </div>
        </div>
    )
}

export const ActionCardElement = (action: ActionCard) => {
    const icon = () => {
        switch (action.cost.type) {
            case 'GCG_COST_DICE_ANEMO':
                return diceIcons.anemoIcon
            case 'GCG_COST_DICE_CRYO':
                return diceIcons.cryoIcon
            case 'GCG_COST_DICE_DENDRO':
                return diceIcons.dendroIcon
            case 'GCG_COST_DICE_ELECTRO':
                return diceIcons.electroIcon
            case 'GCG_COST_DICE_GEO':
                return diceIcons.geoIcon
            case 'GCG_COST_DICE_HYDRO':
                return diceIcons.hydroIcon
            case 'GCG_COST_DICE_PYRO':
                return diceIcons.pyroIcon
            case 'GCG_COST_DICE_SAME':
                return diceIcons.sameIcon
            case 'GCG_COST_DICE_VOID':
                return diceIcons.voidIcon
        
            default:
                return diceIcons.voidIcon
        }
    }

    // TODO
    // Action card with energy cost
    return (
        <div className="card-container">
            {/* <h2>{character.name}</h2> */}

            <img src={action.img_link} 
                alt={action.name}
                className="card-img"></img>
            <div className="top-icon">
                <div className="icon-container">
                    <img src={icon()} className="top-icon-img"/>
                    <div className="text-in-icon">{action.cost.count}</div>  
                </div>
            </div>
        </div>
    )
}