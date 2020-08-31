const express = require('express');
const {
    addPlayers,
    getAllPlayers,
    deleteAllPlayers
} = require('../utils/db.js');
const { getUpdatedPlayerData } = require('../utils/web-scraper.js');

const apiBase = process.env.API_BASE || '/api/v1/';

let router = express.Router();

router.get(apiBase + 'refresh', async (req, res) => {
    await deleteAllPlayers();
    const players = await getUpdatedPlayerData();
    await addPlayers(players);

    res.sendStatus(202);
});

router.get(apiBase + 'players', async (req, res) => {
    res.send(await getAllPlayers());
});

router.patch()

exports.router = router;
