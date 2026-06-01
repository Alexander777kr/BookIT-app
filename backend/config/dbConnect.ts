import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    let DB_URI: string = "";

    if (process.env.NODE_ENV === "development")
        DB_URI = process.env.DB_LOCAL_URI!;
    else if (process.env.NODE_ENV === "production") DB_URI = process.env.DB_URI!;
    if (!DB_URI) {
        throw new Error("DB_URI is not defined");
    }

    await mongoose.connect(DB_URI).then(con => console.log("DB Connected", con.connection.host));

};

export default dbConnect;