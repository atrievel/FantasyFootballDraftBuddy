const axios = require('axios');
const cheerio = require('cheerio');

exports.getUpdatedPlayerData = async () => {
    try {
        let data = [];

        const html = await axios({
            url: 'https://www.fantasypros.com/nfl/rankings/half-point-ppr-cheatsheets.php',
            method: 'get',
            timeout: 5000,
        });

        const $ = cheerio.load(html.data);

        $('#rank-data tbody tr.player-row ').each(async (i, elem) => {
            let currentPlayer = {
                id: i,
                name: $(elem).find('td.hide-print.wsis-cell input.wsis').data('name'),
                overallRank: $(elem).find('td:nth-child(1)').text(),
                positionRank: $(elem).find('td:nth-child(4)').text(),
                byeWeek: $(elem).find('td:nth-child(5)').text() || 0,
                averageDraftPosition: $(elem).find('td:nth-child(8)').text(),
                canDraft: true
            };

            data.push(currentPlayer);
        });

        return data;
    }
    catch (err) {
        console.error(err);
        return new Array();
    }
}
