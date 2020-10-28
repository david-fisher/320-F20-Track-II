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
insert into stakeholders values(DEFAULT, 'Sherlock Holmes', 'Detective', '<conversation text>', 1, 2);

insert into pages values(DEFAULT, 3, 'PRMPT', 1);
insert into prompt values(3, 'prompt: middle reflection');

insert into pages values(DEFAULT, 4, 'MCQ', 1);
insert into mcq values(4, 'MCQ: <obj>');
insert into question values(DEFAULT, '(S1) MCQ Question 1: <text>', 4);
insert into mcq_option values(DEFAULT, '(S1) MCQ (1) option A', 1);
insert into mcq_option values(DEFAULT, '(S1) MCQ (1) option B', 1);
insert into mcq_option values(DEFAULT, '(S1) MCQ (1) option C', 1);
insert into mcq_option values(DEFAULT, '(S1) MCQ (1) option D', 1);

insert into question values(DEFAULT, '(S1) MCQ Question 2: <text>', 4);
insert into mcq_option values(DEFAULT, '(S1) MCQ (2) option A', 2);
insert into mcq_option values(DEFAULT, '(S1) MCQ (2) option B', 2);
insert into mcq_option values(DEFAULT, '(S1) MCQ (2) option C', 2);


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
insert into conversation_choices values(4, 1);


insert into submissions values(DEFAULT, 2, 1, '2020-10-10 10:10:00');
insert into response values(DEFAULT, 2, 1, '2020-10-11 09:10:00');
insert into prompt_response values(5, 'Jane Doe''s response to Initial reflection');

insert into response values(DEFAULT, 2, 3, '2020-10-11 09:10:00');
insert into prompt_response values(6, 'Jane Doe''s response to middle reflection');

insert into response values(DEFAULT, 2, 4, '2020-10-11 09:10:00');
insert into mcq_response values(7, 1, 3);



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

-- select * from response, pages, conversation_task, stakeholders
-- where response.page_num = pages.id
-- and pages.order = 2
-- and conversation_task.page_id = pages.id
-- and stakeholders.scenario_id = pages.scenario_id
-- and stakeholders.conversation_task_id = conversation_task.page_id;