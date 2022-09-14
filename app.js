const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()

app.use(express.json())

const port = process.env.port || 4000
app.use('/api/v1/tasks',tasks)

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log('Homessspage')
        })
    }
    catch(error){
console.log(error)
    }
}

start()
