const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PROT || 5000;
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      // "https://loginfrom-525ec.web.app",
      "http://localhost:5000",
      "http://localhost:5000",
      // "https://loginfrom-525ec.firebaseapp.com",
    ],
    credentials: true,
  })
);
app.use(express.json());


const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ac-cgkxfia-shard-00-00.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-01.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-02.x9t7sgg.mongodb.net:27017/?ssl=true&replicaSet=atlas-nszs70-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const dataBase = client.db("taskManageMent");
    const db = client.db("taskManagement");
    const tasksCollection = db.collection("tasks");
    const userCollection = db.collection("users");

    // CRUD APIs
    app.post("/tasks", async (req, res) => {
      const task = req.body;
      const result = await tasksCollection.insertOne(tasks);
      res.send(result);
    });

    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.get("/tasks", async (req, res) => {
      const tasks = await tasksCollection.find().toArray();
      res.send(tasks);
    });

    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.delete("/tasks/:id", async (req, res) => {
      const { id } = req.params;
      const result = await tasksCollection.deleteOne({ _id: new ObjectId(id) });
      // io.emit("task_updated");
      res.send(result);
    });
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    app.put("/tasks/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      console.log(id, filter);
      const options = { upsert: true };
      const updatedTask = req.body;
      const edittask = {
        $set: {
          title: updatedTask.title,
          description: updatedTask.description,
          category: updatedTask.category,
        },
      };
      const result = await tasksCollection.updateOne(filter, edittask, options);
      res.send();
    });

    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    app.post("/user", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Task-assingemt is Running");
});

app.listen(port, () => {
  console.log(`Server Is Running Is Prot ${port}`);
});
