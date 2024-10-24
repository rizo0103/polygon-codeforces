const express = require('express');
const bodyParser = require('body-parser');
const compiler = require('compilex');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const tasksRoutes = require('../apis/task-apis');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors({ origin: '*', credentials: true, }));
app.use('/', tasksRoutes);

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
