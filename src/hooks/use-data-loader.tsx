import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUserSelector } from 'redux/auth/selector';
import { channelsSlice, fetchChannels } from 'redux/channels/slice';
import { fetchMessages, Message, messagesSlice } from 'redux/messages/slice';
import { fetchUser } from 'redux/user/slice';
import { supabase } from 'services/supabase';
import { definitions } from 'types/supabase';

export const fetchUserById = async (userId: string) => {
  try {
    let { body } = await supabase
      .from<definitions['users']>('users')
      .select(`*`)
      .eq('id', userId);
    return body && body.length > 0 ? body[0] : null;
  } catch (error) {
    console.log('error', error);
  }
};

export const useDataLoader = (props: { channelId: string }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  const handleNewMessage = useCallback(
    async (newMessage: definitions['messages']) => {
      const user = await fetchUserById(newMessage.user_id);
      const message: Message = {
        ...newMessage,
        author: user || null,
      };
      dispatch(messagesSlice.actions.messageAddedOrUpdated(message));
    },
    [dispatch]
  );

  const handleNewChannel = useCallback(
    (channel: definitions['channels']) => {
      dispatch(channelsSlice.actions.channelAddedOrUpdated(channel));
    },
    [dispatch]
  );

  useEffect(() => {
    const messageListener = supabase
      .from<definitions['messages']>('messages')
      .on('INSERT', (payload) => handleNewMessage(payload.new))
      .subscribe();
    const channelListener = supabase
      .from<definitions['channels']>('channels')
      .on('INSERT', (payload) => handleNewChannel(payload.new))
      .subscribe();
    return () => {
      messageListener.unsubscribe();
      channelListener.unsubscribe();
    };
  }, [handleNewChannel, handleNewMessage]);

  useEffect(() => {
    const channelNum = parseInt(props.channelId);
    if (!isNaN(channelNum)) dispatch(fetchMessages(channelNum));
  }, [dispatch, props.channelId]);

  const user = useSelector(authUserSelector);
  useEffect(() => {
    if (user) {
      dispatch(fetchUser(user?.id));
    }
  }, [dispatch, user]);
};
