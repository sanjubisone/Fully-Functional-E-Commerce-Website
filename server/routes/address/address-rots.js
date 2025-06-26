const express=require('express')
const {addAddress,getAllAddresses}=require('../../controllers/address/address-controller')

const router=express.Router()

router.post('/add' , addAddress)
router.get('/get/:userId' , getAllAddresses)

module.exports = router