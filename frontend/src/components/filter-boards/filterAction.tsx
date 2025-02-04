import { allActionTags } from "../../utils/tags";
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'

import useActionStore from "../../store/filter-store/actionStore";

import './filter.css'

const FilterActionBoard = () => {
    const selectedTag = useActionStore(state => state.selectedTag)
    const changeTag = useActionStore(state => state.changeTag)

    const handleChange = (_event: React.MouseEvent<HTMLElement>, newTag: string) => {
        changeTag(newTag)
    }
    
    // console.log(selectedTag)

    return <Box>
        <ToggleButtonGroup onChange={handleChange} 
                            value={selectedTag} 
                            exclusive
                            color="primary"
                            sx={{display: 'flex', flexWrap: 'wrap'}}>
            {allActionTags.map((tag) => {
                return <ToggleButton key={tag} value={tag}
                className="tag-button">
                    {tag}
                </ToggleButton>
            })}
        </ToggleButtonGroup>
    </Box>
}

export default FilterActionBoard