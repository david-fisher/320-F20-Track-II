const Pool = require('pg').Pool
const pool = new Pool({
  user: 'jason',
  host: 'localhost',
  database: 'goon',
  password: 'password',
  port: 5432,
})

function getScenarios(studentID, callback){
  pool.query('SELECT id, name, description FROM scenarios ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
  callback(results.rows)
  })
}

function getIntro(scenarioID, callback){
  pool.query('SELECT introduction from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getInitReflect(scenarioID, callback){
  pool.query('SELECT initialreflection from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getTask(scenarioID, callback){
  pool.query('SELECT task from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getStartToGatherInfo(scenarioID, callback){
  pool.query('SELECT starttogatherinfo from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getInitActions(scenarioID, callback){
  pool.query('SELECT initialaction from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function addInitAction(studentID, scenarioID, data, callback){
  pool.query('UPDATE responses set initalaction = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }

    callback(`Inital action updated for studentID: ${studentID}`)
  })
}

function addInitReflect(studentID, scenarioID, data, callback){
  pool.query('UPDATE responses set initialreflection = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error,results) => {
    if(error){
      throw error
    }

    callback(`Initial Reflection updated for studentID: ${studentID}`)
  })
}

function getStakeholders(scenarioID, callback){
  pool.query('select stakeholderid, name, designation, bio from stakeholders where scenarioid = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getStakeholderConvo(scenarioID, stakeholderID, callback){
  pool.query('select conversation from stakeholders where scenarioid = $1 and stakeholderid = $2', [scenarioID, stakeholderID], (error, results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getStakeholderHistory(scenarioID, studentID, callback){
  pool.query('select stakeholderid from responses where scenarioid = $1 and studentid = $2', [scenarioID, studentID], (error, results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getFinalAction(scenarioID, callback){
  pool.query('SELECT finalaction from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getConsequences(scenarioID, callback){
  pool.query('SELECT consequences from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getFinalReflection(scenarioID, callback){
  pool.query('SELECT finalreflection from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getConclusion(scenarioID, callback){
  pool.query('SELECT conclusion from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function addStakeholder(studentID, scenarioID, stakeholder, callback){
  pool.query('UPDATE responses set stakeholderid = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, stakeholder], (error, results) => {
    if(error){
      throw error
    }
    callback(`Stakeholder updated for studentID: ${studentID}`)
  })
}

function getMidReflectPage(scenarioID, callback){
  pool.query('SELECT middlereflection from scenarios where id = $1', [scenarioID], (error, results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function getFeedback(scenarioID, studentID, callback){
  pool.query('select stakeholdername, issue1, issue2 from feedback where scenarioid = $1 and studentid = $2', [scenarioID, studentID], (error, results) => {
    if(error){
      throw error
    }
    callback(results.rows)
  })
}

function addMidReflect(studentID, scenarioID, data, callback){
  pool.query('UPDATE responses set middlereflection = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }
    callback(`Middle reflection updated for studentID: ${studentID}`)
  })
}

function addFinalAction(studentID, scenarioID, data, callback){
  pool.query('UPDATE responses set finalaction = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }
    callback(`Final action updated for studentID: ${studentID}`)
  })
}

function addFinalReflection(studentID, scenarioID, data, callback){
  pool.query('UPDATE responses set finalreflection = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }
    callback(`Final reflection updated for studentID: ${studentID}`)
  })
}

//export functions
module.exports = {
    getScenarios,
    getIntro,
    getInitReflect,
    getTask,
    getStartToGatherInfo,
    getInitActions,
    addInitAction,
    getStakeholders,
    getStakeholderConvo,
    getStakeholderHistory,
    getMidReflectPage,
    getFinalAction,
    getConsequences,
    getFinalReflection,
    getConclusion,
    getFeedback,
    addInitReflect,
    addMidReflect,
    addStakeholder,
    addFinalAction,
    addFinalReflection
}
