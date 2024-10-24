//task-apis.js

const express = require('express');
const compiler = require('compilex');
const router = express();
const tasks = require('../db/tasksDb');

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
        compiler.compileCPPWithInput(envData, code, "5 5 5", async (data) => {
            console.log(data);
            if (data.error) {
                return res.status(500).json({ error: data.error });
            } else {
                if (data.output === 'hello') {
                    return res.json({ output: 'correct' });
                } else {
                    return res.json({ output: 'incorrect' });
                }
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

router.post('/add-task', async(req, res) => {
    const { title, inputTests, outputTests, timeLimit, statement } = req.body;
    let input = false;

    try {
        if (inputTests) {
            input = true;
        }
        if (!title || !outputTests || !timeLimit || !statement) {
            return res.status(400).json({ message: 'Oops seems something is missed' });
        }

        const sql = `INSERT INTO tasks(title, statement, input, inputs, outputs, timeLimit) VALUES(?, ?, ?, ?, ?, ?)`;
        const values = [title, statement, input, inputTests, outputTests, timeLimit];

        tasks.query(sql, values, async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(422).json({ message: `db error ${err}` });
            }
            
            return res.status(201).json({ message: 'task was created successfully', data: results });
        });
    } catch (error) {
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

module.exports = router;
