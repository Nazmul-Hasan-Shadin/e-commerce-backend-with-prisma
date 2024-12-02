import express from 'express';

import { FollowerController } from './shopFollow.controller';
import auth from '../Auth/auth';
import { Role } from '@prisma/client';


const router=express()


router.post('/follow',auth(Role.user),FollowerController.followShop)
router.post('/unfollow',auth(Role.user),FollowerController.unfollowShop)

export const FollowerRoutes=router