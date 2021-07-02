const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      MenuSchema = new schema({
          title: String,
          price: String,
          desc: String,
          type: String,
          code  : String,
          image : String,
          active: Boolean,
          suggest: Boolean
      },{
          collection:"menu"
      })

    
    
      module.exports = new mongoose.model('Menu',MenuSchema);
