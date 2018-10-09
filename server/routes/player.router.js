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
                    ORDER BY "created_on" DESC LIMIT 10;`;
    pool.query(query).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })

});

router.get('/profileById', (req, res) => {
    
    id = req.user.id;
    const query = `SELECT "player_stats".*, "person"."id" FROM "player_stats"
                    JOIN "position" ON "position_id" = "position"."id"
                    JOIN "league" ON "league_id" = "league"."id"
                    JOIN "team" ON "team_id" = "team"."id"
                    JOIN "school" ON "school_id" = "school"."id"
                    JOIN "person" ON "person_id" = "person"."id"
                    WHERE "person"."id" = $1;`;
    pool.query(query, [id]).then((result) => {
        res.send(result.rows[0])
        console.log('by id results',id, result.rows[0]);
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })

});


/**
 * POST route template
 */
router.post('/create', (req, res) => {
    const query = `INSERT INTO "player_stats" ("person_id") VALUES ($1);`;
    pool.query(query, [req.body.id]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('ERROR adding player:', error);
        res.sendStatus(500);
    })
});

module.exports = router;