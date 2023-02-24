const mongoose= require("mongoose")
//schema design
const productsSchema= mongoose.Schema({
    name: {
        type: String, 
        required: [true,"Please provide a name of the product"],
        trim: true, //it will remove unnecessary  spaces
        unique: [true, "Name must be unique"], 
        minLength: [3,"Name is too short, must be 3 character"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String, 
        required: [true, "Must have a description" ]
    }, 
    price: {
        type: Number,
        required:  [true, "Price must be"],
        min: [0, "Price can't be negative"]
    }, 
    unit: {
        //for nested objects type:{}
        type: String, 
        required: true, 
        //predefined type of value we use enum
        enum: {            
            values: ['kg', 'litre', 'pcs'],
            message: "unit value cant be excluding kg, litre, pcs"
        },
    },
    quantity: {
        type: Number, 
        required: true, 
        min: [0, "Quantity can't be negative"],
        //custom validator
        validate:{
            validator : (value)=>{
                const isInteger = Number.isInteger(value);
                if(isInteger){
                    return true; 
                }else{
                    return false
                }
            }
        },
        message:"Quantity must be an integer"
    },
    status: {
        type: String, 
        required: true, 
        enum: {
            values: ["in-stock", 'out-of-stock','discontinued' ],
            message: "Status can't be {VALUE}"
        }
    },
    /*
    createdAt:{
        type: Date, 
        default: Date.now,
    },
    updatedAt:{
        type: Date, 
        default : Date.now
    }
    */ // alternative of this time function is timeStamp which is by default available in mongoose option

    //reference schema
    supplier: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "supplier"
    },
    //embedded schema
    categories: [{
        name:{
            type: String, 
            required:true
        }, 
        _id: mongoose.Schema.Types.ObjectId
    }]
}, {
    timestamps: true,
    _id: true
})
// End of schema design

//FLOW -> SCHEMA -> MODEL -> QUERY

//model with naming convention must be at end
//middleware
//this pre hook will work before the data saves to database
productsSchema.pre('save', function (next){
    if(this.quantity==0){
        this.status= "out-of-stock"; 
    }
    next();
})
productsSchema.post('save', function(doc,next){
    console.log("after saving");
    next()
})

//methods -> it will 
productsSchema.methods.logger=function(){
    console.log(`Data saved for ${this.name} `);
}
//

const Product = mongoose.model('Product', productsSchema)

module.exports= Product