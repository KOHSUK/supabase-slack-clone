import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CheckEmail } from 'components/check-email';
import { Channels } from 'components/channels';
import { Signin } from 'components/signin';
import { StoreProvider } from 'redux/provider';
import { PublicRoute } from 'routes/public-route';
import { AuthListener } from 'services/supabase';
import { PrivateRoute } from './routes/private-route';
import { Home } from 'components/home';

// TODO: AuthListenerをRoutesの中に移動する(中でnavigateしたいため)
const App: React.VFC = () => {
  return (
    <StoreProvider>
      <AuthListener>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <PublicRoute path="/signin" element={<Signin />} />
            <PublicRoute path="/check-email" element={<CheckEmail />} />
            <PrivateRoute path="/channels">
              <Route path="/:channelId" element={<Channels />} />
            </PrivateRoute>
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthListener>
    </StoreProvider>
  );
};

export default App;
