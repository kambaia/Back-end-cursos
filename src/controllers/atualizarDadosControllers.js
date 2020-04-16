module.exports = {
  show_user(req, res) {
      console.log("Olá")
      return res.json({messa: "Estou a ouvir tudo", user: req.userId})
  },
  update_dados_user(req, res) {
      console.log("Olá")
      return res.json({messa: "Estou a ouvir tudo", user: req.userId})
  },
  delete_user(req, res){

  }

};