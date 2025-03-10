import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <CircularProgress size={60} thickness={5} />
      <Typography variant="h6" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;