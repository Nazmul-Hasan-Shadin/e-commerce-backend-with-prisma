import express from 'express';
import { ShopController } from './shop.controller';
import auth from '../Auth/auth';
import { Role } from '@prisma/client';


const router=express()


router.post('/create-shop',auth(Role.vendor),ShopController.createShop)



export const ShopRoutes=router