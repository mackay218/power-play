const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const moment = require('moment');
// Route for getting all players from the database
router.get('/all', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "player_stats".*, "position"."position_name", "league"."league_name",
                    "person"."personid", "person"."status_id"
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."personid"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    WHERE "status_id" = 1
                    ORDER BY "created_on" DESC LIMIT 10;`;
        pool.query(query).then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('ERROR getting players:', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

});
// Route for populating CSV file
router.get('/csvList', (req, res) => {
    if (req.isAuthenticated()) {
        const query = `SELECT "player_stats".*, "position"."position_name", "league"."league_name", "person"."status_id"
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."personid"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    WHERE "status_id" = 1
                    ORDER BY "created_on" DESC;`;
        pool.query(query).then((result) => {
            res.send(result.rows)
        }).catch((error) => {
            console.log('ERROR getting players:', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

});
// Route for sorting players
router.get('/sorted', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            console.log(req.query);
            req.query = await areFieldsEmpty(req.query);
            console.log(req.query);
            const client = await pool.connect();
            try {
                queryText = `CREATE TEMP TABLE "sorted_players" AS
                            SELECT "player_stats".*, "position"."position_name", "league"."league_name",
                            "person"."personid", "person"."status_id"
                            FROM "player_stats" 
                            JOIN "person" ON "person_id" = "person"."personid"
                            JOIN "position" ON "position_id" = "position"."positionid"
                            JOIN "league" ON "league_id" = "league"."leagueid"
                            WHERE "status_id" = 1
                            AND "position_id" >= COALESCE($1, 0)
                            AND "position_id" <= COALESCE($1, 10)
                            AND "points" >= COALESCE($2,0)
                            AND "wins" >= COALESCE($3,0)
                            AND "birth_date" >= COALESCE(DATE($4), DATE('1998-01-01')) 
                            AND "birth_date" <= COALESCE(DATE($5), DATE('2018-01-01'));`;
                await client.query(queryText, [req.query.position,
                req.query.minPoints,
                req.query.minWins,
                req.query.minDate,
                req.query.maxDate]);
                queryText = `SELECT * FROM "sorted_players" LIMIT 10 OFFSET $1;`;
                const sortedPlayers = await client.query(queryText, [parseInt(req.query.page)]);
                queryText = `DROP TABLE "sorted_players";`;
                await client.query(queryText);
                await client.query('COMMIT');
                console.log(sortedPlayers.rows);
                res.send(sortedPlayers.rows);
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
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
// Route for getting a specific player from the database
router.get('/playerInfo/:id', (req, res) => {
    if (req.isAuthenticated()) {
        console.log('in playerInfo', req.params.id);
        const query = `SELECT "player_stats".*, "position"."position_name", "league"."league_name", "person"."email", "person"."personid" FROM "player_stats"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    JOIN "person" ON "person_id" = "person"."personid"
                    WHERE "personid" = $1;`;
        pool.query(query, [req.params.id]).then((result) => {
            console.log(result.rows);
            res.send(result.rows[0]);
        }).catch((error) => {
            console.log('ERROR getting players information:', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

})
// Route for searching players by name
router.get('/byName', (req, res) => {
    if (req.isAuthenticated()) {
        req.query.name = `%${req.query.name}%`;
        const query = `SELECT "player_stats".*, "position".*, "league".*, "person"."personid" 
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."personid"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    WHERE "last_name" ILIKE $1 LIMIT 10 OFFSET $2;`;
        pool.query(query, [req.query.name, req.query.page]).then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR searching by name', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

});
// Route for updating a player's information
router.put('/updateProfile/:id', (req, res) => {    
    if (req.isAuthenticated() && req.user.role === "player") {
        console.log(req.body);
        validateInfo(req.body);
        console.log(req.body);
        const profile = req.body;
        console.log('update privacy setting to: ', req.body);
        const profileQuery = `UPDATE player_stats 
                            SET team_name=$1, 
                            school_name=$2,
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
                            league_id=$26,
                            image_path=$27
                            WHERE person_id=$28;`;
        pool.query(profileQuery,[profile.team_name,
                                 profile.school_name,
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
                                 profile.image_path,
                                 profile.person_id])
            .then((result) => {
                console.log('update result: ', result);
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('error updating profile: ', error);
                res.sendStatus(500);
            });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

});
// Route for suspending players
router.put('/suspend/', (req, res) => {
    if (req.isAuthenticated()) {
        const reason = `${req.body.reasons.reason}, ${req.body.reasons.reasonBody}`
        const query = `UPDATE "person" SET "status_id" = 2, "status_reason" = $1  WHERE "personid" = $2;`;
        pool.query(query, [reason, req.body.id]).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('ERROR suspending player:', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

})
// Route for creating a player
router.post('/create', (req, res) => {
        const query = `INSERT INTO "player_stats" 
                    ("person_id", "league_id", "position_id","team_name","school_name","first_name","last_name",
                    "phone_number","birth_date","height","weight","gpa","act_score","school_year","video_link","goals","assists",
                    "points","games_played","wins","losses","ties","save_percent","shutouts","goals_against","guardian","player_info") 
                    VALUES ($1, 1, 1, '', '', '', '', '', NOW(), '', '', 0.0, 1, 12, '', 0, 0, 0, 0, 0, 0, 0, '', 0, 0, false, '');`;
        pool.query(query, [req.body.id]).then((result) => {
            res.sendStatus(201);
        }).catch((error) => {
            console.log('ERROR adding player:', error);
            res.sendStatus(500);
        });
});
// Route for removing players from the database
router.delete('/delete/:id', (req, res) => {
    if (req.isAuthenticated()) {
        (async () => {
            const client = await pool.connect();
            try {
                let queryText = `DELETE FROM "player_stats" WHERE "person_id" = $1 ;`;
                await client.query(queryText, [req.params.id]);
                queryText = `DELETE FROM "person" WHERE "personid" = $1 ;`;
                await client.query(queryText, [req.params.id]);
                await client.query('COMMIT');
            }
            catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
                res.sendStatus(200);
            }
        })().catch((error) => {
            console.log('CATCH', error);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }

});
// Function for checking player fields 
// and setting the fields to null if they are empty
areFieldsEmpty = (query) => {
    // sets position to null if passed in an empty string
    // otherwise changes it to an integer
    if (query.position === '') {
        query.position = null;
    }
    else {
        query.position = parseInt(query.position);
    }
    // sets minPoints to null if passed in an empty string
    // otherwise changes it to an integer
    if (query.minPoints === '') {
        query.minPoints = null;
    }
    else {
        query.minPoints = parseInt(query.minPoints);
    }
    // sets minWins to null if passed in an empty string
    // otherwise changes it to an integer
    if (query.minWins === '') {
        query.minWins = null;
    }
    else {
        query.minWins = parseInt(query.minWins);
    }
    // sets minDate to null if passed in an empty string
    // otherwise changes it to a Date
    if (query.minDate === '') {
        query.minDate = null;
    }
    else {
        query.minDate = moment(query.minDate).format('YYYY-MM-DD');
    }
    // sets maxDate to null if passed in an empty string
    // otherwise changes it to a Date
    if (query.maxDate === '') {
        query.maxDate = null;
    }
    else {
        query.maxDate = moment(query.maxDate).format('YYYY-MM-DD');
    }
    return query;
}
//function for validating that information is of the correct data type
validateInfo = (body) => {

    if ( body.league_id === '') {
        body.league_id = null;
    }
    else {
        body.league_id = parseInt(body.league_id);
    }
    if ( body.school_name === '') {
        body.school_name = null;
    }
    if ( body.position_id === '') {  
        body.position_id = null;
    }
    else {
        body.position_id = parseInt(body.position_id);
    }
    if ( body.birth_date === '') {
        body.birth_date = null;
    }
    else {
        body.birth_date = moment(body.birth_date).format('YYYY-MM-DD');
    }
    if ( body.gpa === '') {
        body.gpa = null;
    }
    else {
        body.gpa = parseFloat(body.gpa);
    }
    if (body.act_score === '') {
        body.act_score = null;
    }
    else {
        body.act_score = parseInt(body.act_score);
    }
    if (body.school_year === '') {
        body.school_year = null;
    }
    else {
        body.school_year = parseInt(body.school_year);
    }
    if (body.goals === '') {
        body.goals = null;
    }
    else {
        body.goals = parseInt(body.goals);
    }
    if ( body.assists === '') {
        body.assists = null;
    }
    else {
        body.assists = parseInt(body.assists);
    }
    if (body.points === '') {
        body.points = null;
    }
    else {
        body.points = parseInt(body.points);
    }
    if (body.games_played === '') {
        body.games_played = null;
    }
    else {
        body.games_played = parseInt(body.games_played);
    }if (body.wins === '') {
        body.wins = null;
    }
    else {
        body.wins = parseInt(body.wins);
    }
    if (body.losses === '') {
        body.losses = null;
    }
    else {
        body.losses = parseInt(body.losses);
    }
    if (body.ties === '') {
        body.ties = null;
    }
    else {
        body.ties = parseInt(body.ties);
    }
    if (body.save_percent === '') {
        body.save_percent = null;
    }
    else {
        body.save_percent = parseInt(body.save_percent);
    }
    if (body.shutouts === '') {
        body.shutouts = null;
    }
    else {
        body.shutouts = parseInt(body.shutouts);
    }
    if (body.goals_against === '') {
        body.goals_against = null;
    }
    else {
        body.goals_against = parseInt(body.goals_against);
    }
    if (body.guardian === '') {
        body.guardian = null;
    }
    else {
        body.guardian = false;
    }
    if (body.team_name === '') {
        body.team_name = null;
    }
}
module.exports = router;