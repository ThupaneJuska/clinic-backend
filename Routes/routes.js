const express = require('express');
const user = require('../Controllers/user');
const router = express.Router();

//Get
router.get('/',user.defaultRoute);
router.get('/get-admin',user.getAdmins);
router.get('/get-meds',user.getMeds);

//Post
router.post('/add-admin',user.addAmin)
router.post('/login',user.adminLogin)
router.post('/add-medication',user.addMedication)
router.post('/change-password/:email',user.change_password)
router.post('/forgot-password',user.forgot_password)
router.post('/verify-code',user.verify_code)

//Update
router.put('/update-meds/:_id',user.updateMeds)

//Delete
router.delete('/delete-med/:_id',user.deleteMed)



module.exports = router;