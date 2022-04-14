const express = require('express');

const Message = require('../models/messages');
const User = require('../models/users');

const messageRouter = express.Router();

messageRouter.post("/send/:receiverId", async(req,res) => {
    try {
        if(req.isAuth) {

            const date = new Date();

            const messageData = await Message.create({
                sender: req.userId,
                receiver: req.params.receiverId,
                message: req.body.message,
                createdAt: date
            });
            const sender = await User.findByIdAndUpdate(req.userId,{
                $push:{"sentMessages":messageData._id}
            });
            const receiver = await User.findByIdAndUpdate(req.params.receiverId,{
                $push:{'receivedMessages':messageData._id}
            });

            res.send(messageData);
            return;

        }
        else {
            res.send({err:"Please Login"});
            return;
        }
    }
    catch(err) {
        res.send(err);
        return;
    }
})
messageRouter.delete("/delete/:msgId",async(req,res)=>{
    try{
        if(req.isAuth){
            const userData = await User.findById(req.userId)
            const{sentMessages,receivedMessages} = useData;
           const smTemp =  sentMessages.filter(msgId =>req.params.msgId==msgId)
            const data = await Message.findByIdAndDelete(req.params.msgId);
            const msgData = await Message,findById(req.params)
            if(smTemp.length>0){
                const data = await Message.findByIdAndDelete(req.params.msgId)
                const seder = await User.findByIdAndUpdate(req.userId,{$pull:{"sentMessages":req.params.msgId}})
            }

        }else{
            res.send({err:"please login "});
            return;
        }
    }catch(err){
        res.send(err);
        return;
    }
})
module.exports = messageRouter;