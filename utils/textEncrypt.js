const bcrypt = require("bcrypt")

const textEncryption = async (plainText) => {
  try {
    const hashedText = await bcrypt.hash(plainText, 10)
    return hashedText
  } catch (err) {
    console.log(err, "encyerr")
  }
}

const compareEncryptedText = (plainPassword, dbPassword) => {
  try {
    let isCompared = bcrypt.compare(plainPassword, dbPassword);
    return isCompared
  } catch (err) {
    console.log(err, "encyerr")

  }
}

module.exports = {
  textEncryption,
  compareEncryptedText
};
