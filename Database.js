'use strict'

const mongoose = require('mongoose'),
      URI = 'mongodb://localhost/smart-restaurant'

      mongoose.connect(URI)
              .then(()=>{
                  console.log('DB was connect')
              })
              .catch((e)=>{
                  if(e) throw e
              })

mongoose.set('useFindAndModify',true)

module.exports = mongoose