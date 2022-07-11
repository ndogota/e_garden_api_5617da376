const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({key:"From API E-Garden"}));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);