import { pcs } from "../../network/database/network.db.js";
let matchFlag = false

//function to update flag for invalid pc names
export function checkDevice (name){

pcs.forEach((pc)=>{
    if (pc.name === name ){
        matchFlag = true
    }
})
return matchFlag;
}