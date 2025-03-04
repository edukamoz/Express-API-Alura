import mongoose from "mongoose";

async function conectaNaDataBase() {
    mongoose.connect("mongodb+srv://admin:admin123@cluster0.b4l1j.mongodb.net/Livraria?retryWrites=true&w=majority&appName=Cluster0")

    return mongoose.connection
}

export default conectaNaDataBase
