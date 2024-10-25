const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/react', async (req, res) => {
    const { reaction, cookie, link } = req.query;

    const url = 'https://fbpython.click/android_get_react';
    const payload = {
        reaction: reaction,
        cookie: cookie,
        link: link,
        version: '2.1'
    };
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'User-Agent': 'okhttp/3.9.1'
    };

    try {
        const response = await axios.post(url, payload, { headers });
        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).json({
            error: `Request failed with status code: ${error.response ? error.response.status : 500}`
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
