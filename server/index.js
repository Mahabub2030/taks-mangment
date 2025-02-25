const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const port = process.env.PROT || 5000;
const app = express();

app.use(
  cors()
);
app.use(express.json());



// const uri = `mongodb+srv://Tasks-Management:rmz7fy3NqQ9GPlsB@cluster0.x9t7sgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 

 const uri =
   "mongodb://Tasks-Management:rmz7fy3NqQ9GPlsB@ac-cgkxfia-shard-00-00.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-01.x9t7sgg.mongodb.net:27017,ac-cgkxfia-shard-00-02.x9t7sgg.mongodb.net:27017/?ssl=true&replicaSet=atlas-nszs70-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";
   
 MongoClient.connect(uri, function (err, client) {
   const collection = client.db("test").collection("devices");
   // perform actions on the collection object
   client.close();
 });

;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const db = client.db("taskaManagmnets");
    const tasksCollection = db.collection("tasks");
    const userCollection = db.collection("users");

    
    // CRUD APIs
    app.post("/tasks", async (req, res) => {
      const tasks = req.body;
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
