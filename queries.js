function Db(pool) {
    this.pool = pool
}

//get all scenarios
Db.getScenarios = (request, response) => {
    this.pool.query('SELECT * FROM scenarios ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Got all scenarios`)
    })
}

//get scenario by id
Db.getScenraioById = (request, response) => {
    const id = parseInt(request.params.id)
  
    this.pool.query('SELECT * FROM scenarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
      console.log(`Got scenario with id: ${request.params.id}`)
    })
}

//create a new scenraio
Db.createScenario = (request, response) => {
    // const name = request.params.name
    // const stakeholder = request.params.stakeholder
    // console.log(name)
    const { name, stakeholder } = request.body
  
    this.pool.query('INSERT INTO scenarios (name, stakeholder) VALUES ($1, $2)', [name, stakeholder], (error, results) => {
      if (error) {
        throw error
      }
      // console.log(results.rows)
      response.status(200).send(`Created scenario with name: ${name} and stakeholder: ${stakeholder}`)
      console.log(`Created scenario with name: ${name} and stakeholder: ${stakeholder}`)
    })
}

//update a scenario
Db.updateScenario = (request, response) => {
    const id = parseInt(request.params.id)
    const { name, stakeholder } = request.body
  
    this.pool.query(
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
Db.deleteScenario = (request, response) => {
    const id = parseInt(request.params.id)
  
    this.pool.query('DELETE FROM scenarios WHERE id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`Deleted scenario with ID: ${id}`)
      console.log(`Deleted scenario with id: ${id}`)
    })
}

const createDb = (pool) => {
    if (!pool) {
      const Pool = require('pg').Pool
      pool = new Pool({
        user: 'goon',
        host: 'localhost',
        database: 'api',
        password: 'enterdb',
        port: 5432,
      })
    }
    return new Db(pool)
}

//export functions
module.exports = {
    createDb
}
