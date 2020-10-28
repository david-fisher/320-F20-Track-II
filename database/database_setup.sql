drop table users cascade; 
drop table courses cascade; 
drop table instructs cascade; 
drop table enrolled cascade; 
drop table scenario cascade;
drop table issues cascade;
drop table importance cascade;
drop table score cascade;
drop table partof cascade; -- contains
drop table pages cascade;
drop table prompt cascade;
drop table conversation_task cascade;
drop table mcq cascade;
drop table plain_page cascade;
drop table submissions cascade;
drop table response cascade;
drop table prompt_response cascade;
drop table conversation_choices cascade;
drop table mcq_response cascade;
drop table stakeholders cascade; 
drop table question cascade;
drop table mcq_option cascade; -- option


CREATE TABLE "users" (
	"id" SERIAL,
	primary key (id),
	"full_name" varchar NOT NULL,
	"email" char(254) NOT NULL,
	"demographics" varchar
);  

CREATE TABLE "courses" (
	"id" SERIAL PRIMARY KEY,
	"webpage" varchar,
	"name" varchar,
	"semester" char(10) NOT NULL
);

CREATE TABLE "instructs" (
	"instructor_id" int references users,
	"webpage" varchar,
	"course_id" int references courses,
	primary key("course_id", "instructor_id")
);

CREATE TABLE "enrolled" (
	"student_id" int references users,
	"course_id" int references courses,
	primary key("student_id", "course_id")
);

CREATE TABLE "scenario" (
	"id" SERIAL primary key,
	-- "course_id" int references courses NOT NULL,
	"due_date" date,
	"description" varchar,
	"additional_data" varchar
); 

CREATE TABLE "partof" (
	"course_id" int references courses,
	"scenario_id" int references scenario
);

CREATE TABLE "pages" (
	"id" SERIAL primary key,
	"order" int,
	"type" char(5),
	"scenario_id" int references scenario
);

CREATE TABLE "prompt" (
	"page_id" int references pages primary key,
	"prompt" varchar
);

CREATE TABLE "conversation_task" (
	"page_id" int references pages primary key,
	"content" varchar
);

CREATE TABLE "stakeholders" (
	"id" SERIAL primary key,
	"name" varchar,
	"description" varchar,
	"conversation" varchar,
	"scenario_id" int references scenario,
	"conversation_task_id" int references conversation_task
);

CREATE TABLE "issues" (
	"id" SERIAL primary key,
	"name" varchar,
	"description" varchar
);

CREATE TABLE "importance" (
	"issue_id" int references issues,
	"scenario_id" int references scenario,
	primary key (issue_id, scenario_id),
	"value" int
);

CREATE TABLE "score" (
	"stakeholder_id" int references stakeholders,
	"issue_id" int references issues,
	primary key (stakeholder_id, issue_id),
	"value" int
);

CREATE TABLE "mcq" (
	"page_id" int references pages primary key,
	"content" varchar
	-- maybe create a new table to store the questions and choices?
);

CREATE TABLE "plain_page" (
	"page_id" int references pages primary key,
	"content" varchar
);



CREATE TABLE "question" (
	"id" SERIAL primary key,
	"question" varchar,
	"mcq_id" int references mcq
);

CREATE TABLE "mcq_option" (
	"id" SERIAL primary key,
	"option" varchar NOT NULL,
	"question_id" int references question
);

CREATE TABLE "submissions" (
	"id" SERIAL PRIMARY KEY,
	"user_id" int references users,
	"scenario_id" int references scenario,
	"submission_time" timestamp,
	UNIQUE(user_id, scenario_id)
);

CREATE TABLE "response" (
	"id" SERIAL PRIMARY KEY,
	"submission_id" int references submissions,
	"page_num" int,
	-- "page_id" int references pages,
	"time" timestamp
);

CREATE TABLE "prompt_response" (
	"id" int references response primary key,
	"response" varchar
);

CREATE TABLE "conversation_choices" (
	"id" int references response,
	"stakeholder_id" int references stakeholders,
	primary key (id, stakeholder_id)
);

CREATE TABLE "mcq_response" (
	"id" int references response,
	"question_id" int references question,
	primary key (id, question_id),
	"choice_id" int references mcq_option
);
