const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://ARTIFY:L89EWqO0X0LaGrKj@cluster0.1ezipje.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const isEmptyObject = (value) =>
  !value || typeof value !== "object" || Object.keys(value).length === 0;

async function run() {
  try {
    await client.connect();
    const db = client.db("ARTIFY");
    const artCollection = db.collection("arts");
    const userCollection = db.collection("users");
    const OrderCollection = db.collection("orders");

    //Arts API
    app.get("/arts", async (req, res) => {
      try {
        const cursor = artCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/arts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await artCollection.findOne({ _id: new ObjectId(id) });
        if (!result) {
          return res.status(404).send({ message: "Artwork not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.patch("/arts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;
        if (!updateData) {
          return res.status(400).send({ message: "Request body is required" });
        }
        const result = await artCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData },
        );
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Artwork not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.post("/arts", async (req, res) => {
      try {
        const newArt = req.body;
        if (isEmptyObject(newArt)) {
          return res.status(400).send({ message: "Request body is required" });
        }
        const result = await artCollection.insertOne(newArt);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/arts/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const result = await artCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Artwork not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    //User API
    app.post("/users", async (req, res) => {
      try {
        const newUser = req.body;
        if (isEmptyObject(newUser)) {
          return res.status(400).send({ message: "Request body is required" });
        }
        const result = await userCollection.insertOne(newUser);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/users", async (req, res) => {
      try {
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid user id" });
        }
        const result = await userCollection.findOne({ _id: new ObjectId(id) });
        if (!result) {
          return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.patch("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid user id" });
        }
        const updateData = req.body;
        if (isEmptyObject(updateData)) {
          return res.status(400).send({ message: "Request body is required" });
        }
        const result = await userCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData },
        );
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/users/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid user id" });
        }
        const result = await userCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "User not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    //Orders API
    app.post("/orders", async (req, res) => {
      try {
        const newOrder = req.body;
        if (isEmptyObject(newOrder)) {
          return res.status(400).send({ message: "Request body is required" });
        }
        const result = await OrderCollection.insertOne(newOrder);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/orders", async (req, res) => {
      try {
        const cursor = OrderCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.get("/orders/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid order id" });
        }
        const result = await OrderCollection.findOne({ _id: new ObjectId(id) });
        if (!result) {
          return res.status(404).send({ message: "Order not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.patch("/orders/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid order id" });
        }
        const updateData = req.body;
        if (isEmptyObject(updateData)) {
          return res.status(400).send({ message: "Request body is required" });
        }
        const result = await OrderCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData },
        );
        if (result.matchedCount === 0) {
          return res.status(404).send({ message: "Order not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    app.delete("/orders/:id", async (req, res) => {
      try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
          return res.status(400).send({ message: "Invalid order id" });
        }
        const result = await OrderCollection.deleteOne({
          _id: new ObjectId(id),
        });
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Order not found" });
        }
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!",
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello ARTIFY!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
