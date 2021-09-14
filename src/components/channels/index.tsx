import React from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  Typography,
} from '@material-ui/core';
import { useStore } from 'hooks/use-store';
import { Link, useParams } from 'react-router-dom';
import { Messages } from './messages';
import { useAuth } from 'hooks/use-auth';
import { useDispatch, useSelector } from 'react-redux';
import { channelsSelectors } from 'redux/channels/selector';
import { addChannel, Channel } from 'redux/channels/slice';
import { userSelector } from 'redux/user/selector';

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

  const dispatch = useDispatch();

  const handleSignOutClick = async () => {
    await signOut();
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  };
  const user = useSelector(userSelector);

  const handleNewChannel = async () => {
    const slug = prompt('Please enter your name');
    if (slug && user) {
      await dispatch(addChannel({ slug: slugify(slug), user_id: user.id }));
    }
  };

  const channels = useSelector(channelsSelectors.selectAll);
  const drawerWidth = 240;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        height: '100%',
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
          <ListItem
            sx={{
              bgcolor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.contrastText,
            }}
          >
            <Typography variant="body1" noWrap>
              {user?.username}
            </Typography>
          </ListItem>
          <ListItem>
            <Button onClick={handleSignOutClick} fullWidth>
              Sign Out
            </Button>
          </ListItem>
          <Divider />
          <ListItem
            sx={{
              bgcolor: (theme) => theme.palette.primary.light,
              color: (theme) => theme.palette.primary.contrastText,
            }}
          >
            <Typography variant="body1">Channels</Typography>
          </ListItem>
          <ListItem>
            <Button onClick={handleNewChannel} fullWidth>
              New Channel
            </Button>
          </ListItem>
          <Divider />
          {channels &&
            channels.map((channel) => (
              <ChannelItem key={channel.id} channel={channel} />
            ))}
        </List>
      </Drawer>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          overflowY: 'auto',
          height: '100%',
        }}
      >
        <Messages />
      </Box>
    </Box>
  );
};
