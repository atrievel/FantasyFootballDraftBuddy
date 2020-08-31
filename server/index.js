const express = require('express');
const cors = require('cors');
const { router }  = require('./routes/players');

const port = process.env.PORT || 5000;
const app = express();
app.use(router);
app.use(cors());

app.listen(port, () => console.log(`Listening on port: ${port}`));
