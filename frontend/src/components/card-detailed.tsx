import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import cardService from "../services/card-service"
import { ActionCard, CharacterCard, isActionCard } from "../../../types/card-types"
import { Box, Grid2, Typography, Card, CardContent } from "@mui/material";

import './card-detailed.css'

const ActionPage = (action: ActionCard) => {
    return <Box>
            <Typography variant="h4">
                {action.name}
            </Typography>
            <Typography>
                {action.description}
            </Typography>
        </Box>
}

const CardDetailed = () => {
    const {id} = useParams()

    const card = useQuery({
        queryKey: ['singleCard'],
        queryFn: () => cardService.getCardById(Number(id))
    })

    if (card.isLoading || card.error) {
        return <div>
            Is loading...
        </div>
    }

    console.log(card.data)

    return (
        <Box padding={4}>
            <Grid2 container spacing={3}>
                <Grid2 size={4}>
                    <Card elevation={3}>
                        {/* <CardContent style={{padding: 0}}> */}
                        <img src={card.data?.img_link} className="Card-image"></img>
                        {/* </CardContent> */}
                    </Card>
                </Grid2>
                <Grid2 size={8}>
                    {isActionCard(card.data)
                        ? <ActionPage {...card.data}/>
                        : <div>Nothing</div>
                    }
                </Grid2>
            </Grid2>
        </Box>
    )
}


export default CardDetailed