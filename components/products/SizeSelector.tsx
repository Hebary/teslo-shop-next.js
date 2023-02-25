import { Box, Button, Typography } from "@mui/material";
import type { ISizes } from "@/interfaces";

interface Props {
  selectedSizes: string;
  availableSizes: ISizes[];
}

export const SizeSelector: React.FC<Props> = ({ selectedSizes, availableSizes }) => {

    return (
        <>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Available Sizes</Typography>
            <Box display="flex" alignItems="center">
                {   availableSizes.map( size => 
                    <Button 
                    key={size}
                        size='small' 
                    >{size}
                    </Button>
                )}
            </Box>
        </>
    );
};
