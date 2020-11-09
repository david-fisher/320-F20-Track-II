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
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=1 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getMidReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=3 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
    pool.query(thisQuery,[studentID, scenarioID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getFinalReflectResponse(studentID, scenarioID, callback){
    let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=5 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id =$1 and pages.scenario_id =$2'
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

async function getCourseInfo(courseID, callback){
    let thisQuery= 'select webpage, name, semester from courses where id =$1'
    pool.query(thisQuery,[courseID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function getInstructorInfo(instructorID, callback){
    let thisQuery= 'select full_name, email, webpage, course_id from instructs, users where instructs.id =$1 and users.id=$1'
    pool.query(thisQuery,[instructorID], (error,results) => {
        if (error) {
            throw error
        }
        callback(results.rows)
    }) 
}

function addUser(fullName, email, callback){
    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                    console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        }
        client.query('BEGIN', err => {
            if (shouldAbort(err)) return
            let thisQuery= 'insert into users(full_name, email) values ($1 , $2)';
            client.query(thisQuery,[fullName,email], (err, res) => {
                if (shouldAbort(err)) throw error
                client.query('COMMIT', err => {
                    if (err) {
                        console.error('Error committing transaction', err.stack)
                    }
                    callback("Success")
                })
            })
        })
    })
}

function addCourse(coursePage, courseName, semester, callback){
    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                    console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        }
        client.query('BEGIN', err => {
            if (shouldAbort(err)) return
            let thisQuery= 'insert into courses(webpage, name, semester) values ($1, $2, $3)';
            pool.query(thisQuery, [coursePage, courseName, semester], (error,results) => {
                if (shouldAbort(err)) return
                client.query('COMMIT', err => {
                    if (err) {
                        console.error('Error committing transaction', err.stack)
                    }
                })
                callback(results.rows)
            })
        })
    })
}

function addInitReflectResponse(studentID, input, scenarioID, timestamp, callback){
    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                    console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        }
        client.query('BEGIN',err=>{
            let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=1';
            client.query(thisQuery, [scenarioID], (err,results) => {
                if(shouldAbort(err)) return
                let pageID=results.rows[0].id
                let thisQuery= 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
                client.query(thisQuery, [scenarioID, studentID], (err,results) => {
                    if(shouldAbort(err)) return
                    let submissionID=results.rows[0].id
                    let thisQuery='insert into response(submission_id, page_id, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_id) DO UPDATE SET time = $3'
                    client.query(thisQuery, [submissionID, pageID, timestamp], (err,results) => {
                        if(shouldAbort(err)) return
                        client.query('select id from response where submission_id=$1 and page_id=$2',[submissionID, pageID], (err,results) => {
                            if(shouldAbort(err)) return
                            let responseID=results.rows[0].id
                            let thisQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2'
                            client.query(thisQuery, [responseID, input], (err,results) => { 
                                if(shouldAbort(err)) return
                                client.query('COMMIT', err => {
                                    if(err){
                                        console.error('Error committing transaction', err.stack)
                                    }
                                    callback("Success!")
                                })
                            })
                        })
                    })
                })
            }) 
        })
    })
}

function addMidReflectResponse(studentID, input, scenarioID, timestamp, callback){
    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                    console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        }
        client.query('BEGIN',err=>{
            if(shouldAbort(err)) return
            let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=3';
            client.query(thisQuery, [scenarioID], (error,results) => {
                if(shouldAbort(error)) return
                let pageID=results.rows[0].id
                let thisQuery= 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
                client.query(thisQuery, [scenarioID, studentID], (error,results) => {
                    if(shouldAbort(error)) return
                    let submissionID=results.rows[0].id
                    let thisQuery='insert into response(submission_id, page_id, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_id) DO UPDATE SET time = $3'
                    client.query(thisQuery, [submissionID, pageID, timestamp], (error,results) => {
                        if(shouldAbort(error)) return
                        client.query('select id from response where submission_id=$1 and page_id=$2',[submissionID, pageID], (error,results) => {
                            if(shouldAbort(error)) return
                            let responseID=results.rows[0].id
                            let thisQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2'
                            client.query(thisQuery, [responseID, input], (error,results) => { 
                                if(shouldAbort(error)) return
                                callback("Success!")
                            })
                        })
                    })
                })
            })
        })
    }) 
}

function addFinalReflectResponse(studentID, input, scenarioID, timestamp, callback){
    pool.connect((err, client, done) => {
        const shouldAbort = err => {
            if (err) {
                console.error('Error in transaction', err.stack)
                client.query('ROLLBACK', err => {
                    if (err) {
                    console.error('Error rolling back client', err.stack)
                    }
                    // release the client back to the pool
                    done()
                })
            }
            return !!err
        }
        client.query('BEGIN',err=>{
            if(shouldAbort(err)) return
            let thisQuery= 'select id from pages where pages.scenario_id=$1 and pages.order=5';
            client.query(thisQuery, [scenarioID], (error,results) => {
                if(shouldAbort(error)) return
                let pageID=results.rows[0].id
                let thisQuery= 'select id from submissions where submissions.scenario_id=$1 and submissions.user_id=$2';
                client.query(thisQuery, [scenarioID, studentID], (error,results) => {
                    if(shouldAbort(error)) return
                    let submissionID=results.rows[0].id
                    let thisQuery='insert into response(submission_id, page_id, time) VALUES ($1, $2, $3) ON CONFLICT (submission_id, page_id) DO UPDATE SET time = $3'
                    client.query(thisQuery, [submissionID, pageID, timestamp], (error,results) => {
                        if(shouldAbort(error)) return
                        client.query('select id from response where submission_id=$1 and page_id=$2',[submissionID, pageID], (error,results) => {
                            if(shouldAbort(error)) return
                            let responseID=results.rows[0].id
                            let thisQuery='insert into prompt_response(id, response) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET response = $2'
                            client.query(thisQuery, [responseID, input], (error,results) => { 
                                if(shouldAbort(error)) return
                                callback("Success!")
                            })
                        })
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