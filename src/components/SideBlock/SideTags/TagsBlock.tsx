import List from '@mui/material/List';
import React from 'react';
import { SideBlock } from './SideBlock';
import { usePostTags } from '../../../hooks/tags/usePostTags';
import {
  Box,
  CircularProgress,
  LinearProgress,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import TagIcon from '@mui/icons-material/Tag';
import { Link } from 'react-router-dom';

export const TagsBlock: React.FC = () => {
  const { tags, isLoading } = usePostTags();

  return (
    <SideBlock title="Тэги">
      <List sx={{ marginBottom: '10px' }} disablePadding>
        {isLoading ? (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress color="inherit" />
          </Box>
        ) : tags?.data.length ? (
          tags?.data.map((data) => (
            <Link
              key={data._id}
              to={`/tags/${data.tags}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TagIcon />
                  </ListItemIcon>
                  <ListItemText primary={data.tags} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))
        ) : (
          <Box padding="5px 0 15px 0" ml="20px">
            Тэги отстутствуют!
          </Box>
        )}
      </List>
    </SideBlock>
  );
};
