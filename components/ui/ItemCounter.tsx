import { AddCircleOutlined, RemoveCircleOutlined } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { useState } from "react";



interface Props {
    currentValue: number
    maxValue: number
    updatedQuantity: (value: number) => void
}

export const ItemCounter: React.FC<Props> = ({ currentValue, maxValue, updatedQuantity }) => {
    
    const updateQuantity = (value: number) => { 
        if (value === -1) {
            if (currentValue === 1) return
            return updatedQuantity(currentValue - 1);
        }
        if (currentValue >= maxValue) return;

        updatedQuantity(currentValue + 1);
    }


    return (
        <Box display='flex' alignItems='center'>
            <IconButton
                onClick={ () => updateQuantity(-1) }
            >
                <RemoveCircleOutlined/>
            </IconButton>
            <Typography sx={{textAlign: 'center', width: 40}} > { currentValue } </Typography>
            <IconButton
                onClick={ () => updateQuantity(+1) }
            >
                <AddCircleOutlined/>
            </IconButton>
        </Box>
    )
}
