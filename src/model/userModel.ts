import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../utils/interface';
import validator from 'validator';

  
const UserSchema = new mongoose.Schema({
    id: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
},
)



UserSchema.pre<IUser>('save', async function (next) {
    const user = this;
    if (!this.isModified('password')) {
      return next();
    }
  
    this.password = await bcrypt.hash(this.password as string, 12);
  
    next();
  });

export default mongoose.model<IUser>('User', UserSchema);