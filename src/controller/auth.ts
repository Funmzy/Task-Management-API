import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/userModel';
import { IUser } from '../utils/interface';
import { config } from '../config/config';

const generateToken = (email: string) => {
    console.log(config.JWT_SECRET_KEY)
    const token = jwt.sign({email}, config.JWT_SECRET_KEY as string, {
      expiresIn: config.JWT_EXPIRES_IN,
    });
  
    return token;
  };


  export const signup = async(req: Request, res: Response, next: NextFunction) => {
    try{

        const newUser = await User.create({
          email: req.body.email,
          password: req.body.password,
        });
        const token = generateToken(newUser.email);
        return res.status(201).json({
            message: 'success',
            token,
            newUser,
          });
    }
    catch (error: any) {
        console.log({ message: error.message });
        
    }

};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    //check if user submitted email and password
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        "message": 'Please provide email and password',
      })
    }
  
    const user: IUser | null = await User.findOne({ email: req.body.email }).select(
      '+password',
    );
    if (!user) {
      return res.status(401).json({
        "message": 'invalid login credentials',
      })
    }
    const match = await bcrypt.compare(req.body.password, user.password as string);
    if (!match) {
      return res.status(401).json({
        "message": 'invalid login credentials',
      })
    }
    const token = generateToken(user.email);
    user.password = undefined;
    res.status(201).json({
      status: 'Login successful!',
      user,
      token,
    });
  };


  export const protectRoute = async (req: Request, res: Response, next: NextFunction) => {
    let token: string | undefined;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
  
    if (!token) {
      return res.status(401).json({
        "message": 'You are not authorized! 🚨',
      })
    }
  
    const decodedToken: any = jwt.verify(token as string, process.env.JWT_SECRET_KEY as string);
    const user = await User.findOne({ email: decodedToken.email });
    req.user = user;
  
    next();
  };