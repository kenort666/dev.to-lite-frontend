import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

export const SideBlock: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  return (
    <Paper sx={{ marginRight: '30px' }}>
      <Typography
        sx={{ margin: '30px 0 0 20px', padding: '10px 0 0 0' }}
        variant="h6"
      >
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
