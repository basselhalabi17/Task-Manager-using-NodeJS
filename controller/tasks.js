const Task = require('../models/task')
const asyncWrapper= require('../middleware/async')
 
//APIs
//asyncWrapper used to eliminate the repeated try catch blocks, but it is the same
const getTasks = asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})
    //res.status(201).json({tasks,amount:tasks.length })
    res.status(201).json({tasks })
})

const createTask = async (req,res)=>{
    try{
        const task = await Task.create(req.body)
        res.status(201).json({task})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const getTask = async (req,res)=>{
    try{
        const task = await Task.findOne({_id:req.params.id})
        if (!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id}`})
        }
        res.status(200).json({task})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const updateTask =async (req,res)=>{
    try{
        const task = await Task.findOneAndUpdate({_id:req.params.id},req.body,{
            new:true,runValidators:true
        })
        if (!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id}`})
        } 
        res.status(200).json({id:req.params.id , data:req.body})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

const deleteTask = async (req,res)=>{
    try{
        const task = await Task.findOneAndDelete({_id:req.params.id})
        if (!task){
            return res.status(404).json({msg:`no task with id: ${req.params.id}`})
        }
        res.status(200).json({task:null,status:'success'})
    }
    catch(error){
        res.status(500).json({msg:error})
    }
}

module.exports={
    getTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}