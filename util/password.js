import bcrypt from 'bcrypt'

 export const hashingPassword = (pass,slt) => {
   
 const log = bcrypt.hashSync(pass, slt);
 return log
 
}
 export const comparePassword = async (pass,usepass)=>{
    const compare =  await bcrypt.compare(pass,usepass);
    return compare
}


 