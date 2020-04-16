const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.set('useFindAndModify', false);

const userSchema = mongoose.Schema({
    logo: {
        type: String
    },
    nome: {
        type:String,
        maxlength:100,
        required: true
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        select: false,
        minglength: 8,
        required: true
    },
    NivelAcesso: {
       type: String
    },
    createdAt:{
    type: Date,
    default: Date.now
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpire: {
        type: Date,
        select:false,
    },
  },
  {
    toJSON: {
        virtuals:true
    },
});
userSchema.virtual('logo_url').get(function(){
   
    return `http://localhost/files/${this.logo}`
   
});
userSchema.pre('save', async function( next ) {
     const hash = await bcrypt.hash(this.password, 10);
     this.password = hash;
     next();
});
    

const User = mongoose.model('User', userSchema);

module.exports = User;