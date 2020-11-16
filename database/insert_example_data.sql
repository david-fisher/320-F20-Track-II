INSERT INTO users VALUES(DEFAULT,'John Doe', 'johndoe@umass.edu');
INSERT INTO users VALUES(DEFAULT, 'Jane doe', 'janedoe@umass.edu');
INSERT INTO users VALUES(DEFAULT, 'Carl Stevens', 'cstevens@umass.edu');
INSERT INTO users VALUES(DEFAULT, 'Aisha Kirk', 'akirk@umass.edu');

INSERT INTO users VALUES(DEFAULT, 'Marc Ritter', 'mritter@umass.edu');
INSERT INTO users VALUES(DEFAULT, 'Jayla Leblanc', 'jleblanc@umass.edu');

INSERT INTO courses VALUES(DEFAULT, 'http://course1_webpage.cs.umass.edu', 'CS 320: Software Engineering', 'F2020');
INSERT INTO courses VALUES(DEFAULT, 'http://course2_webpage.cs.umass.edu', 'CS 121: Introduction to Problem Solving with Computers', 'F2020');

INSERT INTO instructs VALUES(4, 'http://mritter_webpage.umass.edu', 1);
INSERT INTO instructs VALUES(5, 'http://jleblanc_webpage.umass.edu', 2);

INSERT INTO enrolled VALUES(1, 1);
INSERT INTO enrolled VALUES(2, 1);
INSERT INTO enrolled VALUES(2, 2);
INSERT INTO enrolled VALUES(4, 2);

-- test scenario 1
INSERT INTO scenario VALUES(DEFAULT, 'Sceanrio 1', '2020-12-01 23:59:59', 'description: test scenario', '<additional_data>');
insert into partof values(1,1);
INSERT INTO pages VALUES(DEFAULT, 1, 'PLAIN', 1);
INSERT INTO plain_page VALUES(1, 'page: Intro page content for scenario 1');

INSERT INTO pages VALUES(DEFAULT, 2, 'PRMPT', 1);
INSERT INTO prompt VALUES(2, 'Initial reflection prompt (a)...', 1);
INSERT INTO prompt VALUES(2, 'Initial reflection prompt (b)...', 2);

INSERT INTO pages VALUES(DEFAULT, 3, 'CONV', 1);
INSERT INTO conversation_task VALUES(3, 'conversation_task: <obj>');
INSERT INTO stakeholders VALUES(DEFAULT, 'Sherlock Holmes', 'Detective', '<description>','<conversation text>', 1, 3);

INSERT INTO pages VALUES(DEFAULT, 4, 'PRMPT', 1);
INSERT INTO prompt VALUES(4, 'prompt: middle reflection', 1);

INSERT INTO pages VALUES(DEFAULT, 5, 'MCQ', 1);
INSERT INTO mcq VALUES(5, 'MCQ: <obj>');
INSERT INTO question VALUES(DEFAULT, '(S1) MCQ Question 1: <text>', 5);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (1) option A', 1);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (1) option B', 1);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (1) option C', 1);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (1) option D', 1);

INSERT INTO question VALUES(DEFAULT, '(S1) MCQ Question 2: <text>', 5);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (2) option A', 2);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (2) option B', 2);
INSERT INTO mcq_option VALUES(DEFAULT, '(S1) MCQ (2) option C', 2);


INSERT INTO pages VALUES(DEFAULT, 6, 'PRMPT', 1);
INSERT INTO prompt VALUES(6, 'prompt: final reflection', DEFAULT);

INSERT INTO pages VALUES(DEFAULT, 7, 'PLAIN', 1);
INSERT INTO plain_page VALUES(7, 'Page: results will be available in one week');


INSERT INTO submissions VALUES(DEFAULT, 1, 1, '2020-10-10 10:10:00');
INSERT INTO response VALUES(DEFAULT, 1, 2, '2020-10-10 10:10:00');
INSERT INTO prompt_response VALUES(1, 1, 'John Doe''s response to initial reflection (a)');
INSERT INTO prompt_response VALUES(1, 2, 'John Doe''s response to initial reflection (b)');

INSERT INTO response VALUES(DEFAULT, 1, 4, '2020-10-11 10:10:00');
INSERT INTO prompt_response VALUES(2, 1, 'John Doe''s response to middle reflection');

INSERT INTO response VALUES(DEFAULT, 1, 6, '2020-10-12 10:10:00');
INSERT INTO prompt_response VALUES(3, 1, 'John Doe''s response to final reflection');

INSERT INTO response VALUES(DEFAULT, 1, 3, '2020-10-10 10:10:00');
--INSERT INTO conversation_choices VALUES(4, 1);


INSERT INTO submissions VALUES(DEFAULT, 2, 1, '2020-10-10 10:10:00');
INSERT INTO response VALUES(DEFAULT, 2, 2, '2020-10-11 09:10:00');
INSERT INTO prompt_response VALUES(5, 1, 'Jane Doe''s response to Initial reflection (a)');
INSERT INTO prompt_response VALUES(5, 2, 'Jane Doe''s response to Initial reflection (b)');


INSERT INTO response VALUES(DEFAULT, 2, 4, '2020-10-11 09:10:00');
INSERT INTO prompt_response VALUES(6, 1, 'Jane Doe''s response to middle reflection');

INSERT INTO response VALUES(DEFAULT, 2, 5, '2020-10-11 09:10:00');
INSERT INTO mcq_response VALUES(7, 1, 3);



-- test scenario 2
INSERT INTO scenario VALUES(DEFAULT, 'Scenario 2', '2020-12-18 23:59:59', 'description: sceanrio 2', '<additional_data for scenario 2>');
INSERT INTO partof VALUES(2, 2);
-- INSERT INTO partof VALUES(1, 2); 
-- two courses have the same scenario, one student is enrolled in both

INSERT INTO pages VALUES(DEFAULT, 1 , 'PLAIN', 2);
INSERT INTO plain_page VALUES(8, 'page: Intro page content for scenario 2');

INSERT INTO pages VALUES(DEFAULT, 2, 'PRMPT', 2);
INSERT INTO prompt VALUES(9, 'prompt: s2 Initial reflection', 1);

INSERT INTO pages VALUES(DEFAULT, 3, 'CONV', 2);
INSERT INTO conversation_task VALUES(10, 's2 conversation_task: <obj>');

INSERT INTO pages VALUES(DEFAULT, 4, 'PRMPT', 2);
INSERT INTO prompt VALUES(11, 'prompt: s2 middle reflection', 1);

INSERT INTO pages VALUES(DEFAULT, 5, 'MCQ', 2);
INSERT INTO mcq VALUES(12, 's2 MCQ: <obj>');

INSERT INTO pages VALUES(DEFAULT, 6, 'PRMPT', 2);
INSERT INTO prompt VALUES(13, 'prompt: s2 final reflection', 1);

INSERT INTO pages VALUES(DEFAULT, 7, 'PLAIN', 2);
INSERT INTO plain_page VALUES(14, 'Page: s2 results will be available in one week');


INSERT INTO submissions VALUES(DEFAULT, 2, 2, '2020-10-10 10:10:00');
INSERT INTO response VALUES(DEFAULT, 3, 2, DEFAULT);
INSERT INTO prompt_response VALUES(8, 1, 'Jane''s response to scenario 2 initial reflection');

-- display all responses in submission 1 (John)
-- select * from response, submissions 
-- where submissions.id = response.submission_id	
-- and submissions.id = 1;

-- select * from response;

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
