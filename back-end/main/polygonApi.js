const express = require('express'), 
      router = express(), 
      axios = require('axios'),
      multer = require('multer');

const POLYGON_API_KEY = 'd5a4a7344a4107592931c6a08efb03f41ebf2438';
const POLYGON_API_SECRET = '2fb143bf751d97f0572bc567d3ac4dc9da320d77';

const upload = multer({ dest: 'uploads/' });

router.get('/get', async(req, res) => {
    console.log('Hello, World!');
});

module.exports = router;
