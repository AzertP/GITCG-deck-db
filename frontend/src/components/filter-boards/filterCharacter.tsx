import { Box, Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { allCharacterTags } from '../../utils/tags'
import useCharacterStore from '../../store/characterStore'

const FilterCharacterBoard = () => {
    const selectedTags = useCharacterStore(state => state.selectedTags)
    const toggleTag = useCharacterStore(state => state.toggleTag)

    const handleChange = (group: string) => 
                        (_event: React.MouseEvent<HTMLElement>, newTag: string) => {
        toggleTag(group, newTag)
    }
    
    // console.log(selectedTags)

    return <Box>
        {Object.entries(allCharacterTags).map(([group, tags]) => {
            return <Box key={group}>
                <Typography variant="h6" sx={{textTransform:"capitalize"}}>{group}</Typography>
                <ToggleButtonGroup onChange={handleChange(group)} 
                                    value={selectedTags[group]} exclusive>
                    {tags.map(tag => {
                        return <ToggleButton key={tag} value={tag}>
                            {tag}
                        </ToggleButton>
                    })}
                </ToggleButtonGroup>
            </Box>
        })}
    </Box>
}

export default FilterCharacterBoard