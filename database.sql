
CREATE TABLE "account_status" (
    "id" SERIAL PRIMARY KEY,
    "status_type" VARCHAR(100)
);

CREATE TABLE "person" (
    "personid" SERIAL PRIMARY KEY,
    "email" VARCHAR(200),
    "password" VARCHAR(1080),
    "role" VARCHAR(15) DEFAULT 'player',
    "coach_name" VARCHAR(200),
    "invite" VARCHAR(2000),
    "status_id" INTEGER REFERENCES "account_status"(id),
    "status_reason" VARCHAR(1000)
);

CREATE TABLE "activity_log" (
    "id" SERIAL PRIMARY KEY,
    "person_id" INTEGER REFERENCES "person"(personid),
    "time" TIMESTAMP DEFAULT NOW(),
    "activity_type" VARCHAR(200)

);

CREATE TABLE "league" (
    "leagueid" SERIAL PRIMARY KEY,
    "league_name" VARCHAR(200)
);

CREATE TABLE "team" (
    "teamid" SERIAL PRIMARY KEY,
    "team_name" VARCHAR(200)
);

CREATE TABLE "school" (
    "schoolid" SERIAL PRIMARY KEY,
    "school_name" VARCHAR(200)
);

CREATE TABLE "position" (
    "positionid" SERIAL PRIMARY KEY,
    "position_name" VARCHAR(200)
);

CREATE TABLE "player_stats" (
    "id" SERIAL PRIMARY KEY,
    "person_id" INTEGER REFERENCES "person"(personid),
    "league_id" INTEGER REFERENCES "league"(leagueid),
    "team_id" INTEGER REFERENCES "team"(teamid),
    "school_id" INTEGER REFERENCES "school"(schoolid),
    "position_id" INTEGER REFERENCES "position"(positionid),
    "first_name" VARCHAR(100),
    "last_name" VARCHAR(100),
    "phone_number" VARCHAR(150),
    "birth_date" DATE,
    "height" VARCHAR(150),
    "weight" VARCHAR(150),
    "gpa" FLOAT,
    "act_score" INTEGER,
    "school_year" INTEGER,
    "image_path" VARCHAR(1080),
    "video_link" VARCHAR(1080),
    "goals" INTEGER DEFAULT 0,
    "assists" INTEGER DEFAULT 0,
    "points" INTEGER DEFAULT 0,
    "games_played" INTEGER DEFAULT 0,
    "wins" INTEGER DEFAULT 0,
    "losses" INTEGER DEFAULT 0,
    "ties" INTEGER DEFAULT 0,
    "save_percent" VARCHAR(10),
    "shutouts" INTEGER DEFAULT 0,
    "goals_against"INTEGER DEFAULT 0,
    "guardian" BOOLEAN DEFAULT false,
    "created_on" DATE DEFAULT NOW(),
    "player_info" VARCHAR(200)
);

INSERT INTO "position" ("position_name") VALUES (null), ('Forward'),('Defense'),('Goalie');

INSERT INTO "school" ("school_name") VALUES (null);

INSERT INTO "team" ("team_name") VALUES (null);

INSERT INTO "league" ("league_name") VALUES (null),('1A'),('2A'),('3A'),('4A'),('5A'),('6A'),('7A'),('8A'),('1AA'),('2AA'),('3AA'),('4AA'),('5AA'),('6AA'),('7AA'),('8AA');

INSERT INTO "account_status" ("status_type") VALUES ('active'),('suspended'),('banned'),('pending');


