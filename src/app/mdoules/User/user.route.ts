import express from 'express';
import { UserController } from './user.controller';

const router=express()


router.post('/',UserController.createUserIntoDb)



export const UserRoutes=router