const bcrypt = require('bcryptjs');
const db=require('../data/database');
const mongodb = require('mongodb');
class User{
    constructor( email, password,name, postal, userAddress,city){
      this.name=name;
      this.email=email;
      this.password=password;
      this.address={
        streetAddress:userAddress,
        city:city,
        postalCode:postal
      };  
    }
    getUserWithSameEmail(){
      return  db.getDb().collection('users').findOne({email: this.email});
    }
    static  findById(userId){
      const uid = new mongodb.ObjectId(userId);
      return db.getDb().collection('users').findOne({_id:uid},{ projection: {password: 0} });
 
    }
    async existsAlready(){
      const existngUser = await this.getUserWithSameEmail();
      if(existngUser){
        return true;
      }
      else{
        return false;
      }
    }
    async signup(){
      const hashedPassword = await bcrypt.hash(this.password,12);
        await db.getDb().collection('users').insertOne({
            name: this.name,
            email: this.email,
            password: hashedPassword,
            address: this.address
            
        });
    }
    
    hashChangePassword(hashedPassword){
     return  bcrypt.compare(this.password,hashedPassword)
    }
}
module.exports = User