const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const JWT = require('jsonwebtoken')
const User = require('../models/user')

// 6Hq4By8PHS63OkBF
//API to Signup User
router.post('/signup', (req, res)=>{


    //check if user exits later

//hash password
let newUser = new User({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password
    // mobile:req.body.mobile,
    // hash:bcrypt.hashSync(req.body.password, 10)
})
console.log(newUser)
//save User
newUser.save((err,user) => {
    // user.hash = undefined;
    if(err){
        res.status(401).json({ message:err });
    }
   else{ res.send(user)}
})
})

//API To Login User with jwt 


router.post('/signin', function(req, res){
    User.findOne({
        email: req.body.email
      }, function(err, user) {
        if (err) throw err;
        if (!user) {
          res.status(401).json({ message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (req.body.password !== user.password) {
                    res.status(401).json({ message: 'Authentication failed. Wrong password.' });
            } else {
            return res.json( {name:user.name, email:user.email, id:user._id});
            }
        }
      });
    
 });
 

//  if (!bcrypt.compare(req.body.password, user.hash)) {
//     res.status(401).json({ message: 'Authentication failed. Wrong password.' });
//   } else {
//     return res.json( {name:user.name, email:user.email, id:user._id, isAdmin:user.isAdmin, token: JWT.sign({ email: user.email, name: user.name, _id: user._id}, 'RESTFULAPIs')});
//   }

//API to get all users
router.get('/all', (req, res)=>{
    User.find({}, (err, user)=>{
        if(err){console.log(err)}
        else{res.send(user)}
    })
})

//API to get user by ID
router.get('/:id', (req, res)=>{
    User.findById(req.params.id, (err, user)=>{
        if(err){console.log(err)}
        else{res.send(user)}
    })
})

//API to delete single user
router.delete('/:id', (req,res)=>{
    User.findByIdAndDelete(req.params.id, (err, result)=>{
        if(err){console.log(err)} // error handlers
        else{res.send("User Deleted")}
    })
})

//API to Update User 
router.put('/:id', (req,res)=>{
    let updateUser = req.body;
    User.findByIdAndUpdate(req.params.id, updateUser, {new:true},(err, user)=>{
        if(err){console.log(err)}
        else{
            res.send(user)
        }
    })
})


module.exports = router