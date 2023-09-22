import ProductModel from "../models/Products.js";

class ProductController{
    static addProduct = async (req, res) =>{
        const {name , desc , img , price , qty} = req.body;
    
        const tempImg = img ? img : "";
        if(name && desc && price && qty){
            try{
                const doc = new ProductModel({
                    name : name,
                    desc : desc,
                    img : tempImg,
                    price : price,
                    qty : qty
                })
                await doc.save();
                console.log("product : "+doc);
                res.status(200).send({"status":"Success","message":"Product Added Successfully."});
            }catch(err){
                res.status(400).send({"status":"failed","message":"Failed to add product."});
            }
        }else{
            res.status(400).send({"status":"failed","message":"All fields are required."});
        }
    }
    
    static getProducts = async (req, res) =>{
        try{
            const item = await ProductModel.find();
            res.status(200).send({"status" : "success" , "data": item})
        }catch(err){
            console.log("getProduct err : "+err);
            res.status(500).send({"status":"failed","message":"Internal server Error."})
        }
    }
    
    static getProductById = async (req, res) =>{
        try{
            const getItem = await ProductModel.findById(req.params.id);
            if(!getItem){
                res.status(400).send({"status":"failed","message":"Item not found."})
            }else{
                res.status(200).send({"status" : "success" , "ProductItem": getItem})
            }
        }catch(err){
            console.log(err);
            res.status(500).send({"status":"failed","message":"Internal server Error."})
        }
    }
    
    static updateProductById = async (req, res) =>{
        try{
            const updatedItem = await ProductModel.findByIdAndUpdate(req.params.id , req.body,{
                new : true,
            });
            if(!updatedItem){
                res.status(400).send({"status":"failed","message":"Item not found."})
            }else{
                res.status(200).send({"status" : "success" , "UpdatedItem": updatedItem})
            }
        }catch(err){
            console.log(err);
            res.status(500).send({"status":"failed","message":"Internal server Error."})
        }
    }
     
    static deleteProducts = async (req , res) =>{
        try{
            const delItems = await ProductModel.deleteMany({});
            res.status(200).send({"status" : "success" , "message": delItems.deletedCount})
        }catch(err){
            console.log(err);
            res.status(500).send({"status":"failed","message":"Internal server Error."})
        }
    }
    
    static deleteProductById = async (req , res) =>{
        try{
            const delItem = await ProductModel.findByIdAndRemove(req.params.id);
            if(!delItem){
                res.status(400).send({"status":"failed","message":"Item not found."})
            }else{
                res.status(200).send({"status" : "success" , "message": "Product deleted Successfully"})
            }
        }catch(err){
            console.log(err);
            res.status(500).send({"status":"failed","message":"Internal server Error."})
        }
    }
}

export default ProductController;