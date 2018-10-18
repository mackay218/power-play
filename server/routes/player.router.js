const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
// GET route for all players
router.get('/all', (req, res) => {
    const query = `SELECT "player_stats".*, "position"."position_name", "league"."league_name",
                    "team"."team_name","school"."school_name", "person"."personid", "person"."status_id"
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."personid"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    JOIN "team" ON "team_id" = "team"."teamid"
                    JOIN "school" ON "school_id" = "school"."schoolid"
                    WHERE "status_id" = 1
                    ORDER BY "created_on" DESC LIMIT 10;`;
    pool.query(query).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })
});
// GET route for populating CSV file
router.get('/csvList', (req, res) => {
    const query = `SELECT "player_stats".*, "position"."position_name", "league"."league_name","team"."team_name","school"."school_name"
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."personid"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    JOIN "team" ON "team_id" = "team"."teamid"
                    JOIN "school" ON "school_id" = "school"."schoolid"
                    ORDER BY "created_on" DESC;`;
    pool.query(query).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR getting players:', error);
        res.sendStatus(500);
    })
});

// GET route for sorting players
router.get('/sorted', (req, res) => {
    (async () => {
        console.log(req.query);
        req.query = await areFieldsEmpty(req.query);
        console.log(req.query);
        const client = await pool.connect();
        try {
            queryText = `CREATE TEMP TABLE "sorted_players" AS
                            SELECT "player_stats".*, "position"."position_name", "league"."league_name",
                            "team"."team_name","school"."school_name", "person"."personid", "person"."status_id" 
                            FROM "player_stats" 
                            JOIN "person" ON "person_id" = "person"."personid"
                            JOIN "position" ON "position_id" = "position"."positionid"
                            JOIN "league" ON "league_id" = "league"."leagueid"
                            JOIN "team" ON "team_id" = "team"."teamid"
                            JOIN "school" ON "school_id" = "school"."schoolid"
                            WHERE "status_id" = 1
                            AND "position_id" >= COALESCE($1, 0)
                            AND "position_id" <= COALESCE($1, 10)
                            AND "points" >= COALESCE($2,0)
                            AND "points" <= COALESCE($3,999999)
                            AND "wins" >= COALESCE($4,0)
                            AND "wins" <= COALESCE($5,999999)
                            AND "birth_date" >= COALESCE(DATE($6), DATE('1998-01-01')) 
                            AND "birth_date" <= COALESCE(DATE($7), DATE('2018-01-01'));`;
            await client.query(queryText, [req.query.position, 
                                           req.query.minPoints, 
                                           req.query.maxPoints, 
                                           req.query.minWins, 
                                           req.query.maxWins, 
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
});
// GET route for specific player info
router.get('/playerInfo/:id', (req, res) => {
    console.log('in playerInfo', req.params.id);
    const query = `SELECT "player_stats".*, "position"."position_name", "league"."league_name", "team"."team_name", "school"."school_name", "person"."email", "person"."personid" FROM "player_stats"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    JOIN "team" ON "team_id" = "team"."teamid"
                    JOIN "school" ON "school_id" = "school"."schoolid"
                    JOIN "person" ON "person_id" = "person"."personid"
                    WHERE "personid" = $1;`;
    pool.query(query, [req.params.id]).then((result) => {
        console.log(result.rows);
        res.send(result.rows[0]);
    }).catch((error) => {
        console.log('ERROR getting players information:', error);
        res.sendStatus(500);
    });
})
// GET route for searchin by name
router.get('/byName', (req, res) => {
    req.query.name = `%${req.query.name}%`;
    const query = `SELECT "player_stats".*, "position".*, "league".*,"team".*,"school".*, "person"."personid" 
                    FROM "player_stats" 
                    JOIN "person" ON "person_id" = "person"."personid"
                    JOIN "position" ON "position_id" = "position"."positionid"
                    JOIN "league" ON "league_id" = "league"."leagueid"
                    JOIN "team" ON "team_id" = "team"."teamid"
                    JOIN "school" ON "school_id" = "school"."schoolid"
                    WHERE "last_name" ILIKE $1 LIMIT 10 OFFSET $2;`;
    pool.query(query, [req.query.name, req.query.page]).then((result) => {
        console.log(result.rows);
        res.send(result.rows);
    }).catch((error) => {
        console.log('ERROR searching by name', error);
        res.sendStatus(500);
    });
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
                            league_id=$26,
                            image_path=$27
                            WHERE person_id=$28;`;
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
        profile.image_path,
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
    const query = `INSERT INTO "player_stats" 
                    ("person_id", "league_id", "team_id", "school_id", "position_id") 
                    VALUES ($1, 1, 1, 1, 1);`;
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
}); 
//function for determining if player position is an empty string
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
    // sets maxPoints to null if passed in an empty string
    // otherwise changes it to an integer
    if (query.maxPoints === '') {
        query.maxPoints = null;
    }
    else {
        query.maxPoints = parseInt(query.maxPoints);
    }
    // sets minWins to null if passed in an empty string
    // otherwise changes it to an integer
    if (query.minWins === '') {
        query.minWins = null;
    }
    else {
        query.minWins = parseInt(query.minWins);
    }
    // sets maxWins to null if passed in an empty string
    // otherwise changes it to an integer
    if (query.maxWins === '') {
        query.maxWins = null;
    }
    else {
        query.maxWins = parseInt(query.maxWins);
    }
    // sets minDate to null if passed in an empty string
    // otherwise changes it to a Date
    if (query.minDate === '') {
        query.minDate = null;
    }
    // sets maxDate to null if passed in an empty string
    // otherwise changes it to a Date
    if (query.maxDate === '') {
        query.maxDate = null;
    }
    return query;
}
module.exports = router;