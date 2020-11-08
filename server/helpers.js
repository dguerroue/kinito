module.exports = {
  randomString: function(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  },

  getHtml: function(path, replace) {
    const fs = require('fs');
    let content = fs.readFileSync(path).toString();

    replace.forEach((element) => {
      content = content.replace(element.index, element.value)
    })

    return content
  },

  getPlayer: function(room) {
    return Object.values(room).filter((user) => user.player)
  }
}