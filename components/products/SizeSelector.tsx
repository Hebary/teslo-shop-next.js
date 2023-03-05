import { Box, Button, Typography } from "@mui/material";
import type { ISize } from "@/interfaces";

interface Props {
  selectedSizes: string;
  availableSizes: ISize[];

  //method
  onSelectedSize: (size: ISize) => void;
}

export const SizeSelector: React.FC<Props> = ({ selectedSizes, availableSizes, onSelectedSize }) => {

    return (
        <>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Available Sizes</Typography>
            <Box display="flex" alignItems="center">
                {   availableSizes.map( size => 
                    <Button 
                        onClick={() => onSelectedSize(size)}
                        key={size}
                        size='small' 
                        color={selectedSizes === size 
                        ? 'primary'
                        : 'info'}
                    >{size}
                    </Button>
                )}
            </Box>
        </>
    );
};
