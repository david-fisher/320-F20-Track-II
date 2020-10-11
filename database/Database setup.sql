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
	"id" SERIAL primary key,
	"course_id" int references courses NOT NULL,
	"due_date" date,
	"description" varchar,
	"additional_data" varchar
	); 

CREATE TABLE "stakeholders" (
	"id" SERIAL primary key,
	"name" varchar,
	"description" varchar,
	"conversation" varchar,
	"scenario_id" int references scenario
	);

CREATE TABLE "prompt" (
	"id" SERIAL PRIMARY KEY,
	"prompt" varchar,
	"scenario_id" int references scenario
);


CREATE TABLE "submissions" (
	"id" SERIAL primary key,
	"submission_time" time,
	"student_id" int,
	"course_id" int,
	foreign key (student_id, course_id) references enrolled
);

CREATE TABLE "responses" (
	"id" SERIAL PRIMARY KEY,
	"answer" varchar,
	"prompt_id" int references prompt,
	"submission_id" int references submissions

);



insert into users values(DEFAULT,'John Doe', 'johndoe@umass.edu');
insert into users values(DEFAULT, 'Jane doe', 'janedoe@umass.edu');
insert into users values(DEFAULT, 'Carl Stevens', 'cstevens@umass.edu');

insert into users values(DEFAULT, 'Marc Ritter', 'mritter@umass.edu');
insert into users values(DEFAULT, 'Jayla Leblanc', 'jleblanc@umass.edu');

insert into courses values(DEFAULT, 'http://course1_webpage.cs.umass.edu', 'CS 320: Software Engineering', 'F2020');
insert into courses values(DEFAULT, 'http://course2_webpage.cs.umass.edu', 'CS 121: Introduction to Problem Solving with Computers', 'F2020');

insert into instructs values(4, 'http://mritter_webpage.umass.edu', 1);
insert into instructs values(5, 'http://jleblanc_webpage.umass.edu', 2);

insert into enrolled values(1, 1);
insert into enrolled values(2, 1);
insert into scenario values(DEFAULT, 1, '2020-12-01', 'test scenario', '<additional_data>');
insert into stakeholders values(DEFAULT, 'stakeholder 1', 'a stakeholder', 'conversation text', 1);

insert into prompt values(DEFAULT, 'Initial prompt', 1);
insert into prompt values(DEFAULT, 'Final reflection', 1);

insert into submissions values(DEFAULT, '00:00', 1, 1);
insert into responses values(DEFAULT, 'Jane''s answer to initial prompt', 1, 1);
insert into submissions values(DEFAULT, '00:00', 2, 1);
insert into responses values(DEFAULT, 'John''s answer to initial prompt', 1, 2);

insert into responses values(DEFAULT, 'Jane''s final reflection', 2, 1);
insert into responses values(DEFAULT, 'John''s final reflection', 2, 2);

-- the insertion below should fail 
insert into submissions values(DEFAULT, '00:00', 3, 1);
insert into responses values(DEFAULT, 'Carl''s initial post', 1, 1);



