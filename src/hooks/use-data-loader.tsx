import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUserSelector } from 'redux/auth/selector';
import { fetchChannels } from 'redux/channels/slice';
import { fetchMessages } from 'redux/messages/slice';
import { fetchUser } from 'redux/user/slice';

export const useDataLoader = (props: { channelId: string }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChannels());
  }, [dispatch]);

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
