import { allActionTags } from "../../utils/tags";
import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'

import useActionStore from "../../store/actionStore";

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
                // sx={{
                //     // borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                //     '&:not(:first-of-type)': {
                //         borderLeft: '1px solid rgba(0, 0, 0, 0.12)',
                //     },
                //     borderRadius: '0%'
                // }}
                className="tag-button">
                    {tag}
                </ToggleButton>
            })}
        </ToggleButtonGroup>
    </Box>
}

export default FilterActionBoard