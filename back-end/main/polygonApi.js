const express = require('express');
const multer = require('multer');
const { polygonRequest } = require('./functions');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Маршрут для загрузки файла задачи и проверки решения
router.post('/submit', upload.single('solutionFile'), async (req, res) => {
  const file = req.file;
  const problemId = req.body.problemId; // ID задачи, которую нужно проверить

  try {
    // Загрузка файла задачи
    const uploadFileResponse = await polygonRequest('problem.saveFile', { problemId }, [{ name: 'file', path: file.path }]);
    console.log('Upload Response:', uploadFileResponse);

    // Здесь будет запрос для проверки решения (предположим, что такой метод существует)
    const checkResponse = await polygonRequest('problem.check', { problemId });
    res.send(checkResponse);

  } catch (error) {
    console.error(error);
    res.status(500).send('Ошибка при загрузке файла или проверке решения');
  }
});

router.get('/get', async (req, res) => {
  console.log('Hello, World!');
  res.send('Hello, World!');
});

module.exports = router;
