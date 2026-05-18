
import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";
dotenv.config({
   path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit the process with an error code
});




/*

(async ()=> {
    try {
     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
     app.on("error",(error)=>{
        console.error("Error:", error);
        throw error;
     })
     aapp.listen(process.env.PORT,()=>{
        console.log(`Server is running on port ${process.env.PORT}`);
        })

    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
})()
    */