#!/usr/bin/env node

const http = require('http');
const app = require('../config/express');
const port = (process.env.PORT || 3000);

app.set('port', port);

const server = http.createServer(app);
server.listen(port);
