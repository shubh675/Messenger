import {prisma} from "../../prisma/index.js"

async function createGroupChat(req,res){
const {participants} = req.body;
if(participants.length>2)

}