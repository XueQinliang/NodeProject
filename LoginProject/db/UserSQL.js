var UserSQL = {  
    insert:'INSERT INTO users(username,password) VALUE (?,?)', 
    queryAll:'SELECT * FROM users',  
    getUser:'SELECT * FROM users WHERE username=?',
    check:'SELECT * FROM users WHERE username=? and password=?',
    revise:'UPDATE users SET password=? WHERE username=?'
  };
module.exports = UserSQL;