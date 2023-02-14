import crypto from 'crypto';
import fs from 'fs';

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs1',
      format: 'pem'
    }
  });

  fs.writeFileSync('src/id_rsa_pub.pem', keyPair.publicKey);
  fs.writeFileSync('src/id_rsa_priv.pem', keyPair.privateKey);
}

genKeyPair();
