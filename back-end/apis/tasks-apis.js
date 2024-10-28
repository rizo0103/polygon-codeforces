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
    const { code, id } = req.body;
    const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };

    try {

        const sql = `SELECT * FROM tasks WHERE id = ${id}`;
        let inputData = [], outputData = [];

        tasks.query(sql, async(err, results) => {
            if (err) {
                console.error(err);
                return res.status(422).json({ message: `db error ${err}` });
            }
            inputData = [...results];
            outputData = [...results];
            let str = inputData[0].inputs;
            let otr = outputData[0].outputs;
            str = JSON.parse(str);
            otr = JSON.parse(otr);
            let ans = [];
            for (let i = 0; i < str.length; ++i) {
                compiler.compileCPPWithInput(envData, code, str[i], async (data) => {
                    if (data.error) {
                        return res.status(500).json({ error: data.error });
                    } else {
                        if (data.output === otr[i]) {
                            // console.log("correct");
                            ans[i] = "correct";
                            // return res.json({ output: 'correct' });
                        } else {
                            ans[i] = 'incorrect';
                            // console.log("incorrect");
                        }
                    }
                    if (i === str.length - 1) {
                        return res.status(200).json({ answers: ans });
                    }
                });
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

router.get('/get-tasks-list', async(req, res) => {
    try {
        const sql = `SELECT * FROM tasks`;

        tasks.query(sql, async(err, results) => {
            if (err) {
                console.error(err);
                return res.status(422).json({ message: `db error: ${err}` });
            }

            return await res.status(200).json({ message: 'successfully got data from db', results: results });
        });
    } catch (error){
        console.error(error);
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

router.get('/get-task-details/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const sql = `SELECT * FROM tasks WHERE id = ${id}`;

        tasks.query(sql, async (err, results) => {
            if (err) {
                console.error(err);
                return await res.status(422).json({ message: `db error ${err}` });
            }

            return await res.status(200).json({ message: 'successfully got data from db', results: results });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: `Internal server error: ${error}` });
    }
});

module.exports = router;
