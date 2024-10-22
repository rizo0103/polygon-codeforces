const express = require('express');
const app = express();

const polygonRoutes = require('./polygonApi');
const port = 5170;

app.use('/', polygonRoutes);

app.listen(port, () => {
    console.log(`Server listens http://localhost:${port}`);
});
