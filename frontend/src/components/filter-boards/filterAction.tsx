import { allActionTags } from "../../utils/tags";
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

import useActionStore from "../../store/actionStore";

const FilterActionBoard = () => {
    const selectedTag = useActionStore(state => state.selectedTag)
    const changeTag = useActionStore(state => state.changeTag)

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newTag: string) => {
        changeTag(newTag)
    }
    
    // console.log(selectedTag)

    return <Box>
        <ToggleButtonGroup onChange={handleChange} 
                            value={selectedTag} exclusive>
            {allActionTags.map(tag => {
                return <ToggleButton key={tag} value={tag}>
                    {tag}
                </ToggleButton>
            })}
        </ToggleButtonGroup>
    </Box>
}

export default FilterActionBoard