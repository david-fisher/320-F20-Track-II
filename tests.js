const { createDb } = require('./queries')

// tests architecture

// Your unit test plans for the components, integration test plans where appropriate, and acceptance test plans for the UI components where appropriate. The form of test plans required from each team is a function of their role within their integration track. For example, Front-end UI teams would produce the acceptance test plan.

// the db delegates to the pool object to execute the query.
// when the app runs, it'll use a pg.Pool on port 5432
// we'll use a different port when running tests
const pool = ... // TODO
const db = createDb(pool)

// TODO: make sure jest doesn't run the tests in parallel
// TODO: make sure the pool gets cleared after every test

test('getAllScenarios works', () => {
    const pool = createTestPool()
    const db = createDb(pool)
    // insert 3 scenarios into pool
    // call db.getAllScenarios
    // ensure you get them back
})

test('getScenarioById works', () => {
    const pool = createTestPool()
    const db = createDb(pool)
    // insert 3 scenarios into pool
    // call db.getScenarioById with the middle id
    // ensure you get the middle one back
})

// getScenarioById with an id that doesn't exist
// getScenarioById with an invalid/non-integer id
// getScenarioById with more than one matching id

test('createScenario works', () => {
    const pool = createTestPool()
    const db = createDb(pool)
    // call db.createScenario 3 times
    // ensure pool contains the 3 scenarios
})

// createScenario with bad name to make sure SQL is escaped properly
// createScenario with bad stakeholder to make sure SQL is escaped properly
// any other requirements? eg. do name, stakeholder need to be unique?

test('updateScenario works', () => {
    const pool = createTestPool()
    const db = createDb(pool)
    // insert 3 scenarios into pool
    // call db.updateScenario on the middle one
    // ensure the middle one changed in the pool
})

// updateScenario with an id that doesn't exist
// updateScenario with an invalid/non-integer id
// updateScenario with more than one matching id
// updateScenario with bad name
// updateScenario with bad stakeholder
// updateScenario with non-unique name/stakeholder?

test('deleteScenario works', () => {
    const pool = createTestPool()
    const db = createDb(pool)
    // insert 3 scenarios into pool
    // call db.deleteScenario on the middle one
    // ensure it's deleted from the pool
})

// deleteScenario with an id that doesn't exist
// deleteScenario with an invalid/non-integer id
// deleteScenario with more than one matching id
