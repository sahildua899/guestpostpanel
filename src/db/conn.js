const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_LINK).then(()=>{
    console.log("Database Connection Sucessfull")
}).catch((e)=>{
    console.log("Database Connection Error")
}
)