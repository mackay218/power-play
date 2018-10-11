const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// GET route for all players
router.get('/all', (req, res) => {

    const query = `SELECT "player_stats".*, "position".*, "league".*,"team".*,"school".*, "person"."id" 
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."id"
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
// GET route for specific player
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
        console.log('by id results', id, result.rows[0]);
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })

});
// PUT route for updating players
router.put('/updateProfile/:id', (req, res) => {
    const userId = req.user.id;
    const profile = req.body;
    console.log('update privacy setting to: ', req.body);
    const profileQuery = `UPDATE player_stats 
                            SET team_id=$1, 
                            school_id=$2,
                            position_id=$3,
                            first_name=$4,
                            last_name=$5,
                            phone_number=$6,
                            birth_date=$7,
                            height=$8,
                            weight=$9,
                            gpa=$10,
                            act_score=$11,
                            school_year=$12,
                            video_link=$13,
                            goals=$14,
                            assists=$15,
                            points=$16,
                            games_played=$17,
                            wins=$18,
                            losses=$19,
                            ties=$20,
                            save_percent=$21,
                            shutouts=$22,
                            goals_against=$23,
                            guardian=$24,
                            player_info=$25,
                            league_id=$26
                            WHERE person_id=$27;`;
    pool.query(profileQuery, 
        [profile.team_id,
        profile.school,
        profile.position_id,
        profile.first_name,
        profile.last_name,
        profile.phone_number,
        profile.birth_date,
        profile.height,
        profile.weight,
        profile.gpa,
        profile.act_score,
        profile.school_year,
        profile.video_link,
        profile.goals,
        profile.assists,
        profile.points,
        profile.games_played,
        profile.wins,
        profile.losses,
        profile.ties,
        profile.save_percent,
        profile.shutouts,
        profile.goals_against,
        profile.guardian,
        profile.player_info,
        profile.league_id,
         userId])
        .then((result) => {
            console.log('update result: ', result);
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('error updating profile: ', error);
            res.sendStatus(500);
        })
});
// POST route for creating a player
router.post('/create', (req, res) => {
    const query = `INSERT INTO "player_stats" ("person_id") VALUES ($1);`;
    pool.query(query, [req.body.id]).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('ERROR adding player:', error);
        res.sendStatus(500);
    })
});
// DELETE route for removing players
router.delete('/delete/:id', (req, res) => {
    (async () => {
        const client = await pool.connect();
        try {
            let queryText = `DELETE FROM "player_stats" WHERE "person_id" = $1 ;`;
            await client.query(queryText, [req.params.id]);
            queryText = `DELETE FROM "person" WHERE "id" = $1 ;`;
            await client.query(queryText, [req.params.id]);
            await client.query('COMMIT');
        }
        catch (error) {
            console.log('ROLLBACK', error);
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    })().catch((error) => {
        console.log('CATCH', error);
    });
});
module.exports = router;