// Bootstrap loader — ensure environment variables are loaded when running `node index.js`
require('dotenv').config();

// Forward to the real server implementation
require('./src/index.js');
// Bootstrap file — delegate to the real server implementation in src/
require('dotenv').config();
// Require the src/index.js entry. This keeps a single source of truth for the server
require('./src/index');
