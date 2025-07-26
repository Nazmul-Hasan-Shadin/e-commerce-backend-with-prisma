import express from 'express'
import { BannerController } from './banner.controller'
import { fileUpload } from '../../../utils/fileUploader'

const router= express.Router()

router.get('/',BannerController.getBannerFromDb)
router.post('/',fileUpload.multerUpload.single('file'),BannerController.createBanner)
router.post('/:id',fileUpload.multerUpload.single('file'),BannerController.updateBannerIntoDb)


export  const BannerRoutes=router
