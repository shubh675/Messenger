import {prisma} from "../../prisma/index.js"

async function createSingleChat(req,res){
const {participants} = req.body;
if(participants.length>2)

}