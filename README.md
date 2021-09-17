# Supabase Slack Clone

A sample app using [Supabase](https://supabase.io/) and React.

I rewrote the official [Next.js Slack Clone](https://github.com/supabase/supabase/tree/master/examples/nextjs-slack-clone) example with [Redux Toolkit](https://redux-toolkit.js.org/), [React Router v6](https://github.com/remix-run/react-router) and [Material UI v5](https://next.material-ui.com/).

# Set up

After you have cloned this repo:

1. Go to [app.supabase.io](https://app.supabase.io/) and create a new project.

2. Copy your Supabase project URL and `anon` key and save them in a `.env` file like so:


```
# .env
REACT_APP_SUPABASE_URL=YOUR_SUPABASE_URL
REACT_APP_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

3. Hit `yarn start` command to start the project!

If you have any troubles in getting started with this project, [this official tutorial](https://supabase.io/docs/guides/with-react) may be helpful.
