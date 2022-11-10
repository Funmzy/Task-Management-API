import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  id: string;
  email: string;
  password: string|undefined;
}


export interface ITask extends mongoose.Document {
    id: string;
    userId: string;
    reporter: string;
    assignee: string;
    title: string;
    description: string;
    priority: string
}