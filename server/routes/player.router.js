const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    skaters = null;
    goalies = null;
    players = {};
    const query = `SELECT * FROM "player_stats" 
                    JOIN "position" ON "position_id" = "position"."id"
                    JOIN "league" ON "league_id" = "league"."id"
                    JOIN "team" ON "team_id" = "team"."id"
                    JOIN "school" ON "school_id" = "school"."id"
                    ORDER BY "created_on" DESC LIMIT 10;`;
    pool.query(query).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })

});

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;