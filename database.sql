/* before running mock data generator 
hard code in position table:
id     position_name
1       fwd
2       def
3       gol

hard code in leage table: 
id    league_name
1     1A
2     2A
3     3A
4     4A
5     5A
6     6A
7     7A
8     8A
9     1AA
10    2AA
11    3AA
12    4AA
13    5AA
14    6AA
15    7AAs
16    8AA

hard code in account_status table
id   status_type
1    active
2    suspended
3    banned
4    pending


*/


CREATE TABLE "account_status" (
	"id" SERIAL PRIMARY KEY,
	"status_type" VARCHAR(100)
);

CREATE TABLE "person" (
	"id" SERIAL PRIMARY KEY,
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
	"person_id" INTEGER REFERENCES "person"(id),
	"time" TIMESTAMP DEFAULT NOW(),
	"activity_type" VARCHAR(200)
);

CREATE TABLE "league" (
	"id" SERIAL PRIMARY KEY,
	"league_name" VARCHAR(200)
);

CREATE TABLE "team" (
	"id" SERIAL PRIMARY KEY,
	"team_name" VARCHAR(200)
);

CREATE TABLE "school" (
	"id" SERIAL PRIMARY KEY,
	"school_name" VARCHAR(200)
);

CREATE TABLE "position" (
	"id" SERIAL PRIMARY KEY,
	"position_name" VARCHAR(200)
);

CREATE TABLE "player_stats" (
	"id" SERIAL PRIMARY KEY,
	"person_id" INTEGER REFERENCES "person"(id),
	"league_id" INTEGER REFERENCES "league"(id),
	"team_id" INTEGER REFERENCES "team"(id),
	"school_id" INTEGER REFERENCES "school"(id),
	"position_id" INTEGER REFERENCES "position"(id),
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
	"goals" INTEGER,
	"assists" INTEGER,
	"points" INTEGER,
	"games_played" INTEGER,
	"wins" INTEGER,
	"losses" INTEGER,
	"ties" INTEGER,
	"save_percent" VARCHAR(10),
	"shutouts" INTEGER,
	"goals_against"INTEGER,
	"guardian" BOOLEAN,
	"created_on" DATE DEFAULT NOW(),
	"player_info" VARCHAR(200)
);



