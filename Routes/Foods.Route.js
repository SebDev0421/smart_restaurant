'use strict'



const express = require('express'),
      app = express.Router(),
      Menu = require('../Models/Menu'),
      fs = require('fs'),
      path = require('path'),
      multer = require('multer')

      
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

const upload = multer()


app.put('/',async(req,res)=>{
    res.json(await Menu.find())
})

app.put('/toogleVisibility',async(req,res)=>{
    const {_id} = req.body
    console.log(_id)
    
    const data = await Menu.findById(_id)

    let statusActive = data.active

    if(data.active === undefined){
        await Menu.findByIdAndUpdate(_id,{active:false})    
        statusActive = false
    }else{
        statusActive = !statusActive
        await Menu.findByIdAndUpdate(_id,{active:statusActive}) 
    }
    
    
    res.json({status:statusActive})
})


app.put('/addFood',async(req,res)=>{
    const {title,price,desc,type,code,image,active} = req.body

    const menu = new Menu({title,price,desc,type,code,image,active})
    await menu.save()
    res.json({status:'ok'})
})

app.post('/uploadimages',upload.single("file"),async function(req,res,next){
    const { file ,
    body:{
        name
    }
    } = req
    const fileName = file.originalname

    await fs.writeFileSync(`${__dirname}/../Images/${fileName}`,file.buffer)

    res.send('file save as '+ fileName)
})

app.put('/getFoods',async (req,res)=>{
    const {type} = req.body
    console.log(await Menu.find())
    res.json(await Menu.find({type:type,active:true}))
})


app.put('/editFood',async(req,res)=>{
    const {_id,title,price,desc,type,code,image} = req.body

    await Menu.findByIdAndUpdate(_id,{title,price,desc,type,code,image})
    
    res.json({status:'ok'})
})

app.put('/deleteFood',async(req,res)=>{
    const {_id} = req.body

    await Menu.findByIdAndDelete(_id)
    
    res.json({status:'ok'})
})

app.put('/addSuggest', async (req,res)=>{
    const {_id} = req.body

    const data = await Menu.findById(_id)

    let statusActive = data.suggest

    if(data.suggest === undefined){
        await Menu.findByIdAndUpdate(_id,{suggest:false})    
        statusActive = false
    }else{
        statusActive = !statusActive
        await Menu.findByIdAndUpdate(_id,{suggest:statusActive}) 
    }

    res.json({status:statusActive})
})

app.put('/showSuggest', async (req,res)=>{
    res.json(await Menu.find({active:true,suggest:true}))
})

module.exports = app