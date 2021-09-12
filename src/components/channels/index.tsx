import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
} from '@material-ui/core';
import { useStore } from 'hooks/use-store';
import { Link, useParams } from 'react-router-dom';
import { Messages } from './messages';
import { useAuth } from 'hooks/use-auth';
import { useSelector } from 'react-redux';
import { channelsSelectors } from 'redux/channels/selector';
import { Channel } from 'redux/channels/slice';

const ChannelItem: React.VFC<{ channel: Channel }> = ({ channel }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton component={Link} to={`/channels/${channel.id}`}>
        {channel.slug}
      </ListItemButton>
    </ListItem>
  );
};

export const Channels: React.VFC = () => {
  const { channelId } = useParams();
  useStore({ channelId: channelId });
  const { signOut } = useAuth();
  const channels = useSelector(channelsSelectors.selectAll);

  const handleSignOutClick = async () => {
    await signOut();
  };

  const drawerWidth = 240;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <List>
          <ListItem>
            <Button onClick={handleSignOutClick} fullWidth>
              Sign Out
            </Button>
          </ListItem>
          <Divider />
          {channels &&
            channels.map((channel) => <ChannelItem channel={channel} />)}
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          overflowY: 'auto',
        }}
      >
        <Messages />
      </Box>
    </Box>
  );
};
