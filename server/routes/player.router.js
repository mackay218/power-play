const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    const query = `SELECT * FROM "player_stats" 
                    JOIN "position" ON "position_id" = "position"."id"
                    JOIN "league" ON "league_id" = "league"."id"
                    JOIN "team" ON "team_id" = "team"."id"
                    JOIN "school" ON "school_id" = "school"."id"
                    ORDER BY "created_on" DESC;`;
    pool.query(query).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
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