const mongoose = require('mongoose');
const User = require('./User');

mongoose.connect("mongodb://localhost/mongoosetutorial",
    function () {
        console.log("Database connected");
    }, function (err) {
        console.log("Error in connecting database", err);
    });

/**
 * *Create user using 'new' keyword
 */
// const user = new User({name: "Tom", age: 26});
// user.save().then(function(){
//     console.log("User saved");
// });

// *we can use async await format
// async function run() {
//     const user = new User({name: "Tom", age: 26});
//     await user.save();
//     console.log("User saved", user);
// }

// run();

/**
 * *Create using create keyword, we don't need save() func here
 */

// async function run(){
//     const user = await User.create({
//         name: "Dick", 
//         age: 25
//     });
//     console.log("User saved", user);
// }

// run();

/**
 * * Updating name
 */

//  async function run(){
//     const user = await User.create({
//         name: "Dick", 
//         age: 25
//     });
//     user.name = "harry";
//     console.log("User saved", user);
// }

// run();

/**
 * *Adding the more fields 
 */

// async function run() {

//     try{

//         const user = await User.create({
//             name: "Kim",
//             age: 66, //*To test min field in age, it will throw an error
//             email: "Kim@nk.com",
//             hobbies: ["Cycling", "Gyming"],
//             address: {
//                 street: "St Martha",
//                 city: "NY"
//             }
//         });

//         //* testing createdAt immutable flag -> it won't generate any error but the value will not be changed
//         // user.createdAt = 55;
//         // await user.save();
//         console.log("User saved", user);

//     }catch(e){
//         //message field is in e
//         console.log(e.message);
//     }

// }

// run();

/**
 * *Queries
 */

// async function query() {
//     try {

//         // const user = await User.findById("62c08dead46ff3042941c3b6");
//         // const user = await User.find({name: "Kim"});
//         // const user = await User.findOne({name: "Kim"});
//         // const user = await User.exists({name: "Kim"});
//         //*There are many such query methods like update, updateOne etc, please try to avoid it as they won't go through validation

//         // const user = await User.deleteOne({name: "Kim"});
//         // const user = await User.deleteMany({ name: "Kim" });
//         // console.log(user);

//         /**
//          * *Custom Queries
//          */

//         // const user = await User.where("name").equals("Pim");
//         // const user = await User.where("age").gt(5).lt(10).where("name").equals("Kim");
//         // const user = await User.where("age").gt(5).lt(10).limit(2);
//         // const user = await User.where("age").gt(5).lt(10).limit(2).select("name").select("age");

//         //* adding the besfriend and saving it
//         // user[0].bestfriend = "62c1971c4e9afb500a74a8ad";
//         // await user[0].save();

//         //* gets you the bestfriend
//         // const user = await User.where("age").gt(5).lt(10).limit(1);

//         //* we can use populate method to get details of bestfriend
//         const user = await User.where("age").gt(5).lt(10).limit(1).populate("bestfriend");
//         console.log(user);

//     } catch (error) {
//         console.log(error.message);
//     }
// }

// query();

/**
 * Advanced Queries
 */

async function adQuery() {
    try {
        // const user = await User.findOne({ name: "Jim" });

        // user.sayHi();
        //* using statics

        //*using static
        // const user = await User.findByName("Jim");

        //*using query
        //* we can't call byName() on the user directly because we have created a query and not method or statics 
        //* and query is returned only when we do find() or where(), yes we can also use where()
        // const user = await User.find().byName("Jim");
        // const user = await User.where().byName("Jim");

        //* but we can't use find() or where() on methods and static (in this case, specifically to our defined schema)
        // const user = await User.where().findByName("Jim"); //will give an error saying findByName not a func
        // const user = await User.findByName("Jim");


        //* using virtuals
        // const user = await User.findOne({ name: "Kim" });
        // console.log(user);
        // console.log(user.namedEmail);

        //*using middlewares
        
        const user = await User.findOne({ name: "Kim" });
        console.log(user);
        user.age = 28;
        await user.save();
        //*post middleware's output is show after save
        console.log(user);
    } catch (error) {
        console.log(error.message);
    }
}

adQuery();
