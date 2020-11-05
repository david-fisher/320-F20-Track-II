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
function getIntroPage(scenarioID, callback){
    let thisQuery= 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order = 1 and scenario_id = $1'
    pool.query(thisQuery, [scenarioID], (error,results) => {
        if (error) {

            throw error
        }
        callback(results.rows)
    })  
}

function getInitReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=1 and response.page_num=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getMidReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=3 and response.page_num=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getFinalReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=5 and response.page_num=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
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
    let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=1';
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
    let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=5';
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
	addFinalReflectResponse
}
