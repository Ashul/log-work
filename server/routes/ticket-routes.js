const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticket')

function LoginReq(req, res, next) {
    if (req.userid) {
      next();
    } else {
      return res.status(401).json({ message: 'Unauthorized user!' });
    }
  };
//API to Create Ticket

router.post('/create',(req, res)=>{
    let ticket = new Ticket(req.body)
    ticket.save((err, result)=>{
        if(err){console.log(err)}
        else{res.send(result)}
    })
} )

//API to update Ticket
router.put('/:id/update', LoginReq, (req,res)=>{
    console.log(req.body)
    Ticket.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, status)=>{
        if(err){console.log(err)}
        else{res.send(status)}

    })
})

//API to View Ticket
router.get('/:id/:type', (req,res)=>{
    console.log(req.params.id)
    console.log(req.params.type)
    const data ={
        userid: req.params.id,
        tradetype: req.params.type,
    }
    Ticket.find(data, (err, result)=>{
        if(err){
            return res.json({
                message:err
            })
        }else{
            res.send(result)
        }
    })
} )

router.get('/',(req, res)=>{
    Ticket.find({}, (err, result)=>{
        if(err){console.log(err)}
        else{res.send(result)}
    })
})
//API to view Ticket By Id
router.get('/:id', (req,res)=>{
    console.log('kkk')
    Ticket.find({userid: req.params.id}, (err, result)=>{
        if(err){
            return res.json({
                message:err
            })
        }else{
            res.send(result)
        }
    })
} )



//API to View Ticket By user

router.post('/data',LoginReq, (req, res)=>{

    Ticket.find({userid:req.body.userid}, (err, result)=>{
        if(err){console.log(err)}
        else{
            console.log(result)
            res.send(result)}
    })
})


//API to post answer to ticket

router.put('/:id',LoginReq,(req,res)=>{
    console.log(req.body)
    let answertoTicket= req.body
    Ticket.findById(req.params.id,(err, result)=>{
       if(err){console.log(err)}
       else{
           result.answer.push(answertoTicket)
           result.save((err,resultAnswer)=>{
               if(err){console.log(err)}
               else{res.send(resultAnswer)}
           })
        
       }
     })
})

module.exports = router;