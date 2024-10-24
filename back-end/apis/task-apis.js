const express = require('express');
const compiler = require('compilex');
const router = express();

router.get('/test', async (req, res) => {
    try {
        return res.status(200).json({ message: '괜찮아' })
    } catch (error) {
        return res.status(500).json({ error: `Server error ${error}` });
    }
});

router.post('/compile', async(req, res) => {
    const { code, input } = req.body;
    const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };

    try {
        await compiler.compileCPPWithInput(envData, code, input, async (data) => {
            if (data.error) {
                await res.status(500).json({ error: data.error });
            } else {
                if (data.output === 'Hello, World!') {
                    await res.json({ output: 'correct' });
                } else {
                    await res.json({ output: 'incorrect' });
                }
                // res.json({ output: data.output });
            }
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
