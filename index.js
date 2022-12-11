const express = require('express')
var cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json())

//username:portfolioDB
//password:FRBfhnB0K5gDKncR




const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.z1xe9fw.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    const projectsCollections = client.db('portfolio').collection('projectsCollection')
    try {
        app.get('/projects', async (req, res) => {
            const query = {}
            const cursor = await projectsCollections.find(query).toArray()
            res.send(cursor)
        })
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id
            console.log(id)
            const query = { _id: ObjectId(id) }
            const cursor = await projectsCollections.findOne(query)
            res.send(cursor)
        })
    }
    finally {

    }
}
run().catch(err => console.log(err))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`PortFolio app listening on port ${port}`)
})