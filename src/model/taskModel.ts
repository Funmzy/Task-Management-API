import mongoose from 'mongoose';
import { ITask } from '../utils/interface';


  
const TaskSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    reporter: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
        type: String,
        enum: ['Low', 'Lowest', 'Medium', 'High', 'Highest'],
        required: true,
    },

  },
  {
    timestamps: true,
    versionKey: false,
},
)

export default mongoose.model<ITask>('Task', TaskSchema);