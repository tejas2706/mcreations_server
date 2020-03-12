'use strict'
var BaseService = require("./BaseService.js");
var Model = appGlobals.dbModels;
var modelName = "products";
var _ = require("lodash");
var fs = require("fs")
const csv = require('csvtojson');
const Busboy = require("busboy");
const PromiseB = require("bluebird");

function ProductDetailsService() {
    BaseService.call(this);
}

const model = Model.getModel(modelName);
ProductDetailsService.prototype.getProducts = async function(){
  try{
    let products = await model.find({ }, { hash:0 });
    if(!_.isEmpty(products)){
        return products;
    }else{
        throw {"message":"No products found"};
    }
  }catch(error){
    return error
  }
}

ProductDetailsService.prototype.getProductDetails = async function(productId){
  try{
    let productDetails = await model.findOne({"_id":productId}, {hash:0});
    if(!_.isEmpty(productDetails)){
        return productDetails;
    }else{
        throw {"message":`No productDetails found for productId : ${productId}`};
    }
  }catch(error){
    return error
  }
}

ProductDetailsService.prototype.getProductDetailsByCategory = async function(productId){
  try{
    let productDetails = await model.find({"category":productId}, {hash:0});
    // if(!_.isEmpty(productDetails)){
    //     return productDetails;
    // }else{
        
    // }
    return productDetails;
  }catch(error){
    return error
  }
}

ProductDetailsService.prototype.addProducts = async function(data) {
  try{
    console.log("data", data)
    let productDetails = await model.create(data);
    console.log("productDetails", productDetails)
    if(!_.isEmpty(productDetails)){
        return productDetails;
    }else{
        throw {"message":`ProductDetails not added`};
    }
  }catch(error){
    return error
  }
}

ProductDetailsService.prototype.addProductsBulk = async function(req) {
  try{
    var busboy = new Busboy({headers:req.headers});
    let filename = "hello.csv", headers = [];
    var tempFilePath = "../../"+filename;
    let writeStream = fs.createWriteStream(tempFilePath);
    
    busboy.on("file", function(fieldname, file, filename){
      console.log("Saving file: ", filename);
      file.pipe(writeStream);
    });

    busboy.on("finish", function(){
      console.log("Finished busboy file upload");
    });
    req.pipe(busboy);

    writeStream.on("finish", ()=>{
      writeStream.end();
      csv({
        noheader:false
      })
      .fromFile(tempFilePath)
      .then((allProducts)=>{
        PromiseB.map(allProducts,async (eachProduct)=>{
          await this.addProducts(eachProduct)
        })
        console.log("TCL: allProducts", allProducts)
        return allProducts
      })

    })


  }catch(error){
    console.log("error",error);
    return error
  }
}


ProductDetailsService.prototype.editProduct = async function(body){
console.log("body", body)
    try{
      let updatedProduct = await model.update({_id: body.findBy},{$set: body.productToEdit})
      console.log("updatedProduct", updatedProduct)
      return updatedProduct;
    }catch(error){
      console.log("error", error)
      return error;
    }
}

module.exports = {
    getInst : function (){
        return new ProductDetailsService();
    }
}