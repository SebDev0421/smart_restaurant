const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      Cashschema = new schema({
          order: Array,
          code:String,
          price: String
      },{
          collection:"cash"
      })


      module.exports = new mongoose.model('Cash',Cashschema);