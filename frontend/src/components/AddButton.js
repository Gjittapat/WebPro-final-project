import * as React from 'react';
import Box from '@mui/material/Box';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function Icons() {
  return (
    <Box
      sx={{
        '& > :not(style)': {
          
        },
      }}
    >
      <AddCircleIcon sx={{ fontSize: 50 }} />
    </Box>
  );
}
