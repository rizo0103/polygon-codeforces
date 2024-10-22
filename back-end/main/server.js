const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();
const upload = multer({ dest: 'uploads/' });


