//William's first comment
//Q's first comment
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')


//const scenarios = [{id : 1, name : 'Walmart Tech Lab', desc : '', stakeholders: [{name: 'Professor Ron'}]},
//{id : 2, name : 'Uber Eats', desc : '', stakeholders: [{name: 'Professor Sarah'}, {name: 'Company Lawyer'}]}]

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

const router = express.Router()

router.use(function(req, res, next) {
    // do logging
    console.log('API is doing something')
    next() // make sure we go to the next routes and don't stop here
});


router.get('/', (req, res) => {
    res.json({info: 'This is the API'})
})


router.route('/scenarios')

    .get(function(req, res){
        // scenarios = db.getScenarios(studentID)
        // scenarios = db.getScenarios()
        studentID = req.body.studentID
        db.getScenarios(studentID, function(result){
            console.log("scenarios-",result)
            res.status(200).json(result)
        })
        
        console.log("Got all scenarios")
    })  
//use this code as a template

router.route('/scenarios/intro')

    .get(function(req, res){
        // studentID = req.body
        // scenarios = db.getScenarios(studentID)
        scenarioIntro = db.getIntro(scenarioName)
        res.json(scenarioIntro)
    })  


router.route('/scenarios/task')

    .get(function(req, res){
        // studentID = req.body
        // scenarios = db.getScenarios(studentID)
        scenarioTask = db.getTask(scenarioName)
        res.json(scenarioTask)
    })  

router.route('/scenarios/final')

    .get(function(req, res){
        // studentID = req.body
        // scenarios = db.getScenarios(studentID)
        scenarioFinal = db.getFinalAction(scenarioName)
        res.json(scenarioFinal)
    })  

router.route('/scenarios/consequences')

    .get(function(req, res){
        // studentID = req.body
        // scenarios = db.getScenarios(studentID)
        scenarioConsequences = db.getConsequences(scenarioName)
        res.json(scenarioConsequences)
    })  

router.route('/scenarios/scenarioName')
//add get functions for this route


//create routes as needed



router.route('/scenarios/scenarioName/initreflection')

    .post()







// app.get('/scenarios', db.getScenarios)
// app.get('/scenarios/:id', db.getScenraioById)
// app.post('/scenarios/', db.createScenario)
// app.put('/scenarios/:id', db.updateScenario)
// app.delete('/scenarios/:id', db.deleteScenario)

app.use('/api', router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
