const express = require('express');
const router = express.Router();
const User = require('../Models/user'); //Accessing our created model

//FETCHING ALL THE REGISTERED USERS
router.get('/', async (req, res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.json({message: error});
    }
});

//REGISTERS A USER
router.post('/', async (req, res)=>{
    const user = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        email: req.body.email,
        password: req.body.password
    });

    try{
        const regUser = await user.save() //save returns a promise
        res.json(regUser);
    }catch(err){
        res.json({message: err});
    }

    // another method

    // .then(data=>{
    //     res.json(data); //to show response on the screen
    // })
    // .catch(err=>{
    //     res.json({message: err});
    // })
});

// SPECIFIC USER FETCH
router.get('/:userId', async (req, res)=>{
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (error) {
        res.json({message: error});
    }
});

// DELETE USER
router.delete('/:userId', async (req, res)=>{
    try {
        const delUser = await User.remove({_id: req.params.userId});
        res.json(delUser);
    } catch (error) {
        res.json({message: error});
    }
});

// UPDATE USER
router.patch('/:userId', async (req, res)=>{
    try {
        const updateUser = await User.updateOne({_id: req.params.userId}, {$set: {email: req.body.email}});
        res.json(updateUser);
    } catch (error) {
        res.json({message: error});
    }
});

module.exports = router;