drop table users cascade; 
drop table courses cascade; 
drop table instructs cascade; 
drop table enrolled cascade; 
drop table scenario cascade; 
drop table contains cascade;
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
drop table option cascade;




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

CREATE TABLE "contains" {
	"course_id" int references courses,
	"scenario_id" int references scenario

};

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

CREATE TABLE "mcq" (
	"page_id" int references pages primary key,
	"content" varchar
	-- maybe create a new table to store the questions and choices?
);

CREATE TABLE "plain_page" (
	"page_id" int references pages primary key,
	"content" varchar
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
	"id" int references response primary key,
	"choices" varchar
	-- alternatively, use another table to store the choices
);

CREATE TABLE "mcq_response" (
	"id" int references response primary key,
	"choices" varchar
	-- alternatively, use another table to store the responses
);

CREATE TABLE "stakeholders" (
	"id" SERIAL primary key,
	"name" varchar,
	"description" varchar,
	"conversation" varchar,
	"scenario_id" int references scenario,
	"conversation_task_id" int references conversation_task
);

CREATE TABLE "question" (
	"id" SERIAL primary key,
	"question" varchar,
	"mcq_id" int references mcq
);

CREATE TABLE "option" (
	"id" SERIAL primary key,
	"option" char(1) NOT NULL,
	"question_id" int references question
);


insert into users values(DEFAULT,'John Doe', 'johndoe@umass.edu');
insert into users values(DEFAULT, 'Jane doe', 'janedoe@umass.edu');
insert into users values(DEFAULT, 'Carl Stevens', 'cstevens@umass.edu');
insert into users values(DEFAULT, 'Aisha Kirk', 'akirk@umass.edu');

insert into users values(DEFAULT, 'Marc Ritter', 'mritter@umass.edu');
insert into users values(DEFAULT, 'Jayla Leblanc', 'jleblanc@umass.edu');

insert into courses values(DEFAULT, 'http://course1_webpage.cs.umass.edu', 'CS 320: Software Engineering', 'F2020');
insert into courses values(DEFAULT, 'http://course2_webpage.cs.umass.edu', 'CS 121: Introduction to Problem Solving with Computers', 'F2020');

insert into instructs values(4, 'http://mritter_webpage.umass.edu', 1);
insert into instructs values(5, 'http://jleblanc_webpage.umass.edu', 2);

insert into enrolled values(1, 1);
insert into enrolled values(2, 1);
insert into enrolled values(2, 2);
insert into enrolled values(4, 2);

-- test scenario 1
insert into scenario values(DEFAULT, '2020-12-01', 'description: test scenario', '<additional_data>');

insert into pages values(DEFAULT, 1, 'PRMPT', 1);
insert into prompt values(1, 'prompt: Initial reflection');

insert into pages values(DEFAULT, 2, 'CONV', 1);
insert into conversation_task values(2, 'conversation_task: <obj>');

insert into pages values(DEFAULT, 3, 'PRMPT', 1);
insert into prompt values(3, 'prompt: middle reflection');

insert into pages values(DEFAULT, 4, 'MCQ', 1);
insert into mcq values(4, 'MCQ: <obj>');

insert into pages values(DEFAULT, 5, 'PRMPT', 1);
insert into prompt values(5, 'prompt: final reflection');

insert into pages values(DEFAULT, 6, 'PLAIN', 1);
insert into plain_page values(6, 'Page: results will be available in one week');


insert into submissions values(DEFAULT, 1, 1, '2020-10-10 10:10:00');
insert into response values(DEFAULT, 1, 1, '2020-10-10 10:10:00');
insert into prompt_response values(1, 'John Doe''s response to initial reflection');

insert into response values(DEFAULT, 1, 3, '2020-10-11 10:10:00');
insert into prompt_response values(2, 'John Doe''s response to middle reflection');

insert into response values(DEFAULT, 1, 5, '2020-10-12 10:10:00');
insert into prompt_response values(3,'John Doe''s response to final reflection');

insert into response values(DEFAULT, 1, 2, '2020-10-10 10:10:00');
insert into conversation_choices values(4, '<John''s choices>');


insert into submissions values(DEFAULT, 2, 1, '2020-10-10 10:10:00');
insert into response values(DEFAULT, 2, 1, '2020-10-11 09:10:00');
insert into prompt_response values(5, 'Jane Doe''s response to Initial reflection');

insert into response values(DEFAULT, 2, 3, '2020-10-11 09:10:00');
insert into prompt_response values(6, 'Jane Doe''s response to middle reflection');

insert into response values(DEFAULT, 2, 4, '2020-10-11 09:10:00');
insert into mcq_response values(7, 'MCQ: A, B, A, D, C, C, D, E');



-- test scenario 2
insert into scenario values(DEFAULT, '2020-12-18', 'description: sceanrio 2', '<additional_data for scenario 2>');

insert into pages values(DEFAULT, 1, 'PRMPT', 2);
insert into prompt values(7, 'prompt: s2 Initial reflection');

insert into pages values(DEFAULT, 2, 'CONV', 2);
insert into conversation_task values(8, 's2 conversation_task: <obj>');

insert into pages values(DEFAULT, 3, 'PRMPT', 2);
insert into prompt values(9, 'prompt: s2 middle reflection');

insert into pages values(DEFAULT, 4, 'MCQ', 2);
insert into mcq values(10, 's2 MCQ: <obj>');

insert into pages values(DEFAULT, 5, 'PRMPT', 2);
insert into prompt values(11, 'prompt: s2 final reflection');

insert into pages values(DEFAULT, 6, 'PLAIN', 2);
insert into plain_page values(12, 'Page: s2 results will be available in one week');


insert into submissions values(DEFAULT, 2, 2, '2020-10-10 10:10:00');
insert into response values(DEFAULT, 3, 1, '2020-10-10 10:10:00');
insert into prompt_response values(8, 'Jane''s response to scenario 2 initial reflection');

-- -- display all responses in submission 1 (John)
-- select * from response, submissions 
-- where submissions.id = response.submission_id	
-- and submissions.id = 1;

-- -- display all prompt responses that are in a submission
-- select * from response, submissions, prompt_response
-- where submissions.id = response.submission_id
-- and response.id = prompt_response.id
-- and submissions.id = 2;


