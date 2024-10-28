// server.js

const express = require('express');
const bodyParser = require('body-parser');
const compiler = require('compilex');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const tasksRoutes = require('../apis/tasks-apis');
const usersRoutes = require('../apis/users-apis'); 

app.use(bodyParser.json());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors({ origin: '*' }));
app.use('/', tasksRoutes);
app.use('/', usersRoutes);
app.options('*', cors());

// Initialize compilex with default options
const options = { stats: true };
compiler.init(options);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Cleanup compilex on process exit
process.on('exit', () => {
    compiler.flush(() => {
        console.log('All temporary files flushed!');
    });
});
