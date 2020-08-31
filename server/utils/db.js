const pgp = require('pg-promise')();

const connString = `postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}` +
                `@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`;
const db = pgp(connString);

exports.addPlayers = async (players) => {
    try {
        const query = "INSERT INTO Player(id,name,overallRank,positionRank,byeWeek," +
                    "averageDraftPosition,canDraft) VALUES($1,$2,$3,$4,$5,$6,$7)";

        db.tx(t => {
            const queries = players.map(p => {
                return t.none(query, Object.values(p));
            });

            t.batch(queries);
        });

        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

exports.getAllPlayers = async () => {
    try {
        const query = 'SELECT * FROM Player ORDER BY id ASC';
        return await db.any(query);
    }
    catch(err) {
        console.log(err);
    }
}

exports.updatePlayerDraftStatus = async (id, canDraft) => {
    try {
        const query = `UPDATE Player SET canDraft=${canDraft} WHERE id=${id}`;

        await db.none(query);
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}

exports.deleteAllPlayers = async () => {
    try {
        const query ="DELETE FROM Player"

        await db.none(query);
        return true;
    }
    catch(err) {
        console.log(err);
        return false;
    }
}
