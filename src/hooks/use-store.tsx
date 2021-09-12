import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchChannels } from 'redux/channels/slice';
import { fetchMessages } from 'redux/messages/slice';
import { supabase } from 'services/supabase';
import { definitions } from 'types/supabase';

/**
 * Fetch a single user
 * @param {number} userId
 * @param {function} setState Optionally pass in a hook or callback to set the state
 */
export const fetchUser = async (
  userId: string,
  setState?: (user: definitions['users']) => void
) => {
  try {
    let { body } = await supabase
      .from<definitions['users']>('users')
      .select(`*`)
      .eq('id', userId);
    if (!body || body.length < 1) return null;

    let user = body[0];
    if (setState) setState(user);
    return user;
  } catch (error) {
    console.log('error', error);

    return null;
  }
};

export const useStore = (props: { channelId: string }) => {
  const dispatch = useDispatch();

  // Load initial data and set up listeners
  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

  // Update when the route changes
  useEffect(() => {
    const channelNum = parseInt(props.channelId);
    if (!isNaN(channelNum)) dispatch(fetchMessages(channelNum));
  }, [dispatch, props.channelId]);
};
