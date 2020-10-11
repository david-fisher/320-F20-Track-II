drop table users cascade; 
drop table courses cascade; 
drop table instructs cascade; 
drop table enrolled cascade; 
drop table scenario cascade; 
drop table stakeholders cascade; 
drop table prompt cascade;
drop table responses cascade;
drop table submissions cascade;



CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"full_name" varchar NOT NULL,
	"email" char(254) NOT NULL,
	"demographics" varchar
	);  

CREATE TABLE "courses" (
	"id" int PRIMARY KEY,
	"webpage" varchar,
	"name" varchar,
	"semester" char(10)
	);


CREATE TABLE "instructs" (
	"id" int references users,
	"webpage" varchar,
	"course_id" int references courses,
	primary key("course_id", "id")
	);


CREATE TABLE "enrolled" (
	"id" int references users,
	"course_id" int references courses,
	primary key("id", "course_id")
	);

CREATE TABLE "scenario" (
	"id" int primary key,
	"course_id" int references courses,
	"due_date" date,
	"description" varchar,
	"additional_data" varchar
	); 

CREATE TABLE "stakeholders" (
	"id" int primary key,
	"name" varchar,
	"description" varchar,
	"conversation" varchar,
	"scenario_id" int references scenario
	);

CREATE TABLE "prompt" (
	"id" int PRIMARY KEY,
	"prompt" varchar,
	"scenario_id" int references scenario
);

CREATE TABLE "responses" (
	"id" int PRIMARY KEY,
	"answer" varchar,
	"prompt_id" int references prompt,
	"user_id" int references users

);

CREATE TABLE "submissions" (
	"id" int primary key,
	"submission_time" time,
	"response_id" int references responses,
	"student_id" int,
	"course_id" int,
	foreign key (student_id, course_id) references enrolled
	);




insert into users values(1, 'John Doe', 'johndoe@umass.edu');
insert into users values(2, 'Jane doe', 'janedoe@umass.edu');
insert into users values(3, 'Carl Stevens', 'cstevens@umass.edu');

insert into users values(4, 'Marc Ritter', 'mritter@umass.edu');
insert into users values(5, 'Jayla Leblanc', 'jleblanc@umass.edu');

insert into courses values(1, 'http://course1_webpage.cs.umass.edu', 'CS 320: Software Engineering');
insert into courses values(2, 'http://course2_webpage.cs.umass.edu', 'CS 121: Introduction to Problem Solving with Computers');

insert into instructs values(4, 'http://mritter_webpage.umass.edu', 'F2020', 1);
insert into instructs values(5, 'http://jleblanc_webpage.umass.edu', 'F2020', 2);

insert into enrolled values(1, 'F2020', 1);
insert into enrolled values(2, 'F2020', 1);
insert into scenario values(1, 1, '2020-12-01', 'test scenario', '<additional_data>');
insert into stakeholders values(1, 'stakeholder 1', 'a stakeholder', 'conversation text', 7);

insert into prompt values(1, 'Initial prompt', 1);
insert into prompt values(2, 'Final reflection', 1);

insert into responses values(1, 'Jane''s answer to initial prompt', 1, 2);
insert into responses values(2, 'John''s answer to initial prompt', 1, 1);
insert into responses values(3, 'Jane''s final reflection', 2, 2);
insert into responses values(4, 'John''s final reflection', 2, 1);

-- the insertion below should fail
insert into responses values(5, 'Carl''s initial post', 1, 3)


