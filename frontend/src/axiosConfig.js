import axios from 'axios';

axios.defaults.baseURL =
  process.env.NODE_ENV !== 'production' ? 'http://localhost:5000' : '/';

// if we build our app using react-scripts build command provided by create-react app
//inside th package.json, the NODE_ENV enviornment variable will be set to
// production by default
