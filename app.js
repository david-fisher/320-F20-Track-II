//William's first comment
//Q's first comment

//JASON ON ERROR-CHECK
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./queries')
const isnumber = require('is-number')


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
        // input = JSON.stringify(req.headers)
        // console.log(input)
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(404).json({error: "Invalid scenario ID"})
            console.log("Invalid ID")
            res.end()
        }
        else{
        db.getIntro(scenarioID, function(result){
            // console.log("intro-",result)
            //console.log(result)
            if(result.length == 0){
                res.status(404).json({error: "No scenario found"})
            }
            else{
                res.status(200).json(result)
            }
        })
        console.log("Got scenario introduction")
        }   
    })  


router.route('/scenarios/task')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(404).json({error: "Invalid scenario ID"})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getTask(scenarioID, function(result){
            // console.log("task-",result)
            if(result.length == 0) {
                res.status(404).json({error: "No scenario task found"})
            }
            else{
                res.status(200).json(result)
            }
        })     
        console.log("Got scenario task")
        }
    })  


router.route('/scenarios/initialReflection')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getInitReflect(scenarioID, function(result){
            // console.log("Initial Reflection-", result)
            res.status(200).json(result)
        })

        console.log("Got initial relfection")
    })

//------------------------------------------------------------------------------------------
//      Add put functions like the one below in the appropriate routes
//------------------------------------------------------------------------------------------

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        studentID = req.body.studentID
        data = req.body.data
        db.addInitReflect(studentID, scenarioID, data, function(result){
            res.status(200).send(result)
        })

        console.log("Updated initial relfection")
    })

router.route('/scenarios/initialAction')
    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getInitActions(scenarioID, function(result){
            // console.log("Initial Action-", result)
            res.status(200).json(result)
        })

        console.log("Got initial actions")
    })

router.route('/scenarios/finalAction')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        if(!isnumber(scenarioID)){
            res.status(404).json({error: "Invalid scenario ID"})
            console.log("Invalid ID")
            res.end()
        }
        else {
        db.getFinalAction(scenarioID, function(result){
            // console.log("task-",result)
            if(result.length == 0) {
                res.status(404).json({error: "No scenario final action page found"})
            }
            else{
                res.status(200).json(result)
            }
        })     
        console.log("Got scenario final action page")
        }
    })  

    .put(function(req, res){
        studentID = req.body.studentID
        data = req.body.data
        scenarioID = req.body.scenarioID
        db.addFinalAction(studentID, scenarioID, data, function(result){
            res.status(200).send(result)
        })

        console.log("Updated final action student decision")
    })

router.route('/scenarios/consequences')

    .get(function(req, res){
        scenarioID = req.get('scenarioid')
        studentID = req.get('studentid')
        if(!isnumber(scenarioID) && !isnumber(studentID)){
            res.status(404).json({error: "Invalid scenario ID and student ID"})
            console.log("Invalid ID, Invalid student ID")
            res.end()
        }
        if(!isnumber(scenarioID) && !isnumber(studentID)){
            res.status(404).json({error: "Invalid scenario ID and student ID"})
            console.log("Invalid scenario ID, Invalid student ID")
            res.end()
        }
        else if(!isnumber(scenarioID)) {
            res.status(404).json({error: "Invalid scenario ID"})
            console.log("Invalid scenario ID")
            res.end()
        }
        else if(!isnumber(studentID)) {
            res.status(404).json({error: "Invalid student ID"})
            console.log("Invalid student ID")
            res.end()
        }
        //how to add an additional else if student ID actually exists in database without using the database?
        // - Jason
        else {
        db.getConsequences(scenarioID, studentID, function(result){
            // console.log("task-",result)
            if(result.length == 0) {
                res.status(404).json({error: "No consequences found"})
            }
            else{
                res.status(200).json(result)
            }
        })     
        console.log("Got consequences")
        }
    })  

router.route('/scenarios/stakeholderHistory')

    .get(function(req, res){
        studentID = req.body.studentID
        data = req.body.data
        db.getStakeholderHistory(studentID, data, function(result){
            // console.log("Stakeholder History-", result)
            res.status(200).json(result)
        })

        console.log("Got stakeholder history")
    })

router.route('/scenarios/stakeholders')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getStakeholders(scenarioID, function(result){
            // console.log("Stakeholders-", result)
            res.status(200).json(result)
        })

        console.log("Got all stakeholders")
    })

    .put(function(req, res){
        scenarioID = req.body.scenarioID
        stakeholder = req.body.stakeholder
        studentID = req.body.studentID
        db.addStakeholder(studentID, scenarioID, stakeholder, function(result){
            res.status(200).send(result)
        })

        console.log("Added stakeholder")
    })

router.route('/scenarios/stakeholders/conversation')
   
    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getStakeholdersConvo(scenarioID, function(result){
            // console.log("Stakeholders Conversation-", result)
            res.status(200).json(result)
        })

        console.log("Got stakeholder conversation")
    })

router.route('/scenarios/middleReflection')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getMidReflectPage(scenarioID, function(result){
            // console.log("Middle Reflection-", result)
            res.status(200).json(result)
        })
        
        console.log("Got middle reflection")
    })

    .put(function(req, res){
        studentID = req.body.studentID
        data = req.body.data
        scenarioID = req.body.scenarioID
        db.addMidReflect(studentID, scenarioID, data, function(result){
            res.status(200).send(result)
        })

        console.log("Updated middle reflection")
    })

router.route('/scenarios/finalReflection')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getFinalReflection(scenarioID, function(result){
            // console.log("Final Relfection-", result)
            res.status(200).json(result)
        })

        console.log("Got final reflection")
    })

    .put(function(req, res){
        studentID = req.body.studentID  
        data = req.body.data
        scenarioID = req.body.scenarioID
        db.addFinalReflection(studentID, scenarioID, data, function(result){
            res.status(200).send(result)
        })

        console.log("Updated final reflection")
    })

router.route('/scenario/conclusion')

    .get(function(req, res){
        scenarioID = req.body.scenarioID
        db.getConclusion(scenarioID, function(result){
            // console.log("Conclusion-", result)
            res.status(200).json(result)
        })

        console.log("Got Conclusion")
    })

// router.route('/scenarios/scenarioName')
//add get functions for this route


//create routes as needed








// app.get('/scenarios', db.getScenarios)
// app.get('/scenarios/:id', db.getScenraioById)
// app.post('/scenarios/', db.createScenario)
// app.put('/scenarios/:id', db.updateScenario)
// app.delete('/scenarios/:id', db.deleteScenario)

app.use('/api', router)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
