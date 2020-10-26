// tests architecture

// Your unit test plans for the components, integration test plans where appropriate, and acceptance test plans for the UI components where appropriate. The form of test plans required from each team is a function of their role within their integration track. For example, Front-end UI teams would produce the acceptance test plan.

// we should have an interface that is implemented by the actual pool, and a mock pool for testing purposes.

test('getAllScenarios works', () => {
    const pool = createTestPool();
    // insert 3 scenarios
    // call getAllScenarios
    // ensure you get them back
})

test('getScenarioById works', () => {
    const pool = createTestPool();
    // insert 3 scenarios
    // call getScenarioById with the middle id
    // ensure you get the middle one back
})

// getScenarioById with an id that doesn't exist
// getScenarioById with an invalid/non-integer id
// getScenarioById with more than one matching id

test('createScenario works', () => {
    const pool = createTestPool();
    // ...basically the same logic as getAllScenarios tests? but we'd be testing a different part
})

// createScenario with bad name to make sure SQL is escaped properly
// createScenario with bad stakeholder to make sure SQL is escaped properly
// any other requirements? eg. do name, stakeholder need to be unique?

test('updateScenario works', () => {
    const pool = createTestPool();
    // insert 3 scenarios
    // call updateScenario on the middle one
    // ensure the middle one changed
});

// updateScenario with an id that doesn't exist
// updateScenario with an invalid/non-integer id
// updateScenario with more than one matching id
// updateScenario with bad name
// updateScenario with bad stakeholder
// updateScenario with non-unique name/stakeholder?

test('deleteScenario works', () => {
    const pool = createTestPool();
    // insert 3 scenarios
    // delete the middle one
    // ensure it's deleted
})

// deleteScenario with an id that doesn't exist
// deleteScenario with an invalid/non-integer id
// deleteScenario with more than one matching id
