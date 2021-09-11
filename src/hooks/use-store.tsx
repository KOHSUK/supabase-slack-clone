import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { channelsSlice } from 'redux/channels/slice';
import { Message, messagesSlice } from 'redux/messages/slice';
import { usersSelectors } from 'redux/users/selector';
import { usersSlice } from 'redux/users/slice';
import { supabase } from 'services/supabase';
import { definitions } from 'types/supabase';

/**
 * Fetch all messages and their authors
 * @param {number} channelId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchMessages = async (
  channelId: string,
  setState?: (messages: Message[]) => void
) => {
  try {
    let { body } = await supabase
      .from<Message>('messages')
      .select(`*, author:user_id(*)`)
      .eq('channel_id', channelId)
      .order('inserted_at', { ascending: true });
    if (setState && body) setState(body);
    return body;
  } catch (error) {
    console.log('error', error);
  }
};

export const useStore = (props: { channelId: string }) => {
  const dispatch = useDispatch();

  const handleNewOrUpdatedUser = useCallback(
    (user: definitions['users']) => {
      dispatch(usersSlice.actions.userAddedOrUpdated(user));
    },
    [dispatch]
  );

  const handleNewMessage = useCallback(
    (message: definitions['messages']) => {
      // dispatch(messagesSlice.actions.messageAddedOrUpdated(message));
    },
    [dispatch]
  );

  const handleDeletedMessage = useCallback(
    (message: definitions['messages']) => {
      dispatch(messagesSlice.actions.messageDeleted(message.id));
    },
    [dispatch]
  );

  const handleNewChannel = useCallback(
    (channel: definitions['channels']) => {
      dispatch(channelsSlice.actions.channelAddedOrUpdated(channel));
    },
    [dispatch]
  );

  const handleDeletedChannel = useCallback(
    (channel: definitions['channels']) => {
      dispatch(channelsSlice.actions.channelDeleted(channel.id));
    },
    [dispatch]
  );

  useEffect(() => {
    const messageListener = supabase
      .from('messages')
      .on('INSERT', (payload) => handleNewMessage(payload.new))
      .on('DELETE', (payload) => handleDeletedMessage(payload.old))
      .subscribe();
    const userListener = supabase
      .from<definitions['users']>('users')
      .on('*', (payload) => handleNewOrUpdatedUser(payload.new))
      .subscribe();
    const channelListener = supabase
      .from('channels')
      .on('INSERT', (payload) => handleNewChannel(payload.new))
      .on('DELETE', (payload) => handleDeletedChannel(payload.old))
      .subscribe();
    return () => {
      messageListener.unsubscribe();
      userListener.unsubscribe();
      channelListener.unsubscribe();
    };
  }, [
    handleDeletedChannel,
    handleDeletedMessage,
    handleNewChannel,
    handleNewMessage,
    handleNewOrUpdatedUser,
  ]);

  // Update when the route changes
  useEffect(() => {
    if (props.channelId) {
      fetchMessages(props.channelId, (messages) => {
        dispatch(usersSlice.actions.setAllUsers(messages.map((m) => m.author)));
        dispatch(messagesSlice.actions.setAllMessages(messages));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.channelId]);

  const users = useSelector(usersSelectors.selectAll);

  return {
    users,
  };
};
