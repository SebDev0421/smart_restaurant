'use strict'

const express = require('express'),
      app = express.Router(),
      Orders = require('../Models/Orders'),
      Cash = require('../Models/Cash'),
      fs = require('fs'),
      path = require('path')


app.put('/',async(req,res)=>{
    //const BufferImage = fs.readFileSync(path.join(__dirname+'/Images/pizza-napolitana.jpeg'))
    //give order pending 
    
    res.json(await Orders.find({complete:false}))
})

app.put('/addOrder',async(req,res)=>{
    const {order,price} = req.body

    const lastOrder = await Orders.find();
    const sizeOrder = lastOrder.length
    let newSerial = 1
    if(lastOrder[sizeOrder-1].serial === undefined || lastOrder[sizeOrder-1].serial === 'NaN'){
        console.log('begin collection')
        
        const orderDB = new Orders({order:order,serial:newSerial,price:price,complete:false})
        await orderDB.save()
    }else{
        newSerial = parseInt(lastOrder[sizeOrder-1].serial) + 1 
        
        const orderDB = new Orders({order:order,serial:newSerial,price:price,complete:false})
        await orderDB.save()
    }
    res.json({serial:newSerial})
})


app.put('/completeOrder',async(req,res)=>{

    const {_id} = req.body

    await Orders.findByIdAndUpdate(_id,{complete:true})
    
    res.json(await Orders.find({complete:false}))
})

app.put('/addCashOrder',async(req,res)=>{
    const {order,price} = req.body


    const lastOrder = await Cash.find();
    const sizeOrder = lastOrder.length;
    let tokenOut = 1000;

    if(sizeOrder === 0){
        const cash = new Cash({order:order,code:tokenOut,price:price})
        await cash.save()
    }else{
        const tokenIn = parseInt(lastOrder[sizeOrder-1].code)
        tokenOut = tokenIn + 1;
        const cash = new Cash({order:order,code:tokenOut,price:price})
        await cash.save()
    }

    res.json({code:tokenOut})
})

app.put('/searchCashOrder',async(req,res)=>{
  const {code} = req.body
  
  res.json(await Cash.findOne({code:code}))
})

app.put('/completeCash', async (req, res)=>{
    const {code} = req.body
    
    await Cash.findOneAndRemove({code:code})

    res.json({status:'ok'})
})


module.exports = app