DROP TABLE IF EXISTS users CASCADE; 
DROP TABLE IF EXISTS courses CASCADE; 
DROP TABLE IF EXISTS instructs CASCADE; 
DROP TABLE IF EXISTS enrolled CASCADE; 
DROP TABLE IF EXISTS scenario CASCADE;
DROP TABLE IF EXISTS issues CASCADE;
DROP TABLE IF EXISTS importance CASCADE;
DROP TABLE IF EXISTS score CASCADE;
DROP TABLE IF EXISTS partof CASCADE; -- contains
DROP TABLE IF EXISTS pages CASCADE;
DROP TABLE IF EXISTS prompt CASCADE;
DROP TABLE IF EXISTS conversation_task CASCADE;
DROP TABLE IF EXISTS mcq CASCADE;
DROP TABLE IF EXISTS plain_page CASCADE;
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS response CASCADE;
DROP TABLE IF EXISTS prompt_response CASCADE;
DROP TABLE IF EXISTS conversation_choices CASCADE;
DROP TABLE IF EXISTS mcq_response CASCADE;
DROP TABLE IF EXISTS stakeholders CASCADE;
DROP TABLE IF EXISTS conversation CASCADE;
DROP TABLE IF EXISTS question CASCADE;
DROP TABLE IF EXISTS mcq_option CASCADE; -- option


CREATE TABLE "users" (
	"id" SERIAL,
	PRIMARY KEY (id),
	"full_name" VARCHAR NOT NULL,
	"email" CHAR(254) NOT NULL,
	"demographics" VARCHAR
);  

CREATE TABLE "courses" (
	"id" SERIAL PRIMARY KEY,
	"webpage" VARCHAR,
	"name" VARCHAR,
	"semester" CHAR(10) NOT NULL
);

CREATE TABLE "instructs" (
	"instructor_id" INT REFERENCES users,
	"webpage" VARCHAR,
	"course_id" INT REFERENCES courses,
	PRIMARY KEY("course_id", "instructor_id")
);

CREATE TABLE "enrolled" (
	"student_id" INT REFERENCES users,
	"course_id" INT REFERENCES courses,
	PRIMARY KEY("student_id", "course_id")
);

CREATE TABLE "scenario" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"due_date" TIMESTAMP,
	"description" VARCHAR,
	"additional_data" VARCHAR
); 

CREATE TABLE "partof" (
	"course_id" INT REFERENCES courses,
	"scenario_id" INT REFERENCES scenario
);

CREATE TABLE "pages" (
	"id" SERIAL PRIMARY KEY,
	"order" INT,
	"type" CHAR(5),
	"scenario_id" INT REFERENCES scenario
);

CREATE TABLE "prompt" (
	"page_id" INT REFERENCES pages,
	"prompt" VARCHAR,
	"prompt_num" SERIAL,
	PRIMARY KEY(page_id, prompt_num)
);

CREATE TABLE "conversation_task" (
	"page_id" INT REFERENCES pages PRIMARY KEY,
	"content" VARCHAR
);

CREATE TABLE "stakeholders" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"description" VARCHAR,
	"conversation" VARCHAR,
	"scenario_id" INT REFERENCES scenario,
	"conversation_task_id" INT REFERENCES conversation_task
);

CREATE TABLE "conversation" (
	"id" SERIAL PRIMARY KEY,
	"stakeholder_id" INT REFERENCES stakeholders,
	"conversation_text" VARCHAR

);

CREATE TABLE "issues" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR,
	"description" VARCHAR
);

	
CREATE TABLE "score" (
	"stakeholder_id" INT REFERENCES stakeholders,
	"issue_id" INT REFERENCES issues,
	PRIMARY KEY (stakeholder_id, issue_id),
	"value" INT
);

CREATE TABLE "mcq" (
	"page_id" INT REFERENCES pages PRIMARY KEY,
	"content" VARCHAR
);

CREATE TABLE "plain_page" (
	"page_id" INT REFERENCES pages PRIMARY KEY,
	"content" VARCHAR
);



CREATE TABLE "question" (
	"id" SERIAL PRIMARY KEY,
	"question" VARCHAR,
	"mcq_id" INT REFERENCES mcq
);

CREATE TABLE "mcq_option" (
	"id" SERIAL PRIMARY KEY,
	"option" VARCHAR NOT NULL,
	"question_id" INT REFERENCES question
);

CREATE TABLE "submissions" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES users,
	"scenario_id" INT REFERENCES scenario,
	"submission_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	UNIQUE(user_id, scenario_id)
);

CREATE TABLE "response" (
	"id" SERIAL PRIMARY KEY,
	"submission_id" INT REFERENCES submissions,
	"page_num" INT,
	"time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "prompt_response" (
	"id" INT REFERENCES response,
	"prompt_num" INT,
	"response" VARCHAR,
	PRIMARY KEY (id, prompt_num)
);

CREATE TABLE "conversation_choices" (
	"id" INT REFERENCES response,
	"stakeholder_id" INT REFERENCES stakeholders,
	PRIMARY KEY (id, stakeholder_id)
);

CREATE TABLE "mcq_response" (
	"id" INT REFERENCES response,
	"question_id" INT REFERENCES question,
	PRIMARY KEY (id, question_id),
	"choice_id" INT REFERENCES mcq_option
);
