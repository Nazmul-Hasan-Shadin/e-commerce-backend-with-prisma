import express from 'express'
import { PaymentControllerSSL } from './payment.controller'

const router=express.Router()

router.post('/init-payment/:orderId',PaymentControllerSSL.initPayment)



router.post('/validate-payment',PaymentControllerSSL.validatePayment)
router.post('/ipn', PaymentControllerSSL.handleIPN);

export const PaymentRoutesSsl=router