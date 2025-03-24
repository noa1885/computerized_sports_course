import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Stack, Box } from '@mui/material';

const IndexPage = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
      {/* כותרת ממורכזת במרכז הדף */}
      <h1 style={{ color: '#6A1B9A', textAlign: 'center' }}>עמוד הבית</h1>

      {/* מיקום הכפתורים בצד ימין למעלה */}
      <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
        {!user ? (
          <Stack direction="row" spacing={2}>
            <Link to="/login">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#FF7043',
                  '&:hover': { backgroundColor: '#FF5722' },
                  color: 'white',
                }}
              >
                התחבר
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                variant="outlined"
                sx={{
                  borderColor: '#FFEB3B',
                  color: '#FFEB3B',
                  '&:hover': {
                    borderColor: '#FFEB3B',
                    backgroundColor: '#FFEB3B',
                    color: '#FFF',
                  },
                }}
              >
                הירשם
              </Button>
            </Link>
          </Stack>
        ) : (
          <p style={{ textAlign: 'center' }}>ברוך הבא, {user.name}!</p>
        )}
      </Box>
    </Box>
  );
};

export default IndexPage;
