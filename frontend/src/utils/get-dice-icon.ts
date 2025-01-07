import { DiceType } from "../../../types/card-types";
import diceIcons from "../assets/dice-icons/dice-icons";

const getDiceIcon = (diceType: DiceType) => {
    switch (diceType) {
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
        case "GCG_COST_ENERGY":
            return diceIcons.energyIcon
        default:
            return diceIcons.voidIcon
    }
}

export default getDiceIcon