const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
var addToCart = {};

var CartItems = [
    { "id": 1, "nameOfVegetable": "Tomato", "price": 40, "image": "logo", "numberOfKg": 1 },
    { "id": 2, "nameOfVegetable": "Potato", "price": 60, "image": "logo", "numberOfKg": 1 },
    { "id": 4, "nameOfVegetable": "Beans", "price": 50, "image": "logo", "numberOfKg": 1 },
    { "id": 3, "nameOfVegetable": "Onion", "price": 80, "image": "logo", "numberOfKg": 1 },
    { "id": 5, "nameOfVegetable": "Ladies Finger", "price": 45, "image": "logo", "numberOfKg": 1 },
]

app.get("/", (request, response) => {
    console.log("Api Call");
    if (response.statusCode === 200) {
        return response.send(CartItems);
    } else {
        return response.json("Error")
    }
});

app.post("/post", (request, response) => {
    if (response.statusCode === 200) {
        var data = request.body;
        CartItems.forEach((e) => {
            if (e.id === data.id) {
                var id = data.id;
                addToCart[data.id] = e;
            }
        })
        return response.json(addToCart);
    } else {
        return response.json("Error");
    }
});

app.get("/getCartItems", (request, response) => {
    if (response.statusCode === 200) {
        return response.json(addToCart);
    } else {
        return response.json(response.statusCode);
    }
});

app.post("/postIncrement", (request, response) => {
    if (response.statusCode === 200) {
        let data = request.body;
        console.log("data", data);

        if (data.action) {
            CartItems.map((e) => {
                if (data.id == e.id) {
                    console.log("numberofKg = ", e.numberOfKg);
                    e.numberOfKg = e.numberOfKg + 1;
                    addToCart[e.id] = e;
                    return e.numberOfKg;
                }
            });
        } else {
            CartItems.map((e) => {
                if (e.numberOfKg > 1) {
                    if (data.id == e.id) {
                        console.log("numberofKg = ", e.numberOfKg);
                        e.numberOfKg = e.numberOfKg - 1;
                        addToCart[e.id] = e;
                        return e.numberOfKg;
                    }
                } else {
                    delete addToCart[e.id];
                }

            });
        }
        console.log(CartItems)
        return response.json(addToCart);
    } else {
        return response.json(response.statusCode);
    }
})


app.listen(3000, () => { console.log("Server Started") });
