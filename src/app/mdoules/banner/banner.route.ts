import express from 'express'
import { BannerController } from './banner.controller'

const router= express.Router()

router.post('/',BannerController.createBanner)


export  const BannerRoutes=router
