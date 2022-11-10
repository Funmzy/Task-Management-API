import Task from '../model/taskModel'
import { Request, Response, NextFunction } from 'express';




export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    try{
        console.log(req.user)
        const task = await Task.create(
            {
                userId: req.user?._id,
                reporter: req.body.reporter,
                assignee: req.body.assignee,
                title: req.body.title,
                description: req.body.description,
                priority: req.body.priority
            }
        );
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


export const updateTask = async (req: Request, res: Response, next: NextFunction) => {
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


export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
      const task = await Task.findOneAndDelete({ _id: req.params.id });
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