const bcrypt = require('bcryptjs');

const senhaRecebida = "321";
const hashDoBanco = "$2b$10$R7v.XUXLM03ad.nzgp2VzOQnKqFjDPZDvvScqUqNAsN2j2qkyi5Y2";

bcrypt.compare(senhaRecebida, hashDoBanco)
  .then(result => console.log("Senha válida?", result))
  .catch(err => console.error(err));
