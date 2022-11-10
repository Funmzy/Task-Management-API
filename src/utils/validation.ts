import Joi from 'joi';
import { IUser, ITask } from './interface';

export const validateUser = (user: IUser) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6).max(16),
    });
    return schema.validate(user);
  };


export const validateTask = (task: ITask) => {
    const schema = Joi.object({
        reporter: Joi.string().required(),
        assignee: Joi.string().required(),
        title: Joi.string().required(),
        description: Joi.string().required(),
        priority: Joi.string().required().valid('Low','Lowest','Medium','High','Highest')
    })
    return schema.validate(task);
}

export const validateUpdateTask = (task: ITask) => {
    const schema = Joi.object({
        reporter: Joi.string(),
        assignee: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        priority: Joi.string().valid('Low','Lowest','Medium','High','Highest')
    })
    return schema.validate(task);
}