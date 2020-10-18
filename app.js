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
            // console.log("scenarios-",result)
            res.status(200).json(result)
        })
        
        console.log("Got all scenarios")
    })  
//use this code as a template

router.route('/scenarios/intro')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getIntro(scenarioID, function(result){
            // console.log("intro-",result)
            res.status(200).json(result)
        })
        
        console.log("Got scenario introduction")
    })  


router.route('/scenarios/task')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getTask(scenarioID, function(result){
            // console.log("task-",result)
            res.status(200).json(result)
        })
        
        console.log("Got scenario task")
    })  

// mock queries done till this point

router.route('/scenarios/initReflect')

    .get(function(req, res){
        // 
        //
        scenarioID = req.body.scenarioID
        db.getInitReflect(scenarioID, function(result){
            console.log("Initial Reflection-", result)
            res.status(200).json(result)
        })

        console.log("Got initial relfection")
    })

router.route('/scenarios/InitActions')

    .get(function(req, res){
        //
        //
        scenarioID = req.body.scenarioID
        db.getInitActions(scenarioID, function(result){
            console.log("Initial Action-", result)
            res.status(200).json(result)
        })

        console.log("Got initial actions")
    })

router.route('/scenarios/final')

    .get(function(req, res){
        // studentID = req.body
        // scenarios = db.getScenarios(studentID)
        studentID = req.body.studentID
        scenarioID = req.body.scenarioID
        db.getFinalAction(studentID, scenarioID, function(result){
            console.log("Final Action-", result)
            res.status(200).json(result)
        })

        console.log("Got stakeholder history")
    })  

router.route('/scenarios/consequences')

    .get(function(req, res){
        // studentID = req.body
        // scenarios = db.getScenarios(studentID)]
        studentID = req.body.studentID
        scenarioID = req.body.scenarioID
        db.getFinalAction(studentID, scenarioID, data, function(result){
            console.log("Consequences-", result)
            res.status(200).json(result)
        })

        console.log("Got stakeholder history")
    })  

router.route('/scenarios/stakeholderHistory')

    .get(function(req, res){
        // scenarios = db.getScenarios(studentID)
        // scenarios = db.getScenarios()
        studentID = req.body.studentID
        data = req.body.data
        db.getStakeholderHistory(studentID, data, function(result){
            console.log("Stakeholder History-", result)
            res.status(200).json(result)
        })

        console.log("Got stakeholder history")
    })

router.route('/scenarios/stakeholders')

    .get(function(req, res){
        // scenarios = db.getScenarios(studentID)
        // scenarios = db.getScenarios()
        scenarioID = req.body.scenarioID
        db.getStakeholders(scenarioID, function(result){
            console.log("Stakeholders-", result)
            res.status(200).json(result)
        })

        console.log("Got all stakeholders")
    })

router.route('/scenarios/stakeholders/convo')
   
    .get(function(req, res){
        // scenarios = db.getScenarios(studentID)
        // scenarios = db.getScenarios()
        scenarioID = req.body.scenarioID
        db.getStakeholdersConvo(scenarioID, function(result){
            console.log("Stakeholders Conversation-", result)
            res.status(200).json(result)
        })

        console.log("Got stakeholder conversation")
    })

router.route('/scenarios/midReflect')

    .get(function(req, res){
        // scenarios = db.getScenarios(studentID)
        // scenarios = db.getScenarios()
        scenarioID = req.body.scenarioID
        db.getMidReflectPage(scenarioID, function(result){
            console.log("Middle Reflection-", result)
            res.status(200).json(result)
        })
        
        console.log("Got middle reflection")
    })

router.route('/scenario/finalReflection')

    .get(function(req, res){
        //
        //
        scenarioID = req.body.scenarioID
        db.getFinalReflection(scenarioID, function(result){
            console.log("Final Relfection-", result)
            res.status(200).json(result)
        })

        console.log("Got final reflection")
    })

router.route('/scenario/Conclusion')

    .get(function(req, res){
        //
        //
        scenarioID = req.body.scenarioID
        db.getConclusion(scenarioID, function(result){
            console.log("Conclusion-", result)
            res.status(200).json(result)
        })

        console.log("Got Conclusion")
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
