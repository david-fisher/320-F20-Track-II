
CREATE TABLE "users" (
	"id" SERIAL PRIMARY KEY,
	"full_name" varchar NOT NULL,
	"email" char(254) NOT NULL
	);  

CREATE TABLE "courses" (
	"id" int PRIMARY KEY,
	"webpage" varchar,
	"name" varchar
	);


CREATE TABLE "instructs" (
	"id" int references users,
	"webpage" varchar,
	"semester" varchar,
	"course_id" int references courses,
	primary key("course_id", "id")
	);


CREATE TABLE "enrolled" (
	"id" int references users,
	"semester" varchar,
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

CREATE TABLE "submissions" (
	"id" int primary key,
	"data" varchar,
	"submission_time" time,
	"course_id" int references courses,
	"scenario_id" int references scenario,
	"student_id" int,
	foreign key (student_id, course_id) references enrolled);


insert into users values(1234, 'johndoe', 'johndoe@umass.edu');
insert into users values(2345, 'janedoe', 'janedoe@umass.edu');
insert into users values(3456, 'professor', 'professor@umass.edu');
insert into courses values(3202020, 'http://webpage.cs.umass.edu', 'CS 320: Software Engineering');
insert into instructs values(3456, 'http://professor.webpage.umass.edu', 'F2020', 3202020);
insert into enrolled values(1234, 'F2020', 3202020);
insert into enrolled values(2345, 'F2020', 3202020);
insert into scenario values(7, 3202020, '2020-12-01', 'test scenario', '<additional_data>');
insert into stakeholders values(1, 'stakeholder 1', 'a stakeholder', 'conversation text', 7);

