var env = require('node-env-file');
env(__dirname + '/.env');

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
/*
function getScenarios(studentID, callback){
  pool.query('SELECT id, name, description FROM scenarios ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
  callback(results.rows)  
  })  
}
*/
function getIntro(scenarioID, callback){
    let thisQuery= 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order = 1 and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    })  
}

function getIntroResponse(studentID, scenarioID){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=1 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id = ' + studentID + 'and pages.scenario_id =' + scenarioID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getMiddleResponse(studentID, scenarioID){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=3 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id = ' + studentID + 'and pages.scenario_id =' + scenarioID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getFinalResponse(studentID, scenarioID){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=5 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id = ' + studentID + 'and pages.scenario_id =' + scenarioID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

//Get the names, ids, and descriptions of each stakeholder in a scenario
function getStakeholders(scenarioID){
    let thisQuery= 'select stakeholders.name, stakeholders.id, stakeholders.description from stakeholders where stakeholders.scenario_id =' + scenarioID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}
function getName(userID){
    let thisQuery= 'select users.full_name from users where id =' + userID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getCourseInfo(courseID){
    let thisQuery= 'select webpage, name, semester from courses where id =' + courseID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

async function getCourseInfo(courseID){
    let thisQuery= 'select webpage, name, semester from courses where id =' + courseID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getInstructorInfo(instructorID){
    let thisQuery= 'select full_name, email, webpage, course_id from instructs, users where instructs.id =' + instructorID + 'and users.id='+ instructorID
    pool.query(thisQuery, (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function addUser(fullName, email){
    let thisQuery= 'insert into users(full_name, email) values ($1 , $2)';
    pool.query(thisQuery, [fullName, email], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function addCourse(coursePage, courseName, semester){
    let thisQuery= 'insert into courses(webpage, name, semester) values ($1, $2, $3)';
    pool.query(thisQuery, [coursePage, courseName, semester], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function cb(results){
    console.log(results.rows)
}

getIntro(1, cb)
//getInstructorInfo(4).then(x => console.log(x[0]));
//addCourse('New Course','CS305','F2020').then(x => console.log(x));
pool.end()

