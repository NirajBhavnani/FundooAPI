const express = require('express');
const router = express.Router();
const User = require('../Models/user');

router.get('/', (req, res)=>{
    res.send('We are on Users Page');
});

router.post('/', (req, res)=>{
    console.log(req.body);
});
// router.get('/specific', (req, res)=>{
//     res.send('Specific User');
// });

module.exports = router;