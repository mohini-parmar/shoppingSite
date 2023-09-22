import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name : {type:String , required : true , trim : true},
    desc : {type:String , required : true , trim : true},
    img : {type : String , required : true , trim : true},
    price : {type:Number , required : true , trim : true},
    qty : {type:Number , required : true , trim : true}
})

const ProductModel = mongoose.model("product",productSchema);

export default ProductModel;