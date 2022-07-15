import SignupBox from '@app/components/SignupBox';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function SignupScreen() {
  const theme = useTheme();
  return (
    <Grid
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100%"
    >
      <Box position="absolute" top={10} left={24}>
        <Box display="flex" alignItems="center" rowGap={2}>
          <StorefrontIcon
            sx={{
              fontSize: '24px',
              color: theme.palette.primary.main,
              marginRight: 1,
            }}
          />
          <Typography
            variant="h1"
            noWrap={true}
            sx={{
              display: { xs: 'none', sm: 'initial' },
              fontSize: '24px',
              fontWeight: 600,
              color: theme.palette.primary.main,
              width: '154px',
              fontFamily: 'Caveat, cursive',
            }}
          >
            Lirve Café
          </Typography>
        </Box>
      </Box>
      <SignupBox />
    </Grid>
  );
}

export default SignupScreen;
