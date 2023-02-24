import { AddCircleOutlined, RemoveCircleOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { useState } from "react";



interface Props {
    stock: number
}

export const ItemCounter: React.FC<Props> = ({ stock }) => {
    
    const [counter, setCounter] = useState(1);
    return (
        <Box display='flex' alignItems='center'>
            <IconButton>
                <RemoveCircleOutlined/>
            </IconButton>
            <Typography sx={{textAlign: 'center', width: 40}} >{ counter }</Typography>
            <IconButton>
                <AddCircleOutlined/>
            </IconButton>
        </Box>
    )
}
