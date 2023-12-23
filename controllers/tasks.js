const Task = require('../models/task');

const getAllTask = async (req,res)=>{
    try {
        const tasks = await Task.find({}); 
        res.status(200).send({tasks});
        // res.status(200).send({tasks,amount:tasks.length});
        // res.status(200).send({success:true,data:{tasks,nbHits:tasks.length}});
    } catch (error) {
        res.status(500).json({ msg: error});
    }
};

const createTask = async (req,res)=>{
    try {
        const task = await Task.create(req.body);
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg:error});
    }
};

const getTask = async (req,res)=>{
    try {
        const {id:taskId} = req.params;
        const tasks = await Task.findOne({_id:taskId});
        if(!tasks){
            return res.status(404).json({msg:`No task with id = ${taskId}`});
        }
        res.status(200).json({tasks});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};


const deleteTask = async (req,res)=>{
    try {
        const {id:taskId} = req.params;
        const tasks = await Task.findOneAndDelete({_id:taskId});
        if(!tasks){
            return res.status(404).json({msg:`No task with id = ${taskId}`});
        }
        res.status(200).json({tasks:null,status : 'success'});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

const updateTask = async (req,res)=>{
    try {
        const {id:taskId} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskId},{name:req.body.task,completed:req.body.completed},{
            new:true,
            runValidators:true
        });

        if(!task){
            return res.status(404).json({msg:`No task with id = ${taskId}`});
        }
        res.status(200).json({task});
    } catch (error) {
        res.status(500).json({msg: error});
    }
};

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask
};