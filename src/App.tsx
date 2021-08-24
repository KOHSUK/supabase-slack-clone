import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CheckEmail } from 'components/check-email';
import { Messages } from 'components/messages';
import { Signin } from 'components/signin';
import { StoreProvider } from 'redux/provider';
import { PublicRoute } from 'routes/public-route';
import { AuthListener } from 'services/supabase';
import { PrivateRoute } from './routes/private-route';
import { Home } from 'components/home';

const App: React.VFC = () => {
  return (
    <StoreProvider>
      <AuthListener>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <PublicRoute path="/signin" element={<Signin />} />
            <PublicRoute path="/check-email" element={<CheckEmail />} />
            <PrivateRoute path="/messages" element={<Messages />} />
            <Route path="*" element={<div>Not Found</div>} />
          </Routes>
        </BrowserRouter>
      </AuthListener>
    </StoreProvider>
  );
};

export default App;
