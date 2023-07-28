const bcrypt = require("bcrypt");

const HashPassword = async (password) => {
  try {
    const salt = 10;
    const Hash = await bcrypt.hash(password, salt);
    return Hash;
  } catch (error) {
    console.log(error);
  }
};
module.exports = HashPassword;
