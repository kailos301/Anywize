import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

export default () => (
  <Box style={{ height: '100vh', backgroundColor: 'inherit' }} p={6} textAlign="center">
    <CircularProgress color="primary" />
  </Box>
);
