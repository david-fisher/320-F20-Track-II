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

function addInitReflectResponse(studentID, input, scenarioID, timestamp, callback){
    let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=' + INITIAL_REFLECTION;
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        let pageID=results.rows[0].id
        let thisQuery= 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
        pool.query(thisQuery, [scenarioID, studentID], (error,results) => {
            if (error) {
                throw error
            }
            let submissionID=results.rows[0].id
            let thisQuery='insert into response(submission_id, page_num, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_num) DO UPDATE SET time = $3'
            pool.query(thisQuery, [submissionID, pageID, timestamp], (error,results) => {
                if (error) {
                    throw error
                }
                pool.query('select id from response where submission_id=$1 and page_num=$2',[submissionID, pageID], (error,results) => {
                    if (error) {
                        throw error
                    }
                    let responseID=results.rows[0].id
                    let thisQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2'
                    pool.query(thisQuery, [responseID, input], (error,results) => { 
                        if (error) {
                            throw error
                        }
                        callback("Success!")
                    })
                })
            })
        })
    }) 
}

function addMidReflectResponse(studentID, input, scenarioID, timestamp, callback){
    let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=3';
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        let pageID=results.rows[0].id
        let thisQuery= 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
        pool.query(thisQuery, [scenarioID, studentID], (error,results) => {
            if (error) {
                throw error
            }
            let submissionID=results.rows[0].id
            let thisQuery='insert into response(submission_id, page_num, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_num) DO UPDATE SET time = $3'
            pool.query(thisQuery, [submissionID, pageID, timestamp], (error,results) => {
                if (error) {
                    throw error
                }
                pool.query('select id from response where submission_id=$1 and page_num=$2',[submissionID, pageID], (error,results) => {
                    if (error) {
                        throw error
                    }
                    let responseID=results.rows[0].id
                    let thisQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2'
                    pool.query(thisQuery, [responseID, input], (error,results) => { 
                        if (error) {
                            throw error
                        }
                        callback("Success!")
                    })
                })
            })
        })
    }) 
}

function addFinalReflectResponse(studentID, input, scenarioID, timestamp, callback){
    let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order='+ FINAL_REFLECTION;
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        let pageID=results.rows[0].id
        let thisQuery= 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
        pool.query(thisQuery, [scenarioID, studentID], (error,results) => {
            if (error) {
                throw error
            }
            let submissionID=results.rows[0].id
            let thisQuery='insert into response(submission_id, page_num, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_num) DO UPDATE SET time = $3'
            pool.query(thisQuery, [submissionID, pageID, timestamp], (error,results) => {
                if (error) {
                    throw error
                }
                // May not be a prompt every time
                pool.query('select id from response where submission_id=$1 and page_num=$2',[submissionID, pageID], (error,results) => {
                    if (error) {
                        throw error
                    }
                    let responseID=results.rows[0].id
                    let thisQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2'
                    pool.query(thisQuery, [responseID, input], (error,results) => { 
                        if (error) {
                            throw error
                        }
                        callback("Success!")
                    })
                })
            })
        })
    }) 
}
function scenarioExists(scenarioID){
    //returns True if scenarioID exists
    let thisQuery = 'select scenario.id from scenario where scenario.id = ${scenarioID}'
        pool.query(thisQuery, [], (error, results) => {
            if (error){
                throw error
            }
            // TODO return if results is not zero
            return results
        })

}

// helper for createScenario
function addScenario(name, due_date, description, additional_data){
    let thisQuery = 'insert into scenario values(${name}, ${due_date}, ${description}, ${additional_data})'
    pool.query(thisQuery, [], (error, results) => {
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
    
    let thisQuery = 'insert into partof values(${courseID}, ${scenarioID})'
    pool.query(thisQuery, [], (error, results) => {
        if (error){
            throw error
        }
        return results.rows
    })
}


function scenarioPageExists(order, type, scenarioID){
    // returns pageID
    let thisQuery = 'select pages.id from pages, scenario where pages.scenario_id = ${scenarioID} and pages.order = ${order} and pages.type = ${type}'
    pool.query(thisQuery, [], (error, results) => {
        if (error){
            throw error
        }
        // TODO return pageID from results
        return results;
    })
}

function createPage(order, type, scenarioID){
    // returns pageID if exists, else creates new
    pageID = scenarioPageExists(order, type, scenarioID)
    if(pageID === null){
        let thisQuery = 'insert into pages values(DEFAULT, ${order}, ${type}, ${scenarioID})'
        pool.query(thisQuery, [], (error, results) => {
            if (error){
                throw error
            }
            // TODO return pageID from results
            return results;
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
        let thisQuery = 'insert into plain_page values(${pageID}, ${text})'
        pool.query(thisQuery, [], (error, results) => {
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
        for (i in prompts){
            let thisQuery = 'insert into prompt values(${pageID}, ${prompt}, DEFAULT)'
            pool.query(thisQuery, [], (error, results) => {
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
        // create page object
        pageID = createPage(MIDDLE_REFLECTION, TYPE_PROMPT, scenarioID)
        // create priompt object
        for (i in prompts){
            let thisQuery = 'insert into prompt values(${pageID}, ${prompt}, DEFAULT)'
            pool.query(thisQuery, [], (error, results) => {
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
        // create page object
        pageID = createPage(FINAL_REFLECTION, TYPE_PROMPT, scenarioID)
        //create prompt object
        for (i in prompts){
            let thisQuery = 'insert into prompt values(${pageID}, ${prompt}, DEFAULT)'
            pool.query(thisQuery, [], (error, results) => {
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
        // create page object
        pageID = createPage(CONVERSATION, TYPE_CONV, scenarioID)
        //create prompt object
        for (i in prompts){
            let thisQuery = 'insert into conversation_task values(${pageID}, ${description})'
            pool.query(thisQuery, [], (error, results) => {
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




function addStakeholder(scenarioID, name, description, conversations, callback){
    // check scenario exists
    // check conversation task page exists (create if does not exist?)
    // insert stakeholder
    if (scenarioExists(scenarioID)){
        // create page object
        pageID = createPage(FINAL_REFLECTION, TYPE_PROMPT, scenarioID)
        //create prompt object
        for (i in prompts){
            let thisQuery = 'insert into prompt values(${pageID}, ${prompt}, DEFAULT)'
            pool.query(thisQuery, [], (error, results) => {
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

function addStakeholderConversations(stakeholderID, conversation_text_array){
    // TODO check stakeholder exists


    // insert conversations from array
    for(conv in conversation_text_array){    
        let thisQuery = 'insert into conversation values(DEFAULT, ${stakeholderID}, ${conv})'
        pool.query(thisQuery, [], (error, results) => {
            if (error){
                throw error
            }            
        })
    }
    callback(results.rows)
}

function addInitActionPage(scenarioID, description, prompts, callback){
    // check scenario exists
    // upsert MCQ page
    if (scenarioExists(scenarioID)){
        // create page object
        pageID = createPage(INIT_ACTION, TYPE_MCQ, scenarioID)
        //create prompt object
        for (i in prompts){
            let thisQuery = 'insert into mcq values(${pageID}, ${description})'
            pool.query(thisQuery, [], (error, results) => {
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
            let thisQuery = 'insert into mcq values(${pageID}, ${description})'
            pool.query(thisQuery, [], (error, results) => {
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
    getFinalReflectPage
}
