const Pool = require('pg').Pool
const pool = new Pool({
  user: 'goon',
  host: 'localhost',
  database: 'simulator',
  password: 'enterdb',
  port: 5432,
})

//get all scenarios
/*
const getScenarios = (request, response) => {
    pool.query('SELECT * FROM scenarios ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Got all scenarios`)
    })
}
*/

//functions to test api calls on mock db

function getScenarios(studentID, callback){
  pool.query('SELECT id, name, description FROM scenarios ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
  // console.log(studentID)
  //console.log(results.rows)
  callback(results.rows)  
  })  
}

function getIntro(scenarioID, callback){
  pool.query('SELECT introduction from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    // console.log(scenarioID)
    callback(results.rows)
  })
}

function getInitReflect(scenarioID, callback){
  pool.query('SELECT initialreflection from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    //console.log(scenarioID)
    callback(results.rows)
  })
}

function getTask(scenarioID, callback){
  pool.query('SELECT task from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    // console.log(scenarioID)
    callback(results.rows)
  })
}

function getInitActions(scenarioID, callback){
  pool.query('SELECT initialaction from scenarios where id = $1', [scenarioID], (error,results) => {
    if(error){
      throw error
    }
    //console.log(scenarioID)
    callback(results.rows)
  })
}

function addInitAction(studentID, scenarioID, data, callback){
  // console.log(studentID, data, scenarioID)
  pool.query('UPDATE responses set initalaction = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }

    callback(`Inital action updated for studentID: ${studentID}`)
  })
}

function addInitReflect(studentID, scenarioID, data, callback){
  // console.log(studentID, scenarioID, data)
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
    // console.log(scenarioID)
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
  // console.log(studentID, stakeholder, scenarioID)
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
  // console.log(studentID, data, scenarioID)
  pool.query('UPDATE responses set middlereflection = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }

    callback(`Middle reflection updated for studentID: ${studentID}`)
  })
}

function addFinalAction(studentID, scenarioID, data, callback){
  // console.log(studentID, data, scenarioID)
  pool.query('UPDATE responses set finalaction = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }

    callback(`Final action updated for studentID: ${studentID}`)
  })
}

function addFinalReflection(studentID, scenarioID, data, callback){
  // console.log(studentID, data, scenarioID)
  pool.query('UPDATE responses set finalreflection = $3 where studentid = $1 and scenarioid = $2', [studentID, scenarioID, data], (error, results) => {
    if(error){
      throw error
    }

    callback(`Final reflection updated for studentID: ${studentID}`)
  })
}


/*

//get scenario by id
const getScenraioById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM scenarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Got scenario with id: ${request.params.id}`)
    })
}

//create a new scenraio
const createScenario = (request, response) => {
    // const name = request.params.name
    // const stakeholder = request.params.stakeholder
    // console.log(name)
    const { name, stakeholder } = request.body
  
    pool.query('INSERT INTO scenarios (name, stakeholder) VALUES ($1, $2)', [name, stakeholder], (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows)
      response.status(200).send(`Created scenario with name: ${name} and stakeholder: ${stakeholder}`)
      console.log(`Created scenario with name: ${name} and stakeholder: ${stakeholder}`)
    })
}

//update a scenario
const updateScenario = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, stakeholder } = request.body
  
    pool.query(
      'UPDATE scenarios SET name = $1, stakeholder = $2 WHERE id = $3',
      [name, stakeholder, id],
      (error, results) => {
        if (error) {
          throw error
        }
        response.status(200).send(`Updated scenario with ID: ${id}`)
        console.log(`Updated scenario with ID: ${id}`)
      }
    )
}

//delete a scenario
const deleteScenario = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('DELETE FROM scenarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Deleted scenario with ID: ${id}`)
      console.log(`Deleted scenario with id: ${id}`)
    })
}

*/

//export functions
module.exports = {
    getScenarios,
    getIntro,
    getInitReflect,
    getTask,
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
    addFinalReflection,
    // getScenraioById,
    // createScenario,
    // updateScenario,
    // deleteScenario,
}