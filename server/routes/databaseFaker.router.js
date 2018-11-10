const express = require('express');

const router = express.Router();

const faker = require('faker');
const moment = require('moment');

const pool = require('../modules/pool');

//generate fake players
router.post('/', (req, res) => {
    console.log('trying to generate mock player data');

    for (let i = 0; i < 10; i++) {

        //account status_type
        const statusType = Math.round(Math.random() * (4 - 1) + 1);

        let statusReason = null;

        if(statusType === 1){
            statusReason = 'account activated';
        }
        else if (statusType === 2) {
            statusReason = 'committed to team/school';
        }
        else if (statusType === 3) {
            statusReason = 'fake account'
        }
        else if (statusType === 4) {
            statusReason = 'awaiting payment';
        }

        //activity log
        // const activityTime = new Date();
        // const activityType = 'logged in';

        let createdOn = new Date();
        createdOn = moment(createdOn).format('L');

        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const emailAddress = faker.internet.email();
        const fakePassword = faker.lorem.word();
        const role = 'player';

        const phoneNumber = faker.phone.phoneNumber();

        const profilePic = faker.image.avatar();
        let birthDate = faker.date.between('1998-12-31', '2002-12-31');
        birthDate = moment(birthDate).format('L');
        const playerInfo = faker.lorem.sentence();

        //math.random() functions for gpa, act score, sat score, height, weight, goals, assists,
        // points, wins, losses, save%, shutouts
        const gradeYear = Math.round(Math.random() * (12 - 10) + 10);

        let gpaScore = Math.random() * (5.00 - 1.00) + 1.00;
        gpaScore = gpaScore.toFixed(2);
        const actScore = Math.round(Math.random() * (36 - 0) + 0);

        const height = Math.round(Math.random() * (6 - 5) + 5) + "' " + Math.round(Math.random() * (11)) + '"';
        const weight = Math.round(Math.random() * (300 - 100) + 100);

        const positionId = Math.round(Math.random() * (4 - 2) + 2);
        const leagueId = Math.round(Math.random() * (17 - 2) + 2);

        const teamName = faker.company.companyName();
        const school = faker.address.city() + ' High School';

        const videoLink = 'https://www.youtube.com/watch?v=a8rRW5Ugg0I';

        let goals = 0;
        let assists = 0;
        let points = 0;

        let wins = 0;
        let losses = 0;
        let ties = 0;
        let gamesPlayed = 0;
        let savePercent = 0;
        let shutOuts = 0;
        let goalsAgainst = 0;

        const guardian = false;

        //if forward or defense
        if (positionId === 3 || positionId === 2) {
            goals = Math.round(Math.random() * (100 - 1) + 1);
            assists = Math.round(Math.random() * (100 - 1) + 1);
            points = Math.round(Math.random() * (150 - 1) + 1);
        }
        //if goalie
        else if (positionId === 4) {
            wins = Math.round(Math.random() * (10 - 1) + 1);
            losses = Math.round(Math.random() * (20 - 1) + 1);
            ties = Math.round(Math.random() * (20 - 1) + 1);
            savePercent = Math.random() * (90.00 - 1.00) + 1.00;
            savePercent = savePercent.toFixed(2);
            gamesPlayed = wins + losses + ties;
            goalsAgainst = Math.round(Math.random() * (30 - 1) + 1);
            shutOuts = Math.round(Math.random() * (10 - 1) + 1);
        }

        (async () => {
            const client = await pool.connect();

            try {
                queryText = `INSERT INTO person(email, password, role, status_id, status_reason)
                            VALUES ($1, $2, $3, $4, $5) RETURNING "personid";`;
                values = [emailAddress, fakePassword, role, statusType, statusReason];

                const personResult = await client.query(queryText, values);

                let personId = personResult.rows[0].personid;

                 //ACTIVITY LOG DATA THIS NEEDS TO CHANGE TO NEW TABLE STRUCTURE WITH PERSON ID FOREIGN KEY
                // queryText = `INSERT INTO activity_log(time, activity_type)
                //             VALUES ($1, $2) RETURNING "id";`;
                // values = [activityTime, activityType];

                // const activityLogResult = await client.query(queryText, values);

                // let activityLogId = activityLogResult.rows[0].id;

                queryText = `INSERT INTO player_stats(person_id, league_id, team_name, school_name, position_id, 
                            first_name, last_name, phone_number, birth_date, height, weight, gpa, act_score, 
                            school_year, image_path, video_link, goals, assists, points, games_played, wins, 
                            losses, ties, save_percent, shutouts, goals_against, guardian, created_on, player_info)
                            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18,
                                    $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29);`;
                values = [personId, leagueId, teamName, school, positionId, firstName, lastName,
                    phoneNumber, birthDate, height, weight, gpaScore, actScore, gradeYear, profilePic,
                    videoLink, goals, assists, points, gamesPlayed, wins, losses, ties, savePercent,
                    shutOuts, goalsAgainst, guardian, createdOn, playerInfo];

                const result = await client.query(queryText, values);

                await client.query('COMMIT');
                
            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });
    }
    res.sendStatus(201);
});

//generate fake coaches
router.post('/coaches', (req, res) => {

    for (let i = 0; i < 5; i++) {
        
        //account status_type
        //CHANGED FOR PRESENTATION SO ONLY ACTIVE COACHES
        //const statusType = Math.round(Math.random() * (4 - 1) + 1);
        const statusType = 1;

        let statusReason = null;
 
        if(statusType === 1){
            statusReason = 'account activated';
        }
        else if (statusType === 2) {
            statusReason = 'payment due';
        }
        else if (statusType === 3){
            statusReason = 'fake account';
        }
        else if(statusType === 4){
            statusReason = 'awaiting invite response';
        }

        //console.log(statusType, statusReason);


        const firstName = faker.name.firstName();

        const emailAddress = faker.internet.email();
        const fakePassword = faker.lorem.word();
        const role = 'coach';

        const inviteCode = faker.finance.bitcoinAddress();

        (async () => {
            const client = await pool.connect();

            try{ 
                let queryText = `INSERT INTO person(email, password, role, coach_name, invite, status_id, status_reason)
                            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING "personid";`;
                values = [emailAddress, fakePassword, role, firstName, inviteCode, statusType, statusReason];

                const personResult = await client.query(queryText, values);

                let personId = personResult.rows[0].personid;

                //ACTIVITY LOG DATA THIS NEEDS TO CHANGE TO NEW TABLE STRUCTURE WITH PERSON ID FOREIGN KEY
                // queryText = `INSERT INTO activity_log(time, activity_type)
                //             VALUES ($1, $2) RETURNING "id";`;
                // values = [activityTime, activityType];

                // const activityLogResult = await client.query(queryText, values);

                // let activityLogId = activityLogResult.rows[0].id;

            } catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                client.release();
            }
        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });

    }
    res.sendStatus(201);
});

module.exports = router;