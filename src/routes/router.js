const express = require('express')
const router = express.Router()
const controller = require('../controllers/controllers')

router.post('/send',controller.sendeMail)

router.all('/**',async(req,res)=>{
    return res.status(404).send('URL path not found')
})

module.exports = router;
