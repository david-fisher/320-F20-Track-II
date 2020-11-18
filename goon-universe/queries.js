var env = require('node-env-file');
env(__dirname + '/.env');

/*
 * These constants are concatenated into SQL queries below, so be careful
 * WHEN IN DOUBT, PATCH CONCATENATION OUT
 */
// constants for page numbers/order
// re-order once all functions are written
const INTROPAGE = 1
const INITIAL_REFLECTION = 2
const CONVERSATION = 3
const MIDDLE_REFLECTION = 4
const FINAL_REFLECTION = 5
const FINAL_ACTION = 6
const INIT_ACTION = 7

// constants for page types
const TYPE_PLAIN = 'PLAIN'
const TYPE_PROMPT = 'PRMPT'
const TYPE_MCQ = 'MCQ'
const TYPE_CONV = 'CONV'

const Pool = require('pg').Pool

const pool = new Pool({
    user: env.PGUSER,
    password: env.PGPASSWORD,
    host: env.PGHOST,
    port: env.PGPORT,
    database: env.PGDATABASE,
    max: 20,
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0
})

function getScenarios(studentID, callback){
    let thisQuery= 'select scenario.id, scenario.name, scenario.description, scenario.due_date from scenario, partof, enrolled where enrolled.student_id = $1 and enrolled.course_id = partof.course_id and partof.scenario_id = scenario.id '
    
    pool.query(thisQuery, [studentID], (error,results) => {
        if (error) {

            throw error
        }
        callback(results.rows)
    })  
}

function getIntroPage(scenarioID, callback){
    let thisQuery= 'select plain_page.content from plain_page, pages where pages.id = plain_page.page_id and pages.order = ' + INTROPAGE + 'and scenario_id = $1'
    
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {

            throw error
        }
        callback(results.rows)
    })  
}

function getInitReflectPage(scenarioID, callback){
    let thisQuery = 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order = '+ INITIAL_REFLECTION +' and scenario_id = $1'
    pool.query(thisQuery, [], (error, results) => {
        if (error){
            throw error
        }
        callback(results.rows)
    })
}

function getInitReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order = '+ INITIAL_REFLECTION +' and response.page_num=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getMidReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order = '+ MIDDLE_REFLECTION +' and response.page_num=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getFinalReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order='+ FINAL_REFLECTION +' and response.page_num=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

//Get the names, ids, and descriptions of each stakeholder in a scenario
function getStakeholders(scenarioID, callback){
    let thisQuery= 'select stakeholders.name, stakeholders.id, stakeholders.description from stakeholders where stakeholders.scenario_id =$1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}
function getName(userID, callback){
    let thisQuery= 'select users.full_name from users where id =$1'
    pool.query(thisQuery, [userID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getCourseInfo(courseID, callback){
    let thisQuery= 'select webpage, name, semester from courses where id =$1'
    pool.query(thisQuery, [courseID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getInstructorInfo(instructorID, callback){
    let thisQuery= 'select full_name, email, webpage, course_id from instructs, users where instructs.instructor_id =$1 and users.id=$1'
    pool.query(thisQuery,[instructorID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

//Maybe change to addStudent and addInstructor?
function addUser(fullName, email, callback){
    let thisQuery= 'insert into users(full_name, email) values ($1 , $2)';
    pool.query(thisQuery, [fullName, email], (error,results) => {
        if (error) {
            throw error
        }
        callback('Success!')
    }) 
}

function addCourse(coursePage, courseName, semester, callback){
    let thisQuery= 'insert into courses(webpage, name, semester) values ($1, $2, $3)';
    pool.query(thisQuery, [coursePage, courseName, semester], (error,results) => {
        if (error) {
            throw error
        }
        callback('Success!')
    }) 
}

async function addReflectionResponse(studentID, input, scenarioID, timestamp, page_order) {
	const selectPageQuery = 'select id from pages where pages.scenario_id=$1 and pages.order=$2';
	const selectSubmissionsQuery = 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
	const insertResponseQuery = 'INSERT INTO response(submission_id, page_num, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_num) DO UPDATE SET TIME = $3 RETURNING id';
	const insertPromptResponseQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2';

	const client = await pool.connect();
	try {
		await client.query("BEGIN");
		const pageSelection = await client.query(selectPageQuery, [scenarioID, page_order]);
		let pageID = pageSelection.rows[0].id;
		const submissionSelection = await client.query(selectSubmissionsQuery, [scenarioID, studentID]);
		let submissionID = submissionSelection.rows[0].id;
		// RETURNING clause returns ID at the same time
		const responseCreation = await client.query(insertResponseQuery, [submissionID, pageID, timestamp]);
		let responseID = responseCreation.rows[0].id;
		await client.query(insertPromptResponseQuery, [responseID, input]);
		await client.query("COMMIT");
	} catch (e) {
		await client.query("ROLLBACK");
		throw e;
	} finally {
		client.release();
	}
}

function addInitReflectResponse(studentID, input, scenarioID, timestamp, callback) {
	addReflectionResponse(studentID, input, scenarioID, timestamp, INITIAL_REFLECTION).then(() => callback("Success!"));
}
function addMidReflectResponse(studentID, input, scenarioID, timestamp, callback) {
	addReflectionResponse(studentID, input, scenarioID, timestamp, MIDDLE_REFLECTION).then(() => callback("Success!"));
}
function addFinalReflectResponse(studentID, input, scenarioID, timestamp, callback) {
	addReflectionResponse(studentID, input, scenarioID, timestamp, FINAL_REFLECTION).then(() => callback("Success!"));
}

function scenarioExists(scenarioID){
    //returns True if scenarioID exists
    let thisQuery = 'select scenario.id from scenario where scenario.id = $1'
        pool.query(thisQuery, [scenarioID], (error, results) => {
            if (error){
                throw error
            }
            // TODO return if results is not zero
            return results
        })

}

// helper for createScenario
function addScenario(name, due_date, description, additional_data){
    let thisQuery = 'insert into scenario values($1, $2, $3, $4)'
    pool.query(thisQuery, [name, due_date, description, additional_data], (error, results) => {
        if (error){
            throw error
        }
        return results.rows
    })

}

function createScenario(instructorID, name, due_date, description, additional_data){

}

function addScenarioToCourse(scenarioID, courseID){
    // check course exists
    // check scenario exists
    
    let thisQuery = 'insert into partof values($1, $2)'
    pool.query(thisQuery, [courseID, scenarioID], (error, results) => {
        if (error){
            throw error
        }
        return results.rows
    })
}


function scenarioPageExists(order, type, scenarioID){
    // returns pageID
    let thisQuery = 'select pages.id from pages, scenario where pages.scenario_id = $1 and pages.order = $2 and pages.type = $3'
    pool.query(thisQuery, [scenarioID, order, type], (error, results) => {
        if (error){
            throw error
        }
        // return pageID from results
        return results.rows[0].id;
    })
}

function createPage(order, type, scenarioID){
    // returns pageID if exists, else creates new
    pageID = scenarioPageExists(order, type, scenarioID)
    if(pageID === null){
        let thisQuery = 'insert into pages values(DEFAULT, $1, $2, $3)'
        pool.query(thisQuery, [order, type, scenarioID], (error, results) => {
            if (error){
                throw error
            }
            // return pageID
            return scenarioPageExists(order, type, sceanrioID);
        })
    }
    return pageID
}


function addIntroPage(scenarioID, text, callback){
    //check scenario exists
    // upsert intro page
    if (scenarioExists(scenarioID)){
        // create page object
        pageID = createPage(INTROPAGE, TYPE_PLAIN, scenarioID)
        //create plain-page object
        let thisQuery = 'insert into plain_page values($1, $2) ON CONFLICT (id) DO UPDATE SET content = $2'
        pool.query(thisQuery, [pageID, text], (error, results) => {
            if (error){
                throw error
            }
            callback(results.rows)
        })
    }
    else{
        // TODO return InvalidScenarioError
        throw error
    }
}
function addInitReflectPagePage(scenarioID, description, prompts, callback){
    // check scenario exists
    // upsert init reflect page
    if (scenarioExists(scenarioID)){
        //create page object
        pageID = createPage(INTROPAGE, TYPE_PROMPT, scenarioID)
        //create prompt object
        for (p in prompts){
            let thisQuery = 'insert into prompt values($1, $2, DEFAULT)'
            pool.query(thisQuery, [pageID, p], (error, results) => {
                if (error){
                    throw error;
                }
                callback(results.rows)
            })
        }
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }

}

function addMidReflectPage(scenarioID, description, prompts, callback){
    // check scenario exists
    // upsert mid reflect page
    if(scenarioExists(scenarioID)){
        // create page object (checks or conflicts)
        pageID = createPage(MIDDLE_REFLECTION, TYPE_PROMPT, scenarioID)
        // create priompt object
        for (p in prompts){
            let thisQuery = 'insert into prompt values($1, $2, DEFAULT)'
            pool.query(thisQuery, [pageID, p], (error, results) => {
                if (error){
                    throw error;
                }
                callback(results.rows)
            })
        }
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }
}
function addFinalReflectPage(scenarioID, description, prompts, callback){
    // check scenario exists
    // upsert final reflect page
    if (scenarioExists(scenarioID)){
        // create page object (checks for conflicts)
        pageID = createPage(FINAL_REFLECTION, TYPE_PROMPT, scenarioID)
        //create prompt object
        for (p in prompts){
            let thisQuery = 'insert into prompt values($1, $2, DEFAULT)'
            pool.query(thisQuery, [pageID, p], (error, results) => {
                if (error){
                    throw error;
                }
                callback(results.rows)
            })
        }
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }
}

function addConvTaskPage(scenarioID, description, callback){
    // check scenario exists
    // upsert final reflect page
    if (scenarioExists(scenarioID)){
        // create page object (checks for conflicts)
        pageID = createPage(CONVERSATION, TYPE_CONV, scenarioID)
        //create prompt object
        let thisQuery = 'insert into conversation_task values($1, $2)'
        pool.query(thisQuery, [pageID, description], (error, results) => {
            if (error){
                throw error;
            }
            callback(results.rows)
        })
        
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }
}




function addStakeholder(scenarioID, name, description, conversations, callback){
    // check scenario exists
    // check conversation task page exists (create if does not exist?)
    // insert stakeholder
    
    if (scenarioExists(scenarioID)){
        // create page object (checks for c)
        pageID = createPage(CONVERSATION, TYPE_CONV, scenarioID)
        //create conversation_task object
        let thisQuery = 'insert into stakeholders values(DEFAULT, $1, $2, NULL, $4, $5) returning id;'
        pool.query(thisQuery, [name, description, scenarioID, pageID], (error, results) => {
            if (error){
                throw error;
            }
            addStakeholderConversations(results.rows[0].id, conversations)
            callback(results.rows)
        })       
        
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }
}

// helper function for addStakeholder
function addStakeholderConversations(stakeholderID, conversation_text_array){
    // TODO check stakeholder exists

    // insert conversations from array
    for(conv in conversation_text_array){    
        let thisQuery = 'insert into conversation values(DEFAULT, $1, $2)'
        pool.query(thisQuery, [stakeholderID, conv], (error, results) => {
            if (error){
                throw error
            }
        })
    }

    
}

function addInitActionPage(scenarioID, description, prompts, callback){
    // check scenario exists
    // upsert MCQ page
    if (scenarioExists(scenarioID)){
        // create page object
        pageID = createPage(INIT_ACTION, TYPE_MCQ, scenarioID)
        //create prompt object
        for (i in prompts){
            let thisQuery = 'insert into mcq values($1, $2)'
            pool.query(thisQuery, [pageID, description], (error, results) => {
                if (error){
                    throw error;
                }
                callback(results.rows)
            })
        }
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }
}

function addFinalActionPage(scenarioID, description, prompts, callback){
    // check scenario exists
    // upsert MCQ page
    if (scenarioExists(scenarioID)){
        // create page object
        pageID = createPage(FINAL_ACTION, TYPE_MCQ, scenarioID)
        //create prompt object
        for (i in prompts){
            let thisQuery = 'insert into mcq values($1, $2)'
            pool.query(thisQuery, [pageID, description], (error, results) => {
                if (error){
                    throw error;
                }
                callback(results.rows)
            })
        }
    }
    else{
        // TODO return InvalidScenarioError
        throw error;
    }
}

// may be used as a helper
function addMCQQuestion(question, mcq_id){
    // TODO check for invalid parameters
    let thisQuery = 'insert into question values(DEFAULT, $1, $2)'
    pool.query(thisQuery, [question, mcq_id], (error, results) => {
        if (error){
            throw error;
        }
        callback(results.rows)
    })
}

// may be used as a helper
function addMCQOption(option, question_id){
    // TODO check for invalid parameters
    let thisQuery = 'insert into mcq_option values(DEFAULT, $1, $2)'
    pool.query(thisQuery, [option, question_id], (error, results) => {
        if (error){
            throw error;
        }
        callback(results.rows)
    })
}

function getStakeholderDescriptions(scenarioID){
    // TODO check for invalid parameters
    if (scenarioExists()){
        let thisQuery = 'select stakeholders.id, stakeholders.description from stakeholders where stakeholders.scenario_id=$1'
        pool.query(thisQuery, [scenarioID], (error, results) => {
            if (error){
                throw error;
            }
            callback(results.rows)
        })
    }
}

function getInitReflectPage(scenarioID, callback){
    let thisQuery= 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order = '+ INITIAL_REFLECTION +' and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function getMidReflectPage(scenarioID, callback){
    let thisQuery= 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order = '+ MIDDLE_REFLECTION +' and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function getFinalReflectPage(scenarioID, callback){
    let thisQuery= 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order ='+ FINAL_REFLECTION +'and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

//Returns question IDs as well for getChoices functions
function getInitActionPageQuestions(scenarioID, callback){
    let thisQuery= 'select question.question, question.id from pages, mcq, question where pages.id = mcq.page_id and mcq.page_id=question.mcq_id and pages.order ='+ INIT_ACTION +'and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}


function getInitActionPageChoices(scenarioID, questionId, callback){
    let thisQuery= 'select mcq_option.option from pages, mcq, mcq_option, question where mcq_option.question_id= $1 and mcq_option.question_id = question.id and pages.id = mcq.page_id and mcq.page_id=question.mcq_id and pages.order ='+ INIT_ACTION +'and scenario_id = $2'
    pool.query(thisQuery, [questionId, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function getFinalActionPageQuestions(scenarioID, callback){
    let thisQuery= 'select question.question from pages, mcq, question where pages.id = mcq.page_id and mcq.page_id=question.mcq_id and pages.order ='+ FINAL_ACTION +'and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function getFinalActionPageChoices(scenarioID, questionId, callback){
    let thisQuery= 'select mcq_option.option from pages, mcq, mcq_option, question where mcq_option.question_id= $1 and mcq_option.question_id = question.id and pages.id = mcq.page_id and mcq.page_id=question.mcq_id and pages.order ='+ FINAL_ACTION +'and scenario_id = $2'
    pool.query(thisQuery, [questionId, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function cb(results){
    console.log(results)
    pool.end()
}

//addInitReflectResponse(1, 'John Doe\'s first scenario initial response updated', 1, '2020-10-28 11:12:13', cb)
//addFinalReflectResponse(1, 'John Doe\'s second scenario final response', 2, '2020-10-28 11:00:00', cb)
//addFinalReflectResponse(1, 'John Doe\'s second scenario final response updated', 2, '2020-10-29 10:12:13', cb)




//getInstructorInfo(4).then(x => console.log(x[0]));
//addCourse('New Course','CS305','F2020').then(x => console.log(x));
//pool.end()

module.exports = {
    getScenarios,
    getIntroPage,
    getInitReflectResponse,
    getMidReflectResponse,
    getFinalReflectResponse,
    getStakeholders,
    getName,
    getCourseInfo,
    getInstructorInfo,
    addUser,
    addCourse,
    addInitReflectResponse,
    addMidReflectResponse,
    addFinalReflectResponse,
    addIntroPage,
    addInitReflectPagePage,
    addMidReflectPage,
    addFinalReflectPage,
    addStakeholder,
    addStakeholderConversations,
    addFinalActionPage,
    getInitReflectPage,
    getMidReflectPage,
    getFinalReflectPage,
    getInitActionPageQuestions,
    getInitActionPageChoices,
    getFinalActionPageQuestions,
    getFinalActionPageChoices
}
