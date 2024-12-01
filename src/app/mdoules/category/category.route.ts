import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../Auth/auth';
import { Role } from '@prisma/client';


const router=express()


router.post('/',auth(Role.admin),CategoryController.createCategory)



export const CategoryRoutes=router