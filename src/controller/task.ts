import Task from '../model/taskModel'
import { Request, Response, NextFunction } from 'express';
import {publishToQueue} from '../services/rabbitmq.js'
import socket from '../app'



export const createTask = async (req: Request, res: Response) => {
    try{

        const newTask = {
            userId: req.user?._id,
            reporter: req.body.reporter,
            assignee: req.body.assignee,
            title: req.body.title,
            description: req.body.description,
            priority: req.body.priority
        }
        await publishToQueue('tasks', JSON.stringify(newTask))
        const task = await Task.create(
            newTask
        );
        socket.io.emit('Task created', task)
        res.status(201).json({
          status: 'Successful',
          message: 'Task created',
          task,
        });
    }
    catch (error: any) {
        console.log({ message: error.message });
        
    }
} 


export const updateTask = async (req: Request, res: Response) => {
    try{

        const task = await Task.findOneAndUpdate(
            { userId: req.user?._id },
            {
                ...req.body
            },
            { new: true },
        );
        if(!task){
            return res.status(400).json({
                "message": 'Task not found!',
              })
        }
        res.status(201).json({
          status: 'Successful',
          message: 'Task updated',
          task,
        });
    }
    catch (error: any) {
        console.log({ message: error.message });
        
    }
} 


export const deleteTask = async (req: Request, res: Response) => {
    const userId = req.user?._id;  
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId });
      if (!task) {
        return res.status(400).json({
            "message": 'Task not found!',
          })
      }
      res.status(200).json({
        status: 'Successful',
        message: 'Task deleted',
      });
    };