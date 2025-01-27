import { Box, Button, List, ListItem, ListItemText, ListSubheader, Menu, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { allCharacterTags } from '../../utils/tags'
import useCharacterStore from '../../store/characterStore'

const FilterCharacterBoard = () => {
    const selectedTags = useCharacterStore(state => state.selectedTags)
    const toggleTag = useCharacterStore(state => state.toggleTag)

    const handleChange = (group: string) => 
                        (_event: React.MouseEvent<HTMLElement>, newTag: string) => {
        toggleTag(group, newTag)
    }

    return <Box width="100%" display="flex" justifyContent="center" flexDirection="column">
        {Object.entries(allCharacterTags).map(([group, tags]) => (
            <Box key={group} mb={2}>
                <Typography variant="h6" sx={{ textTransform: "capitalize", mb: 1}}>
                    {group}
                </Typography>
                    <ToggleButtonGroup
                        onChange={handleChange(group)}
                        value={selectedTags[group]}
                        exclusive
                        color="primary"
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {tags.map(tag => (
                            <ToggleButton key={tag} 
                                        size='small'
                                        value={tag} 
                                        className="tag-button">
                                {tag}
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
            </Box>
        ))}
    </Box>
}

export default FilterCharacterBoard