import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import Product from '../models/product.model.js'

dotenv.config();

const app = express();

app.use(express.json());

app.get("/api/products", async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(400).json({ success: true, data: products }); // message: "Products retrieved successfully" });
    }
    catch (error) {
        console.log("Error in get Products: ", error.message)
        return res.status(500).json({ success: false, message: "Server Error" });
    }
});

app.post("/api/products", async (req, res) => {
    const product = req.body;
    if (!product.name || !product.image || !product.price) {
        return res.status(400).json({ success: false, message: "Please provide all fields." })
    }
    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, message: "Product created" });
    }
    catch (error) {
        console.log("Error in create Product: ", error.message);
        res.status(500).json({ success: false, message: "Server error" })
    }
});

app.get("/products", (req, res) => {
    res.send("products is up...");
});

app.listen(3000, () => {
    connectDB();
    console.log("Server started at http://localhost:3000 s");
})

