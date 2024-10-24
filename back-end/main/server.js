const express = require('express');
const bodyParser = require('body-parser');
const compiler = require('compilex');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }))
app.use(cors({ origin: '*', credentials: true, }));
// Initialize compilex with default options
const options = { stats: true };
compiler.init(options);

app.post('/compile', (req, res) => {
    const { code, input } = req.body;
    const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };

    // If the code doesn't require input
    if (!input) {
        compiler.compileCPP(envData, code, (data) => {
            if (data.error) {
                res.status(500).json({ error: data.error });
            } else {
                res.json({ output: data.output });
            }
        });
    } else {
        // If the code requires input
        compiler.compileCPPWithInput(envData, code, input, (data) => {
            if (data.error) {
                res.status(500).json({ error: data.error });
            } else {
                res.json({ output: data.output });
            }
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Cleanup compilex on process exit
process.on('exit', () => {
    compiler.flush(() => {
        console.log('All temporary files flushed!');
    });
});
