const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
});

//* all the validator function works with only save() or create() methods, 
//* other methods such as findAll etc won't work on validations they directly work on database,
//* so for eg, if you try to update the age using findByIdAndUpdate() to -19, it will work and will not throw 
//* any error, so use findById().save() instead or findOne().save() OR use options such as "runValidators: true" with such functions
//* The save() function is generally the right way to update a document with Mongoose. With save(), you get full validation and middleware.
//* Note that update(), updateMany(), findOneAndUpdate(), etc. do not execute save() middleware. 
//* If you need save middleware and full validation, first query for the document and then save() it.
const userSchema = new mongoose.Schema({
    name: String,
    age: {
        type: Number,
        min: 1,
        max: 100,
        //*Custome validator
        validate: {
            validator: function (value) {
                return value % 2 === 0
            },
            message: function (props) {
                return `${props.value} is not an even number`
            }
        }
    },
    /**
     * *Adding some more fields
     */
    email: {
        type: String,
        required: true,
        lowercase: true,
        minLength: 10
    },
    createdAt: {
        type: Date,
        immutable: true, //*immutable flag makes it "no update" field
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    bestfriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User" //* ref tells the mongo that what model the bestfriend refers, here it is the same model i.e User, One of user will be bestfriend of this user
    },
    hobbies: [String],

    // *or we can create a new schema called address and assign that schema to address
    // *major diff is you get a seperate "_id" field if you use new schema and if you don't you won't
    // address: {
    //     street: String,
    //     city: String
    // }
    address: addressSchema
});


/**
 * Adding methods to schema -> this method will be accessbile by each instance of User
 * You can't use the arrow function here, because you need "this" keyword inside the function to refer
 * to selected user, which is not available in arrow function
 */
userSchema.methods.sayHi = function () {
    console.log(`Hi!! My name is ${this.name}`);
}

/**
 * Adding statics to schema -> these statics are availabe on the whole model and not the individual instance
 * They are similar to our normal programming "static"
 */

userSchema.statics.findByName = function (name) {
    //* if "where" is used we can chain the query, but now I don't want to do it as we have our own custom query below

    // return this.where({ name: name });
    return this.find({ name: name });
}

/**
 * Adding a query to schema
 */

userSchema.query.byName = function (name) {
    return this.where({ name: name });
}

/**
 * *Creating Virtuals -> this is a property exist on an individual user virtually which means it doesn't gets
 * *saved in database its only available inside of our code
 */

userSchema.virtual('namedEmail').get(function () {
    return `${this.name}<${this.email}>`
})

/**
 * *Middlewares: This can be used to insert code in between actions such as save, validate remove or update
 * *pre() and post() -> names are self explanatory
 */

//* here I want to do something before save, so using pre and save
userSchema.pre('save', function(next){
    //*we are updating the record whenever there is save call on that record
    this.updatedAt = Date.now();
    next();
})

//* here I want to do something after save, so using post and save, you can't use this, instead a 'doc' user object is sent
userSchema.post('save', function(doc, next){
    doc.sayHi();
    next();
})


const User = mongoose.model("User", userSchema);

module.exports = User;