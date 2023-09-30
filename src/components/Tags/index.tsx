import { Cancel } from '@mui/icons-material';
import { Box, Stack, Typography } from '@mui/material';

import styles from './Tags.module.scss';

export const Tags: React.FC<{
  data: string;
  handleOnDelete: (data: string) => void;
}> = ({ data, handleOnDelete }) => {
  return (
    <Box className={styles.tags}>
      <Stack direction="row" gap={1}>
        <Typography>{data}</Typography>
        <Cancel
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleOnDelete(data);
          }}
        />
      </Stack>
    </Box>
  );
};
