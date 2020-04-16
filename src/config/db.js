
const ip = require("ip");
const mongoose = require('mongoose');

mongoose.connect("mongodb://kambaia:12dejunho@pco-systema-shard-00-00-bz6wp.mongodb.net:27017,pco-systema-shard-00-01-bz6wp.mongodb.net:27017,pco-systema-shard-00-02-bz6wp.mongodb.net:27017/test?ssl=true&replicaSet=pco-systema-shard-0&authSource=admin&retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log(ip.address());
  console.log("Conexão feita com sucesso.");
}).catch((error) => {
  console.log("Erro alguma coisa está mal: ");
})
mongoose.Promise = global.Promise;


module.exports = mongoose;