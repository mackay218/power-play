const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/all', (req, res) => {
    const query = `SELECT "person"."id", "email", "coach_name", "status_type" FROM "person" JOIN "account_status" ON "status_id" = "account_status"."id" WHERE "role" = 'coach';`;
    pool.query(query).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })

});

router.delete('/delete/:id', (req, res) => {
    const query = `DELETE FROM "person" WHERE "id" = $1;`;
    pool.query(query, [req.params.id]).then(() => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log('ERROR deleting the coach', error);
        res.sendStatus(500);
    });
})

/**
 * POST route template
 */
router.post('/', (req, res) => {

});

module.exports = router;