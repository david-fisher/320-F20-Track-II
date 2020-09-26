//William's first comment
//Q's first comment
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const scenarios = [{id : 1, name : 'Walmart Tech Lab', desc : '', stakeholders: [{name: 'Professor Ron'}]},
{id : 2, name : 'Uber Eats', desc : '', stakeholders: [{name: 'Professor Sarah'}, {name: 'Company Lawyer'}]}]
app.use(bodyParser.json())


//all of these universal http methods or 'parts of the web' are from client perspective
//defining route '/' for server to get a request from the client
app.get('/', (req, res) => {
    res.json(scenarios)
})

//id would normally be something the client would know such as a name or something to that extent
//params id is a string vs a number that is found in our 'database'
app.get('/scenarios/:id', (req, res) => {
    const {id} = req.params
    console.log(id)
    const target = scenarios.filter(s => {
        return s.id == id
    })
    res.send(target)
})
  

app.post('/', (req, res) => {
    console.log(req.body)
    todos.push(req.body)
    res.send(scenarios)
})

app.delete('/scenarios/:id', (req, res) => {
    const {id} = req.params
    const newData = scenarios.filter(s => {
        return s.id != id
    })
    res.send(newData)
})

app.put('/scenarios/:id', (req, res) => {
    const {id} = req.params
    const {name, desc, stakeholders} = req.body
    const found = scenarios.filter(s => {
        return s.id == id
    })
    found[0].name = name
    found[0].desc = desc
    found[0].stakeholders = stakeholders
    res.send(found)
})

app.get('/api', (req,res) => res.json({ msg: 'message' }))
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


