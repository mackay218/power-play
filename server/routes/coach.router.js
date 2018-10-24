const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();


const nodemailer = require("nodemailer");

const moment = require('moment');

const Chance = require('chance');
const chance = new Chance();

// Route to get all coaches form the database
router.get('/all', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        const query = `SELECT "person"."personid", "email", "coach_name", "status_type" FROM "person" JOIN "account_status" ON "status_id" = "account_status"."id" WHERE "role" = 'coach' ORDER BY "personid" LIMIT 10;`;
        pool.query(query).then((result) => {
            console.log(result.rows);
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR getting players:', error);
            res.sendStatus(500);
        })
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
// Route to page through coaches on the coaches list page
router.get('/paged', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        const query = `SELECT "person"."personid", "email", "coach_name", "status_type" FROM "person" JOIN "account_status" ON "status_id" = "account_status"."id" WHERE "role" = 'coach' LIMIT 10 OFFSET $1;`;
        pool.query(query, [parseInt(req.query.page)]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log('ERROR getting coaches:', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
// Route to search coaches by name
router.get('/search', (req, res) => {
    req.query.name = `%${req.query.name}%`
    const query = `SELECT "person"."coach_name", "person"."email", "person"."personid", "account_status"."status_type" FROM "person"
                   JOIN "account_status" ON "account_status"."id" = "status_id" WHERE "coach_name" ILIKE $1 LIMIT 10;`;
    pool.query(query, [req.query.name]).then((result) => {
        res.send(result.rows)
    }).catch((error) => {
        console.log('ERROR searching coaches:', error);
        res.sendStatus(500);
    })
})
// Route to remove coaches from the database
router.delete('/delete/:id', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        const query = `DELETE FROM "person" WHERE "personid" = $1;`;
        pool.query(query, [req.params.id]).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('ERROR deleting the coach', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
// Router to suspend a coach
router.put('/suspend/:id', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        const query = `UPDATE "person" SET "status_id" = 2 WHERE "personid" = $1;`;
        pool.query(query, [req.params.id]).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('ERROR suspending coach:', error);
            res.sendStatus(500);
        });
    }
    else {

    }
});
// Router to ban a coach
router.put('/ban/:id', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        const query = `UPDATE "person" SET "status_id" = 3 WHERE "personid" = $1;`;
        pool.query(query, [req.params.id]).then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log('ERROR banning coach:', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
//function to check if coach's email already in database
router.post('/checkCoach', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        console.log('in checkCoach post')
        console.log(req.body);

        const coachInfo = req.body;

        const emailAddress = coachInfo.email;

        const queryText = `SELECT * FROM person WHERE "email" = $1;`;

        const values = [emailAddress];

        //status codes reversed on purpose to send an ok if email isn't in database
        //this will allow the next function to run to send the invite email
        pool.query(queryText, values)
            .then((results) => {
                console.log('results', results.rows);
                if (results.rows.length === 0) {
                    res.sendStatus(201);
                }
                else {
                    res.sendStatus(200);
                }
            })
            .catch((error) => {
                console.log('error finding email:', error);
                res.sendStatus(500);
            });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
//function to add new coach to database
//only called by Admin
router.post('/coachInvite', (req, res) => {
    if (req.isAuthenticated() && req.user.role === "admin") {
        console.log('in coachInvite post');
        console.log(req.body);

        const coachInfo = req.body;

        const coachName = coachInfo.name; // this may change depending on client side route

        const emailAddress = coachInfo.email; //this may change depending on client side route

        //limit inivite code to alphanumeric to avoid url problems
        let inviteCode = chance.string({ pool: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789' });

        //create expiration date code for invite
        let expireDate = new Date();

        expireDate = moment(expireDate).format('L');

        expireDate = expireDate.replace(/\//g, '');

        inviteCode = inviteCode + expireDate;

        const infoForEmail = {
            name: coachName,
            email: emailAddress,
            inviteCode: inviteCode
        };

        const role = 'coach';

        const statusType = 4;
        const statusReason = 'awaiting response from invite';

        console.log(infoForEmail);

        //ACTIVITY LOG for analytics
        // const activityType = 'invite sent';
        // const activityTime = new Date();

        (async () => {

            const client = await pool.connect();

            try {
                let queryText = `INSERT INTO person(email, role, coach_name, invite, status_id, status_reason)
                            VALUES ($1, $2, $3, $4, $5, $6) RETURNING "personid";`;

                let values = [emailAddress, role, coachName, inviteCode, statusType, statusReason];

                const personResult = await client.query(queryText, values);

                let personId = personResult.rows[0].personid;

                //ACTIVITY LOG will need to be changed to include person id as foreign key
                // queryText = `INSERT INTO activity_log(time, activity_type)
                //                 VALUES ($1, $2) RETURNING "id";`;

                // values = [activityTime, activityType];

                // const activityLogResult = await client.query(queryText, values);

                // let activityLogId = activityLogResult.rows[0].id;

                await sendInviteCode(infoForEmail);

                await client.query('COMMIT');

                res.sendStatus(201);
            }
            catch (error) {
                console.log('ROLLBACK', error);
                await client.query('ROLLBACK');
                throw error;
            } finally {
                //if creating a coach works call function to send invite

                client.release();
            }

        })().catch((error) => {
            console.log('CATCH', error);
            res.sendStatus(500);
        });
    }
    else {
        console.log('You must be logged in!');
        res.sendStatus(403);
    }
});
//function to send invite email
sendInviteCode = (infoForEmail) => {

    console.log('in sendInviteCode');

    console.log(infoForEmail);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: process.env.my_gmail_email,
            clientId: process.env.my_oauth_client_id,
            clientSecret: process.env.my_oauth_client_secret,
            refreshToken: process.env.my_oauth_refresh_token,
            accessToken: process.env.my_oauth_access_token,
        }
    });

    const inviteCode = infoForEmail.inviteCode;

    const name = infoForEmail.name;

    //create url string for page for link to 
    //where person can set or reset password
    const websiteUrl = process.env.set_password_page;

    const inviteUrlAnchor = `<a target="_blank" href="${websiteUrl}${inviteCode}">Confirm Registration</a>`;

    const homePageAnchor = process.env.set_home_page;

    const emailHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                    <title>PPR Hockey Invite</title>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0 " />
                    <link href="https://fonts.googleapis.com/css?family=Audiowide|Roboto:300,300i,400,400i,500,500i,700,700i" rel="stylesheet">
                    <style>
                        *{
                            box-sizing: border-box;
                        }
                        body{
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                         header{
                            display: flex;
                            flex-direction: row;
                            align-items: center;
                            justify-content: center;
                            background-color: #F0133E;
                            color: #fff;
                            width: 100vw;
                            padding: 20px;
                            font-family: 'Audiowide', sans-serif;
                        }
        
                        h1{
                            height: 100%;
                            padding-top: 40px;
                        }

                        a img{
                            width: 200px;
                            height: 200px;
                        }

                        main{
                            font-family: 'Roboto', sans-serif;
                            font-size: 20px;
                        }
                    </style>
                </head>
                <body>
                    <header>
                        <a href="${homePageAnchor}">
                            <img src="https://drive.google.com/uc?export=view&id=1w_MFiI3Y8M3hDV2nKx_2XyDr8olDI18y" alt="ppr hockey logo"/>
                        </a>
                        <h1>YOU'VE BEEN INVITED!</h1>
                    </header>
                    <main>
                        <div>
                            <p>Hi! ${name},
                                 You've been invited to try Power Play Recruiting! 
                                 Click the link below to join.
                            </p>
                            ${inviteUrlAnchor}
                        </div>
                    </main>
                </body>
            </html>`;


    const mail = {
        from: "polarishockey@gmail.com",
        to: infoForEmail.email,
        subject: "Power Play Recruiting registration",
        text: 'We invite you so join us' + infoForEmail.name,
        html: emailHtml
    }

    transporter.sendMail(mail, function (error, info) {
        if (error) {
            console.log('error sending mail:', error);
        }
        else {
            //see https://nodemailer.com/usage
            console.log("info.messageId: " + info.messageId);
            console.log("info.envelope: " + info.envelope);
            console.log("info.accepted: " + info.accepted);
            console.log("info.rejected: " + info.rejected);
            console.log("info.pending: " + info.pending);
            console.log("info.response: " + info.response);
        }
        transporter.close();
    })
}

module.exports = router;