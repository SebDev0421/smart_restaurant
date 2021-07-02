const mongoose = require('mongoose'),
      schema = mongoose.Schema,
      Orderschema = new schema({
          order: Array,
          serial:String,
          price: String,
          complete: Boolean,
          type:String
      },{
          collection:"orders"
      })


      module.exports = new mongoose.model('Orders',Orderschema);
