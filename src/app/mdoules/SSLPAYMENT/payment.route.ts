import express from 'express'
import { PaymentControllerSSL } from './payment.controller'

const router=express.Router()

router.post('/init-payment/:orderId',PaymentControllerSSL.initPayment)

export const PaymentRoutesSsl=router