const { query } = require('express');
const { Parser, transforms: { unwind } } = require('json2csv');
const csvtojson = require("csvtojson");
var env = require('node-env-file');
env(__dirname + '/.env');
// require("dotenv").config()
/*
 * These constants are concatenated into SQL queries below, so be careful
 * WHEN IN DOUBT, PATCH CONCATENATION OUT
 */
// constants for page numbers/order
// re-order once all functions are written

const INTROPAGE = 1
const TASKPAGE = 2
const INITIAL_REFLECTION = 3
const INIT_ACTION = 4
const INIT_ACTION_SUBSEQUENT = 5
const CONVERSATION = 6
const MIDDLE_REFLECTION = 7
const FINAL_ACTION = 8
const SUMMARY_PAGE = 9
const FEEDBACK_PAGE = 10
const FINAL_REFLECTION = 11
const CONCLUSIONPAGE = 12

// constants for page types
const TYPE_PLAIN = 'PLAIN'
const TYPE_PROMPT = 'PRMPT'
const TYPE_MCQ = 'MCQ'
const TYPE_CONV = 'CONV'

const SUCCESS = "Success!"

const Pool = require('pg').Pool

/* Example .env file
 * PGUSER=<username>
 * PGHOST="localhost"
 * PGDATABASE="ethicssimulatordb"
 * PGPASSWORD=<password>
 * PGPORT=5432
 */
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
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
    let thisQuery= 'select pages.body_text from pages where pages.order = ' + INTROPAGE + 'and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })
}

function getTaskPage(scenarioID, callback){
    let thisQuery= 'select pages.body_text from conversation_task, pages where conversation_task.page_id = pages.id and pages.scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })
}

function getConclusionPage(scenarioID, callback){
    let thisQuery= 'select pages.body_text from pages where pages.order = ' + CONCLUSIONPAGE + 'and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })
}

function getAuthenticatedInstructorDashboardSummary(instructorID, callback){
    let thisQuery= 'select scenario.id, scenario.name, scenario.description, scenario.due_date from scenario, partof, instructs where instructs.instructor_id = $1 and instructs.course_id = partof.course_id and partof.scenario_id = scenario.id '
    
    pool.query(thisQuery, [instructorID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function getStudentsSummary(scenarioID, callback){
    let thisQuery = 'select enrolled.student_id, submission.id from scenario, partof, enrolled, submissions where scenario.id = $1 and enrolled.course_id = partof.course_id and partof.scenario_id = scenario.id and submissions.scenario_id = scenario.id and submissions.user_id = enrolled.student_id'

    pool.query(thisQuery, [instructorID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

async function getReflectResponse(studentID, scenarioID, pageOrder) {
    const client = await pool.connect();
    let testIDExistenceQuery = 'SELECT users.id, scenario.id FROM users, scenario WHERE users.id=$1 AND scenario.id=$2'
    let getReflectQuery = 'SELECT prompt_response.response, prompt_response.prompt_num FROM prompt_response, response, submissions, pages WHERE pages.order=$3 AND response.page_id=pages.id AND response.id=prompt_response.id AND response.submission_id=submissions.id AND submissions.user_id=$1 AND submissions.scenario_id=$2 AND pages.scenario_id=$2'
    try {
        await client.query("BEGIN");
        let existenceResult = await client.query(testIDExistenceQuery, [studentID, scenarioID]);
        if (existenceResult.rows.length !== 1) {
            throw new RangeError("IDs invalid");
        }
        let reflectResult = await client.query(getReflectQuery, [studentID, scenarioID, pageOrder]);
		await client.query("COMMIT");
        return reflectResult.rows;
    } catch (e) {
        await client.query("ROLLBACK");
        if (e.message === "IDs invalid") {
            return null;
        } else {
            throw e;
        }
    } finally {
        client.release();
    }
}

function getInitReflectResponse(studentID, scenarioID, callback) {
    getReflectResponse(studentID, scenarioID, INITIAL_REFLECTION).then((result) => callback(result));
}
function getMidReflectResponse(studentID, scenarioID, callback) {
    getReflectResponse(studentID, scenarioID, MIDDLE_REFLECTION).then((result) => callback(result));
}
function getFinalReflectResponse(studentID, scenarioID, callback) {
    getReflectResponse(studentID, scenarioID, FINAL_REFLECTION).then((result) => callback(result));
}

//Get the names, ids, and descriptions of each stakeholder in a scenario
function getStakeholders(scenarioID, callback){
    let thisQuery= 'select stakeholders.name, stakeholders.id, stakeholders.designation, stakeholders.description from stakeholders where stakeholders.scenario_id =$1'
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
        callback(SUCCESS)
    }) 
}

function addCourse(coursePage, courseName, semester, callback){
    let thisQuery= 'insert into courses(webpage, name, semester) values ($1, $2, $3)';
    pool.query(thisQuery, [coursePage, courseName, semester], (error,results) => {
        if (error) {
            throw error
        }
        callback(SUCCESS)
    }) 
}

async function addReflectionResponse(studentID, input, promptNum, scenarioID, timestamp, page_order) {
    const selectPageQuery = 'select id from pages where pages.scenario_id=$1 and pages.order=$2';
    const selectSubmissionsQuery = 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
    const insertResponseQuery = 'INSERT INTO response(submission_id, page_id, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_id) DO UPDATE SET TIME = $3 RETURNING id';
    const insertPromptResponseQuery='insert into prompt_response(id, prompt_num, response) VALUES ($1, $2, $3) ON CONFLICT (id, prompt_num) DO UPDATE SET response = $3';
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const pageSelection = await client.query(selectPageQuery, [scenarioID, page_order]);
        if (pageSelection.rows.length == 0) {
            throw new RangeError("Empty SQL selection");
        }
        let pageID = pageSelection.rows[0].id;
        const submissionSelection = await client.query(selectSubmissionsQuery, [scenarioID, studentID]);
        if (submissionSelection.rows.length == 0) {
            throw new RangeError("Empty SQL selection");
        }
        let submissionID = submissionSelection.rows[0].id;
        // RETURNING clause returns ID at the same time
        const responseCreation = await client.query(insertResponseQuery, [submissionID, pageID, timestamp]);
        let responseID = responseCreation.rows[0].id;
        await client.query(insertPromptResponseQuery, [responseID, promptNum, input]);
        await client.query("COMMIT");
        return true;
    } catch (e) {
        await client.query("ROLLBACK");
        if (e.message === "Empty SQL selection") {
            return false;
        } else {
            throw e;
        }
    } finally {
        client.release();
    }
}


function addInitReflectResponse(studentID, input, promptNum, scenarioID, timestamp, callback) {
    addReflectionResponse(studentID, input, promptNum, scenarioID, timestamp, INITIAL_REFLECTION)
        .then((succeeded) => callback(succeeded ? SUCCESS : ""));
}
function addMidReflectResponse(studentID, input, promptNum, scenarioID, timestamp, callback) {
    addReflectionResponse(studentID, input, promptNum, scenarioID, timestamp, MIDDLE_REFLECTION)
        .then((succeeded) => callback(succeeded ? SUCCESS : ""));
}
function addFinalReflectResponse(studentID, input, promptNum, scenarioID, timestamp, callback) {
    addReflectionResponse(studentID, input, promptNum, scenarioID, timestamp, FINAL_REFLECTION)
        .then((succeeded) => callback(succeeded ? SUCCESS : ""));
}


// scenarioExists(scenarioID)
// .then(function(result){
//     console.log(result);
// })
// .catch(function(err){
//     console.log(err);
// });

// tested. works.
async function scenarioExists(scenarioID){
    //returns True if scenarioID exists
    let thisQuery = 'select scenario.id from scenario where scenario.id = $1'
    const client = await pool.connect();
    let result = null
    try {
        let Qresult = await client.query(thisQuery, [scenarioID])
        result = (Qresult.rows.length != 0)
    } catch (e) {
        console.log("scenarioExists query failed")
        throw e

    } finally {
        client.release()
    }
    return result
}

/*
// helper for createScenario
function addScenario(name, due_date, description, additional_data){
    let thisQuery = 'insert into scenario values(DEFAULT, $1, $2, $3, DEFAULT, $4)'
    pool.query(thisQuery, [name, due_date, description, additional_data], (error, results) => {
        if (error){
            throw error
        }
        return results.rows
    })

}
*/
async function createScenario(courseID, name, due_date, description, additional_data, callback){
    const insertScenarioQuery='insert into scenario values(DEFAULT, $1, $2, $3, DEFAULT, $4) RETURNING id';
    const insertScenarioToCoursesQuesry='insert into partof values($1, $2)';
    const client = await pool.connect();
    let scenarioID = null
    try {
        await client.query("BEGIN");
        
        const scenarioInsert= await client.query(insertScenarioQuery, [name, due_date, description, additional_data]);
        scenarioID = await scenarioInsert.rows[0].id;
        const partofInsert= await client.query(insertScenarioToCoursesQuesry, [courseID, scenarioID]);

        await client.query("COMMIT");
        callback(scenarioID);
    } catch (e) {
        console.log("ROLLBACK")
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
    return scenarioID
}

function setScenarioStatus(scenarioID, scenarioStatus) {
    // We assume the editor backend already checked that this is valid
    // Let PostgreSQL error propagate if invalid parameters passed
    let thisQuery = "UPDATE scenario SET scenario.status = $2 WHERE scenario.id = $1"
    pool.query(thisQuery, [scenarioID, scenarioStatus], (error, results) => {
        if (error) {
            throw error
        } else if (results.rowCount == 0) {
            throw new RangeError(`Scenario with ID ${scenarioID} does not exist`)
        }
    })
}

/*
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
*/

// scenarioPageExists(1, 'PLAIN', scenarioID)
// .then(function(result){
//     console.log(result);
// })
// .catch(function(err){
//     console.log(err);
// });
async function scenarioPageExists(order, type, scenarioID){
    // returns pageID
    let thisQuery = 'select pages.id from pages, scenario where pages.scenario_id = $1 and pages.order = $2 and pages.type = $3'
    let pageID = null;
    const client = await pool.connect();
    try{
        await client.query("BEGIN")
        let pageResult = await client.query(thisQuery, [scenarioID, order, type])
        pageID = await pageResult.rows[0].id
        await client.query("COMMIT")
    } catch (e) {
        await client.query("ROLLBACK")
    } finally {
        client.release()
    }
    console.log(`page = ${pageID}`)
    return pageID
    
    // return new Promise(function(resolve, reject){
    //     pool.query(thisQuery, [scenarioID, order, type], (error, results) => {
    //         if (error){
    //             return reject(error);
    //         }
    //         // return pageID from results
    //         if (results.rows.length != 0){
    //             return resolve(results.rows[0].id);
    //         }
    //         else{
    //             return resolve(-1)
    //         }
    //     })
    // })
}

async function createPage(order, type, body_text, scenarioID){
    // returns pageID if exists, else creates new
    console.log(`running create page with ${[order, type, body_text, scenarioID]}`)
    let thisQuery = 'insert into pages values(DEFAULT, $1, $2, $3, $4) ON CONFLICT (scenario_id, "order") DO UPDATE SET body_text = $3'
    const client = await pool.connect();
    let pageID = -1;
    try{
        await client.query("BEGIN");
        await client.query(thisQuery, [order, type, body_text, scenarioID]);
        await client.query("COMMIT");
        // console.log("____________________________.....___________________________")
        let page = await getPageID(scenarioID, order)
        pageID = await page
    } catch (e) {
        console.log("rollback occured")
        await client.query("ROLLBACK")
        throw e;
    } finally {
        client.release()
        return pageID
    }
}

async function getPageID(scenarioID, order){
    // returns pageID if exists else -1
    let pageIDQuery = "select * from pages where pages.scenario_id = $1 and pages.order = $2"
    const client = await pool.connect()
    let pageID = -1
    try{
        let pageIDresult = await client.query(pageIDQuery, [scenarioID, order])
        pageID = pageIDresult.rows[0].id
    } catch (e) {
        // error handling can be improved
        pageID = -1
    } finally {
        client.release()
    }
    return await pageID
}

// TODO: client BEGIN/COMMIT/ROLLBACK does not have intended effect
// Helper functions allocate their own clients
// The helpers may need to take an allocated client as a parameter
async function addIntroPage(scenarioID, text, callback){
    console.log(`adding intro page to ${scenarioID}`)
    const client = await pool.connect();
    let pageID = -1
    try{
        await client.query("BEGIN");
        if (await scenarioExists(scenarioID)){
            let page = await createPage(INTROPAGE, TYPE_PLAIN, text, scenarioID)
            pageID = await page
            await client.query("COMMIT");
            console.log("intro page addition transaction complete!")
        }
        else{
            throw RangeError("scenario does not exist")
        }
    } catch (e) {
        console.log("rollback occured")
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();

    }
    callback(SUCCESS)
    console.log(`added page with page ID = ${await pageID}`)
    return  await pageID
    
}


async function addInitReflectPage(scenarioID, body_text, prompts, callback){
    addReflectPage(scenarioID, body_text, prompts, INITIAL_REFLECTION).then((result) => callback(result));
}

async function addMidReflectPage(scenarioID, body_text, prompts, callback){
    addReflectPage(scenarioID, body_text, prompts, MIDDLE_REFLECTION).then((result) => callback(result));
}

async function addFinalReflectPage(scenarioID, body_text, prompts, callback){
    addReflectPage(scenarioID, body_text, prompts, FINAL_REFLECTION).then((result) => callback(result));
}

async function addReflectPage(scenarioID, body_text, prompts, ORDER){
    let thisQuery = 'insert into prompt values($1, $2, $3)';
    let pageID = -1
    const client = await pool.connect();
    try{
        await client.query("BEGIN");
        if (await scenarioExists(scenarioID)){
            pageID = await createPage(ORDER, TYPE_PROMPT, body_text, scenarioID)
            for (let p = 0; p < prompts.length; p++){
                await client.query(thisQuery, [pageID, prompts[p], p+1]);
            }
            await client.query("COMMIT");
        }
        else{
            throw error;
        }
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally{
        client.release();
    }
    return pageID
}


async function addConvTaskPage(scenarioID, body_text, convLimit, callback){
    // check scenario exists
    // upsert final reflect page
    let thisQuery = 'insert into conversation_task values($1, $2)'
    let pageID = -1
    const client = await pool.connect()
    try {
        client.query("BEGIN")
        if (await scenarioExists(scenarioID)){

            // create page object (checks for conflicts)
            pageID = await createPage(CONVERSATION, TYPE_CONV, body_text, scenarioID)
            //TODO: upsert new limit count?
            await client.query(thisQuery, [pageID, convLimit])

            await client.query("COMMIT")
        } else {
            // TODO return InvalidScenarioError
            throw error;
        }
    } catch (e) {
        await client.query("ROLLBACK")
        throw e
    } finally {
        client.release()
    }
    return pageID
}

function addConclusionPage(scenarioID, text, callback){
    //check scenario exists
    // upsert intro page
    if (scenarioExists(scenarioID)){
        // create page object - plain-page when no prompt linked
        let pageID = createPage(CONCLUSIONPAGE, TYPE_PLAIN, text, scenarioID)
        callback(SUCCESS)
    }
    else{
        // TODO return InvalidScenarioError
        throw RangeError(`ScenarioID ${scenarioID} does not exist`)
    }
}


async function addStakeholder(scenarioID, name, designation, description, callback){
    // check scenario exists
    // check conversation task page exists (create if does not exist?)
    // insert stakeholder
    let thisQuery = 'insert into stakeholders values(DEFAULT, $1, $2, $3, \'<empty>\' , $4, $5) returning id;'
    const client = await pool.connect()
    let stakeholderID = -1
    try {
        await client.query("BEGIN")
        if (await scenarioExists(scenarioID)){
            // create page object (checks for c)
            let conv_task_pageID = await getPageID(scenarioID, CONVERSATION)
            if (conv_task_pageID === -1) throw RangeError(`conversation task page does not exist for scenarioID ${scenarioID}`);
            //create conversation_task object
            let result = await client.query(thisQuery, [name, designation, description, scenarioID, conv_task_pageID])     
            stakeholderID = await result.rows[0].id
            console.log(`adding stakeholder with ID = ${stakeholderID}`);
            await client.query("COMMIT")

        }
        else{
            throw RangeError(`scenarioID ${scenarioID} does not exist`);
        }
    } catch (e) {
        await client.query("ROLLBACK")
        throw e
    } finally {
        client.release()
    }
    callback(SUCCESS)
    if (stakeholderID === -1) throw RangeError('stakeholder ID not found')
    return stakeholderID
}

// helper function for addStakeholder
async function addStakeholderConversations(stakeholderID, conv_ques_text_array){
    // conv_ques_text_array = [[question1, conversation1], [question2, conversation2], ...]
    // TODO check stakeholder exists
    let thisQuery = 'insert into conversation values(DEFAULT, $1, $2, $3)'
    const client = await pool.connect();
    try{
        await client.query("BEGIN")
        // insert conversations from array
        for(let conv of conv_ques_text_array){    
            await client.query(thisQuery, [stakeholderID, conv[0], conv[1]])
        }
        await client.query("COMMIT")
    } catch (e) {
        await client.query("ROLLBACK")
        throw e
    } finally {
        client.release()
    }
    // callback(SUCCESS)
    
}

function addInitActionPage(scenarioID, body_text, QA_array, callback){
    try {
        addActionPage(sceanrioID, INIT_ACTION, body_text, QA_array)
        addMCQ(scenarioID, INIT_ACTION, QA_array)
    } catch (e) {
        console.log("Failed to add InitActionPage")
        throw (e)
    }
    callback(SUCCESS)
}

function addFinalActionPage(scenarioID, body_text, QA_array, callback){
    try {
        addActionPage(sceanrioID, FINAL_ACTION, body_text, QA_array)
        addMCQ(scenarioID, FINAL_ACTION, QA_array)
    } catch (e) {
        console.log("Failed to add FinalActionPage")
        throw (e)
    }
    callback(SUCCESS)

}

async function addActionPage(scenarioID, order, body_text, QA_array){
    try {
        if (await scenarioExists(scenarioID)){
            let pageID = await createPage(order, TYPE_MCQ, body_text, scenarioID)
            addMCQ(scenarioID, FINAL_ACTION, QA_array)
        }
        else{
            throw RangeError(`ScenarioID ${scenarioID} does not exist`);
        }
    } catch (e) {
        console.log("Failed to add final action page")
    }
    return
}

// function addMCQ(scenarioID, )
async function addMCQ(scenarioID, order, QA_array){
    // QA_array = [[Q1, [op1, op2, op3]], [Q2, [op1, op2, op3]]]
    let pageID = await getPageID(scenarioID, order)
    try {
        for (let QA of QA_array){
            let Q_ID = addMCQQuestion(QA[0], pageID)
            addMCQOptions(QA[1], Q_ID)
        }
    } catch (e){
        console.log("failed to add MCQs")
        throw e
    }
    return
}

// may be used as a helper
async function addMCQQuestion(question, mcq_id){
    // TODO check for invalid parameters
    let thisQuery = 'insert into question values(DEFAULT, $1, $2) RETURNING id'
    let questionID = -1
    const client = pool.connect()
    try{
        await client.query("BEGIN")
        let query_result = pool.query(thisQuery, [question, mcq_id])
        questionID = query_result.rows[0].id
        if (questionID === -1) throw RangeError("failed to add question")
        await client.query("COMMIT")
    } catch (e) {
        await client.query("ROLLBACK")
    } finally {
        await client.release()
    }
    return questionID
}

// may be used as a helper
async function addMCQOptions(option_array, question_id){
    // TODO check for invalid parameters
    let thisQuery = 'insert into mcq_option values(DEFAULT, $1, $2)'
    const client = pool.connect()
    try {
        (await client).query("BEGIN")
        for (let option of option_array){
            await client.query(thisQuery, [option, question_id])
        }
        (await client).query("COMMIT")
    } catch (e){
        (await client).query("ROLLBACK")
        throw e
    } finally {
        await client.release()
    }
    return SUCCESS
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

// Replace all these with a single helper taking an order parameter?
function getInitReflectPage(scenarioID, callback){
    let thisQuery= 'select pages.body_text, prompt.prompt, prompt.prompt_num from pages, prompt where pages.id = prompt.page_id and pages.order = '+ INITIAL_REFLECTION +' and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        let response = {}
        if (results.rows.length !== 0) {
            response.prompts = results.rows.map(row => ({
                text: row.prompt,
                id: row.prompt_num
            }))
            response.body_text = results.rows[0].body_text
        }
        callback(response)
    })  
}

function getMidReflectPage(scenarioID, callback){
    let thisQuery= 'select pages.body_text, prompt.prompt, prompt.prompt_num from pages, prompt where pages.id = prompt.page_id and pages.order = '+ MIDDLE_REFLECTION +' and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        let response = {}
        if (results.rows.length !== 0) {
            response.prompts = results.rows.map(row => ({
                text: row.prompt,
                id: row.prompt_num
            }))
            response.body_text = results.rows[0].body_text
        }
        callback(response)
    })  
}

function getFinalReflectPage(scenarioID, callback){
    let thisQuery= 'select pages.body_text, prompt.prompt, prompt.prompt_num from pages, prompt where pages.id = prompt.page_id and pages.order ='+ FINAL_REFLECTION +'and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        let response = {}
        if (results.rows.length !== 0) {
            response.prompts = results.rows.map(row => ({
                text: row.prompt,
                id: row.prompt_num
            }))
            response.body_text = results.rows[0].body_text
        }
        callback(response)
    })  
}




//Returns question IDs as well for getChoices functions

function getActionPageQuestionsAndChoices(scenarioID, pageOrder, callback) {
    let thisQuery='SELECT question.id AS question_id, question.question, mcq_option.id AS option_id, mcq_option.option FROM pages, mcq, question, mcq_option WHERE pages.scenario_id = $1 AND pages.order = $2 AND mcq.page_id = pages.id AND question.mcq_id = mcq.page_id AND mcq_option.question_id = question.id'
    pool.query(thisQuery, [scenarioID, pageOrder], (error,results) => {
        if (error) {
            throw error
        }
        let resultObject = {}
        if (results.rows.length !== 0) {
            // Selected question will be the same across all rows
            resultObject.question_id=results.rows[0].question_id
            resultObject.question=results.rows[0].question
            resultObject.mcq_choices_id=results.rows.map((row) => row.option_id)
            resultObject.mcq_choices=results.rows.map((row) => row.option)
        }
        callback(resultObject)
    })
}
function getInitActionPageQuestionsAndChoices(scenarioID,callback){
    getActionPageQuestionsAndChoices(scenarioID, INIT_ACTION, callback);
}

function getFinalActionPageQuestionsAndChoices(scenarioID,callback){
    getActionPageQuestionsAndChoices(scenarioID, FINAL_ACTION, callback);
}

async function addMCQResponse(studentID, questionID, choiceID, scenarioID, timestamp, page_order){
    const selectPageQuery = 'select id from pages where pages.scenario_id=$1 and pages.order=$2';
    const selectSubmissionsQuery = 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
    const insertResponseQuery = 'INSERT INTO response(submission_id, page_id, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_id) DO UPDATE SET TIME = $3 returning id';
    const IDExistenceQuery = 'SELECT response.id, question.id, mcq_option.id FROM response, question, mcq_option WHERE response.id=$1 AND question.id=$2 AND mcq_option.id=$3'
    const insertMCQResponseQuery='INSERT INTO mcq_response(id, question_id, choice_id) VALUES($1, $2, $3) ON CONFLICT (id, question_id) DO UPDATE SET choice_id=$3;';
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        const submissionSelection = await client.query(selectSubmissionsQuery, [scenarioID, studentID]);
        if (submissionSelection.rows.length === 0) {
            await client.query("ROLLBACK");
            return "scenario/status ID error";
        }
        let submissionID = submissionSelection.rows[0].id;
        const pageSelection = await client.query(selectPageQuery, [scenarioID, page_order]);
        let pageID = pageSelection.rows[0].id;
        // RETURNING clause returns ID at the same time
        const responseCreation = await client.query(insertResponseQuery, [submissionID, pageID, timestamp]);
        let responseID = responseCreation.rows[0].id;
        let existenceQueryResult = await client.query(IDExistenceQuery, [responseID, questionID, choiceID]);
        if (existenceQueryResult.rows.length === 0) {
            await client.query("ROLLBACK")
            return "response/question/choice ID error"
        }
        await client.query(insertMCQResponseQuery, [responseID, questionID, choiceID]);
        await client.query("COMMIT");
        return SUCCESS;
    } catch (e) {
        await client.query("ROLLBACK");
        throw e;
    } finally {
        client.release();
    }
}

function addInitActionResponse(studentID, questionID, choiceID, scenarioID, timestamp, callback){
    addMCQResponse(studentID, questionID, choiceID, scenarioID, timestamp, INIT_ACTION).then((status_string) => callback(status_string));
}
function addFinalActionResponse(studentID, questionID, choiceID, scenarioID, timestamp, callback){
    addMCQResponse(studentID, questionID, choiceID, scenarioID, timestamp, FINAL_ACTION).then((status_string) => callback(status_string));
}


function convertToCSV(objArray) {
    console.log("getting CSV")
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    console.log(array)
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }
    console.log(str)
    return str;
}

// helper for version control
async function getScenarioCSV(scenarioID, callback){
    // returns CSV string for a scenario
    // let scenario_query = "select * from scenario where scenario.id = $1"
    // let pages_query = "select * from pages"
    let everything = 
        "select * from "+
        "scenario " +
        "left join pages on scenario.id = pages.scenario_id "+
        "left join prompt on prompt.page_id = pages.id " +
        "left join conversation_task on conversation_task.page_id = pages.id  " + 
        "left join stakeholders on stakeholders.scenario_id = scenario.id " +
        "left join conversation on conversation.stakeholder_id = stakeholders.id " +
        "left join score on score.stakeholder_id = stakeholders.id " +
        "left join issues on issues.id = score.issue_id " +
        "left join mcq on mcq.page_id = pages.id " +
        "left join question on question.mcq_id = mcq.page_id " +
        "left join mcq_option on mcq_option.question_id = question.id " +
        "where scenario.id = $1 "
    let scenario_cols = "scenario.id, scenario.name, scenario.due_date, scenario.description, scenario.status, scenario.additional_data "
    let pages_cols = "pages.id, pages.order, pages.type, pages.body_text "
    let prompt_cols = "prompt.page_id, prompt.prompt, prompt.prompt_num "
    let conversation_task_cols = "conversation_task.page_id , conversation_task.conversation_limit " 
    let stakeholders_cols = "stakeholders.id, stakeholders.name , stakeholders.designation, stakeholders.description, stakeholders.conversation, stakeholders.conversation_task_id "
    let conversation_cols = "conversation.id, conversation.stakeholder_id, conversation.question, conversation.conversation_text "
    let score_cols = "score.stakeholder_id, score.issue_id, score.value "
    let issues_cols = "issues.id, issues.name, issues.description "
    let mcq_cols = "mcq.page_id "
    let question_cols = "question.id, question.question, question.mcq_id "
    let mcq_option_cols = "mcq_option.id, mcq_option.option, mcq_option.question_id "

    let scenario_tbl = "select " + scenario_cols + "from scenario where scenario.id = $1"
    let pages_tbl = "select " + pages_cols + "from pages where pages.scenario_id = $1 "
    let prompt_tbl = "select " + prompt_cols + "from pages, prompt where pages.scenario_id = $1 and prompt.page_id = pages.id "
    let conversation_task_tbl = "select " + conversation_task_cols + "from pages, conversation_task where pages.scenario_id = $1 and conversation_task.page_id = pages.id "
    let stakeholders_tbl = "select " + stakeholders_cols + "from stakeholders where stakeholders.scenario_id = $1"
    let conversation_tbl = "select " + conversation_cols + "from stakeholders, conversation where stakeholders.scenario_id = $1 and conversation.stakeholder_id = stakeholders.id"
    let score_tbl = "select " + score_cols + "from score, stakeholders where score.stakeholder_id = stakeholders.id and stakeholders.scenario_id = $1"
    let issues_tbl = "select " + issues_cols + "from score, issues, stakeholders where stakeholders.scenario_id = $1 and score.stakeholder_id = stakeholders.id and issues.id = score.issue_id"
    let mcq_tbl = "select " + mcq_cols + "from pages, mcq where pages.scenario_id = $1 and mcq.page_id = pages.id "
    let question_tbl = "select " + question_cols + "from pages, mcq, question where pages.scenario_id = $1 and mcq.page_id = pages.id and question.mcq_id = mcq.page_id "
    let mcq_option_tbl = "select " + mcq_option_cols + "from pages, mcq, question, mcq_option where pages.scenario_id = $1 and  mcq.page_id = pages.id and question.mcq_id = mcq.page_id and mcq_option.question_id = question.id"
    
    let table_queries = [scenario_tbl, pages_tbl, prompt_tbl, conversation_task_tbl, stakeholders_tbl, conversation_tbl, score_tbl, issues_tbl, mcq_tbl, question_tbl, mcq_option_tbl]
    let table_names = ["scenario", "pages", "prompt", "conversation_task", "stakeholders", "conversation", "score", "issues", "mcq", "question", "mcq_option"]
    let query_results = {}
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        for (let q = 0; q < table_queries.length; q++){
            let query_output = await client.query(table_queries[q], [scenarioID]);
            query_results[table_names[q]]  = query_output.rows;
        }
        await client.query("COMMIT");
    } catch (e) {
        await client.query("ROLLBACK");
        throw (e);
    } finally {
        client.release()
    }
    let _fields = [scenario_cols, pages_cols, prompt_cols, conversation_task_cols, stakeholders_cols, conversation_cols, score_cols, issues_cols, mcq_cols, question_cols, mcq_option_cols]
    let fields = (_fields.map(function(itm) {return itm.split(",").map(function(t) {return t.trim();})}))
    
    fields = [].concat(...fields)
    const transforms = [unwind({ paths: table_names, blankOut: true })];
    const json2csvParser = new Parser({ fields, transforms });
    const csv = json2csvParser.parse(query_results);
    // output needs to be unescaped before saving to csv
    callback(csv)
    return unescape(query_results);
}

 


// helper for version control
function loadScenarioCSV(scenario_csv_string){
    let transpose = m => m[0].map((x,i) => m.map(x => x[i]))
    let scenario_cols = "scenario.id, scenario.name, scenario.due_date, scenario.description, scenario.status, scenario.additional_data "
    let pages_cols = "pages.id, pages.order, pages.type, pages.body_text "
    let prompt_cols = "prompt.page_id, prompt.prompt, prompt.prompt_num "
    let conversation_task_cols = "conversation_task.page_id, conversation_task.conversation_limit  " 
    let stakeholders_cols = "stakeholders.id, stakeholders.name , stakeholders.designation, stakeholders.description, stakeholders.conversation, stakeholders.conversation_task_id "
    let conversation_cols = "conversation.id, conversation.stakeholder_id, conversation.question, conversation.conversation_text "
    let score_cols = "score.stakeholder_id, score.issue_id, score.value "
    let issues_cols = "issues.id, issues.name, issues.description "
    let mcq_cols = "mcq.page_id "
    let question_cols = "question.id, question.question, question.mcq_id "
    let mcq_option_cols = "mcq_option.id, mcq_option.option, mcq_option.question_id "
    let _fields = [scenario_cols, pages_cols, prompt_cols, conversation_task_cols, stakeholders_cols, conversation_cols, score_cols, issues_cols, mcq_cols, question_cols, mcq_option_cols]
    let fields = (_fields.map(function(itm) {return itm.split(",").map(function(t) {return t.trim();})}))
    fields_flat = [].concat(...fields)
    console.log(fields)
    let csv_as_array = []
    csvtojson({
        output: "csv",
        delimiter: 'auto',
        noheader: false,
        headers: fields_flat,
    })
    .fromString(scenario_csv_string.replace(/\\n/g, '\n').replace(/\\"/g, '"'))
    .then((ar) =>{
    // console.log(transpose(ar))
    return transpose(ar)
    })
    .then((ar) =>{
        replicateScenario(ar)
    })

    return


}

async function replicateScenario(csv_as_array){
    let temp_callback = (f) => {console.log(f)}
    let transpose = m => m[0].map((x,i) => m.map(x => x[i]))
    let data = []
    for(let col of csv_as_array){
        data = data.concat([col.filter(e => e)])
        
    }
    console.log(data)

    // return
    // creates new scenario using csv_array
    console.log(`vals = ${[data[1][0], data[2][0], data[3][0], data[5][0]]}`)
    // create scenario
    let scenarioID = await createScenario(1, data[1][0], data[2][0], data[3][0], data[5][0], temp_callback ) //data[4][0] is status
    console.log(scenarioID)
    // TODO find scenarioID of new scenario and update the variable below

    // intro
    // console.log(`index = ${data[9][0]}`)
    console.log(`index = ${data[9][(data[7].indexOf(INTROPAGE.toString()))]}`)

    // return
    await addIntroPage(scenarioID, data[9][(data[7].indexOf(INTROPAGE.toString()))], temp_callback) // ideally use index of order=1 from data[7]
    
    // 6 = pageid
    // 7 = page order
    //
    // 9 = body text

    // Initial reflection
    let prompt_indices = data[10].map((e, i) => e === data[6][(data[7].indexOf(INITIAL_REFLECTION.toString()))] ? i : '').filter(String)
    let body_text = data[9][(data[7].indexOf(INITIAL_REFLECTION.toString()))]
    await addInitReflectPage(scenarioID, body_text, prompt_indices.map((e)=>{return data[11][e]}), temp_callback)

    // mid reflection
    prompt_indices = data[10].map((e, i) => e === data[6][(data[7].indexOf(MIDDLE_REFLECTION.toString()))] ? i : '').filter(String)
    body_text = data[9][(data[7].indexOf(MIDDLE_REFLECTION.toString()))]
    await addMidReflectPage(scenarioID, body_text, prompt_indices.map((e)=>{return data[11][e]}), temp_callback)

    // final reflection
    prompt_indices = data[10].map((e, i) => e === data[6][(data[7].indexOf(FINAL_REFLECTION.toString()))] ? i : '').filter(String)
    body_text = data[9][(data[7].indexOf(FINAL_REFLECTION.toString()))]
    await addFinalReflectPage(scenarioID, body_text, prompt_indices.map((e)=>{return data[11][e]}), temp_callback)



    // 21, 22, 23, 24 (id, stake, ques, conv)
    body_text = data[9][(data[7].indexOf(CONVERSATION.toString()))]
    await addConvTaskPage(scenarioID, body_text, data[14][0], temp_callback)
    for (let i  = 0; i < data[15].length; i++){
        let stakeholderID = await addStakeholder(scenarioID, data[16][i], data[17][i], data[18][i], temp_callback)
        let question_indices = data[23].map((e, i) => e === data[21][(data[22].indexOf(stakeholderID.toString()))] ? i : '').filter(String)
        let conv_text_indices = data[24].map((e, i) => e === data[21][(data[22].indexOf(stakeholderID.toString()))] ? i : '').filter(String)
        let ques_arr = question_indices.map((e) => {return data[23][e]})
        let txt_arr = conv_text_indices.map((e) => {return data[24][e]})
        // transpose so that all questions are in a column and all answers in another
        let conv_ques_text_array = transpose([ques_arr, txt_arr])
        addStakeholderConversations(stakeholderID, conv_ques_text_array)
    }
    return
    // Initial Action
    // get page id from data[6] of page with order = INITACTION from data[7]
    addInitActionPage(scenarioID, body_text, QA_array, callback)


    addMCQ(scenarioID, order, QA_array)


    // Conversations
    addConvTaskPage(scenarioID, body_text, convLimit, callback)
    addStakeholder(scenarioID, name, designation, description, callback)
    addStakeholderConversations(stakeholderID, conv_ques_text_array)

    // Middle Reflection
    addMidReflectPage(scenarioID, body_text, prompts, callback)

    // addFinalActionPage
    addFinalActionPage(scenarioID, body_text, QA_array, callback)
    addMCQ(scenarioID, order, QA_array)

    // addFinalReflectPage
    addFinalReflectPage(scenarioID, body_text, prompts, callback)

    // addConclusionPage
    addConclusionPage(scenarioID, text, callback)

}

async function getMCQResponse(pageOrder,submissionID, questionID){
    const thisQuery='select response.*, mcq_response.* from response, mcq_response, pages where pages.order=$1 AND response.page_num=pages.id AND response.submission_id=$2 AND response.id=mcq_response.id AND mcq_response.question_id=$3'
    const client = await pool.connect();
    try {
        const queryReturn= await client.query(thisQuery, [pageOrder, submissionID, questionID]);
        let mcqResponse=queryReturn.rows[0];
        return mcqResponse;
    } catch (e) {
        throw e;

    } finally {
        client.release();
    }
}
function getInitActionResponse(submissionID, questionID, callback){
    getMCQResponse(INIT_ACTION,submissionID, questionID).then((result) => callback(result));
}

function getFinalActionResponse(submissionID, questionID, callback){
    getMCQResponse(FINAL_ACTION,submissionID, questionID).then((result) => callback(result));
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
    getConclusionPage,
    getTaskPage,
    getAuthenticatedInstructorDashboardSummary,
    getStudentsSummary,
    getInitReflectResponse,
    getMidReflectResponse,
    getFinalReflectResponse,
    getStakeholders,
    getName,
    getCourseInfo,
    getInstructorInfo,
    addUser,
    addCourse,
    setScenarioStatus,
    addInitReflectResponse,
    addMidReflectResponse,
    addFinalReflectResponse,
    addIntroPage,
    addInitReflectPage,
    addMidReflectPage,
    addFinalReflectPage,
    getInitReflectPage,
    getMidReflectPage,
    getFinalReflectPage,
    addStakeholder,
    addStakeholderConversations,
    addInitActionPage,
    addFinalActionPage,
    addConclusionPage,
    getInitActionPageQuestionsAndChoices,
    getFinalActionPageQuestionsAndChoices,
    addMCQResponse,
    addInitActionResponse,
    addFinalActionResponse,
    getScenarioCSV,
    loadScenarioCSV,
    createScenario,
    getMCQResponse,
    getInitActionResponse,
    getFinalActionResponse
}
