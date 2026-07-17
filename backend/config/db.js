import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sindhukammari0:mrcet_canteen@cluster0.8x9ls.mongodb.net/mrcet_canteen').then(()=>console.log("DB Connected"));

}