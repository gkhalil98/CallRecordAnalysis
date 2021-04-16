let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let fs = require("fs");
//reading JSON data and parsing it so that it is an object
const records = JSON.parse(fs.readFileSync(__dirname + "/callData.json"));
let url = "mongodb://localhost:27017/meanstack"
const mongooseDbOption = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect(url, mongooseDbOption);
let db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => {
    //Created schema matching JSON data
    let CallSchema = mongoose.Schema({
        _id:Number,
        source:String,
        destination:String,
        sourceLocation:String,
        callDuration:String,
        roaming:String,
        callCharge:String
    });
    //Creating model using schema
    let CallRecord = mongoose.model("", CallSchema, "CallRecords");

    //Writing data to the db
    CallRecord.insertMany(records, (err, result) => {
        if(!err) {
            console.log("Call Records successfully inserted to database!");
        }
        else {
            console.log("An error has occurred while writing to the database!\n" + err);
        }
    });
});

