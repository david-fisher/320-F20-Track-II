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

async function getIntro(scenarioID){
    try{
        let thisQuery= 'select prompt.prompt from pages, prompt where pages.id = prompt.page_id and pages.order = 1 and scenario_id = $1'
        let results= await pool.query(thisQuery, [scenarioID])
        return results.rows[0].prompt
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function getIntroResponse(studentID, scenarioID){
    try{
        let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=1 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id = ' + studentID + 'and pages.scenario_id =' + scenarioID
        let results= await pool.query(thisQuery)
        return results.rows[0].response
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function getMiddleResponse(studentID, scenarioID){
    try{
        let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=3 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id = ' + studentID + 'and pages.scenario_id =' + scenarioID
        let results= await pool.query(thisQuery)
        return results.rows[0].response
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function getFinalResponse(studentID, scenarioID){
    try{
        let thisQuery= 'select prompt_response.response from prompt_response, response, submissions, pages where pages.order=5 and response.page_id=pages.id and response.id= prompt_response.id and response.submission_id=submissions.id and submissions.user_id = ' + studentID + 'and pages.scenario_id =' + scenarioID
        let results= await pool.query(thisQuery)
        return results.rows[0].response
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

//Get the names, ids, and descriptions of each stakeholder in a scenario
async function getStakeholders(scenarioID){
    try{
        let thisQuery= 'select stakeholders.name, stakeholders.id, stakeholders.description from stakeholders where stakeholders.scenario_id =' + scenarioID
        let results= await pool.query(thisQuery)
        return results.rows;
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
    
}
async function getName(userID){
    try{
        let thisQuery= 'select users.full_name from users where id =' + userID
        let results= await pool.query(thisQuery)
        return results.rows[0].full_name;
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function getCourseInfo(courseID){
    try{
        let thisQuery= 'select webpage, name, semester from courses where id =' + courseID
        let results= await pool.query(thisQuery)
        return results.rows;
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function getCourseInfo(courseID){
    try{
        let thisQuery= 'select webpage, name, semester from courses where id =' + courseID
        let results= await pool.query(thisQuery)
        return results.rows;
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function getInstructorInfo(instructorID){
    try{
        let thisQuery= 'select full_name, email, webpage, course_id from instructs, users where instructs.id =' + instructorID + 'and users.id='+ instructorID
        let results= await pool.query(thisQuery)
        return results.rows;
    }
    catch (ex){
        console.log("FAILURE: " + ex)
    }
}

async function addUser(fullName, email){
    try{
        let thisQuery= 'insert into users(full_name, email) values ($1 , $2)';
        let results= await pool.query(thisQuery, [fullName, email])
        return 1
    }
    catch (ex){
        console.log("FAILURE: " + ex)
        return -1
    }
}

async function addCourse(coursePage, courseName, semester){
    try{
        let thisQuery= 'insert into courses(webpage, name, semester) values ($1, $2, $3)';
        let results= await pool.query(thisQuery, [coursePage, courseName, semester])
        return 1
    }
    catch (ex){
        console.log("FAILURE: " + ex)
        return -1
    }
}

//getCourseInfo(1).then(x => console.log(x))
//getInstructorInfo(4).then(x => console.log(x[0]));
//addCourse('New Course','CS305','F2020').then(x => console.log(x));
pool.end()