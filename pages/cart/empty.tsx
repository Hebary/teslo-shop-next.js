import { ShopLayout } from "@/components/layouts";
import { RemoveShoppingCartOutlined } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import NextLink from "next/link";

export const EmptyCart: React.FC = () => {
  return (
    <ShopLayout title="Empty Cart" pageDescription="The cart is empty">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 200px)"
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <RemoveShoppingCartOutlined sx={{ fontSize: 80 }} />
        <Box display="flex" flexDirection={"column"} alignItems="center">
          <Typography variant="h4">Your cart is empty</Typography>
          <NextLink href="/" passHref legacyBehavior>
            <Link typography={"h4"} color="secondary">
              Return
            </Link>
          </NextLink>
        </Box>
      </Box>
    </ShopLayout>
  );
};

export default EmptyCart;
