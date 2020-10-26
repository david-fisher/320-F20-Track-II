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


app.get('/', (req, res) => {
    res.json({info: 'This is the API'})
})


app.get('/scenarios', db.getScenarios)
app.get('/scenarios/:id', db.getScenraioById)
app.post('/scenarios/', db.createScenario)
app.put('/scenarios/:id', db.updateScenario)
app.delete('/scenarios/:id', db.deleteScenario)

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
