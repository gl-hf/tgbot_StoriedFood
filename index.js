const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const mongoose = require("mongoose");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const Order = require("./models/Order");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

app.post("/api/checkout", async (req, res) => {
    const { items, amount } = req.body;
    let lineItems = [];
    items.forEach((item) => {
        lineItems.push({
            price: item.id,
            quantity: item.quantity
        });
    });

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: "payment",
        success_url: `${process.env.WEB_LINK}success`,
        cancel_url: `${process.env.WEB_LINK}cancel`
    });

    const newOrder = new Order({ products: items.map((i) => ({ title: i.title, quantity: i.quantity })), amount, status: session.status });
    await newOrder.save();

    res.send(
        JSON.stringify({
            url: session.url
        })
    );
});

app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);

app.listen(3000, () => console.log("Listening on port 3000!"));
