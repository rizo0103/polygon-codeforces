const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');
const crypto = require('crypto');

const POLYGON_API_KEY = 'd5a4a7344a4107592931c6a08efb03f41ebf2438';
const POLYGON_API_SECRET = '2fb143bf751d97f0572bc567d3ac4dc9da320d77';

// Генерация подписи для запроса
const generateSignature = (apiMethod, params) => {
    // Формируем строку запроса
    const query = `apiKey=${POLYGON_API_KEY}&time=${params.time}&problemId=${params.problemId}`;
    const hash = crypto.createHash('sha512');
    hash.update(`/api/${apiMethod}?${query}#${POLYGON_API_SECRET}`);
    return hash.digest('hex');
};

// Универсальная функция для выполнения запросов к API Polygon
const polygonRequest = async (apiMethod, params = {}, files = []) => {
    params.apiKey = POLYGON_API_KEY;
    params.time = Math.floor(Date.now() / 1000); // Получаем текущее время в секундах

    const signature = generateSignature(apiMethod, params);
    params.apiSig = `000000${signature}`; // Добавляем шесть нулей перед подписью

    const url = `https://polygon.codeforces.com/api/${apiMethod}`;

    console.log('Request URL:', url);
    console.log('Request Params:', params);
    console.log('Request Files:', files);

    try {
        if (files.length > 0) {
            const formData = new FormData();
            files.forEach(file => {
                formData.append(file.name, fs.createReadStream(file.path));
            });

            Object.keys(params).forEach(key => {
                formData.append(key, params[key]);
            });

            const response = await axios.post(url, formData, {
                headers: formData.getHeaders(),
            });
            return response.data;
        } else {
            const response = await axios.post(url, params);
            return response.data;
        }
    } catch (error) {
        console.error(`Error in API method ${apiMethod}:`, error.response ? error.response.data : error.message);
        throw error;
    }
};

module.exports = {
    generateSignature,
    polygonRequest,
};
