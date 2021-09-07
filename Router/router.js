const express = require('express');
const router = express.Router();
const User = require('../Models/user'); //Accessing our created model

//FETCHING ALL THE REGISTERED USERS
router.get('/', async (req, res)=>{
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error});
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
        res.status(201).json(regUser); //201 means successfully created an object
    }catch(err){
        res.status(400).json({message: err}); //400 means something wrong with user-input not server
    }
});

// SPECIFIC USER FETCH
router.get('/:userId', getUser, async (req, res)=>{
    res.json(res.user);
});

// DELETE USER
router.delete('/:userId', getUser, async (req, res)=>{
    try {
        await res.user.remove();
        res.json({message: "User deleted"});
    } catch (error) {
        res.status(500).json({message: error});
    }
});

// UPDATE USER
router.patch('/:userId', getUser, async (req, res)=>{
    if(req.body.fName != null){
        res.user.fName = req.body.fName;
    }
    if(req.body.lName != null){
        res.user.lName = req.body.lName;
    }
    if(req.body.email != null){
        res.user.email = req.body.email;
    }
    if(req.body.password != null){
        res.user.password = req.body.password;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({message: error});
    }
});

// MIDDLEWARE FUNCTION: To reuse the same code for user-fetch
async function getUser(req, res, next){ //next: if we call this move on to the next section of code
    let user;
    try {
        user = await User.findById(req.params.userId);
        if(user==null){
            return res.status(404).json({message: "Could not find user"}) //404: Could not find anything
        }
    } catch (error) {
        return res.status(500).json({message: error}); //500: Something wrong with server
    }
    res.user = user;
    next();
}

module.exports = router;