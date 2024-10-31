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

router.post('/compile', async (req, res) => {
    const { code, id } = req.body;
    const envData = { OS: "windows", cmd: "g++", options: { timeout: 10000 } };

    try {
        const sql = `SELECT * FROM tasks WHERE id = ?`;
        tasks.query(sql, [id], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(422).json({ message: `db error ${err}` });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'Task not found' });
            }

            const inputData = JSON.parse(results[0].inputs);
            const outputData = JSON.parse(results[0].outputs);

            // Function to handle individual compilation
            const compileCode = (input, expectedOutput) => {
                return new Promise((resolve, reject) => {
                    compiler.compileCPPWithInput(envData, code, input, (data) => {
                        if (data.error) {
                            return reject(data.error);
                        }
                        if (data.output.trim() !== expectedOutput.trim()) {
                            return resolve(`Wrong answer on test case with input: ${input}`);
                        }
                        resolve(null);  // null indicates no error
                    });
                });
            };

            try {
                for (let i = 0; i < inputData.length; i++) {
                    const result = await compileCode(inputData[i], outputData[i]);
                    if (result) {
                        return res.json({ output: result });
                    }
                }

                // If all tests pass
                compiler.flush(() => {
                    console.log("flushed");
                })
                res.json({ output: 'All test cases passed' });
            } catch (compileError) {
                return res.status(500).json({ error: compileError });
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

router.post('/add-solution', async (req, res) => {
    const { id, username, verdict } = req.body;

    try {
        if (!id || !username || !verdict) {
            return res.status(400).json({ message: 'Seems something is missing' });
        }

        const sqlSelect = `SELECT * FROM users WHERE username = ?`;

        tasks.query(sqlSelect, [username], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(422).json({ message: `db error ${err}` });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: 'User not found' });
            }

            let tasksArray = JSON.parse(results[0].tasks);
            let taskExists = false;

            tasksArray = tasksArray.map(task => {
                if (task.id === id) {
                    taskExists = true;
                    return { id: id, verdict: verdict };
                }
                return task;
            });

            if (!taskExists) {
                tasksArray.push({ id: id, verdict: verdict });
            }

            const sqlUpdate = `UPDATE users SET tasks = ? WHERE username = ?`;
            tasks.query(sqlUpdate, [JSON.stringify(tasksArray), username], (err, updateResult) => {
                if (err) {
                    console.error(err);
                    return res.status(422).json({ message: `db error ${err}` });
                }

                return res.status(201).json({ message: 'ok', results: updateResult });
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error: ' + error });
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
