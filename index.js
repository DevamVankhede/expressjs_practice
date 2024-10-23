import express from "express";

const app = express();

const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello from Home");
// });
// app.get("/ice-tea", (req, res) => {
//   res.send("what ice tea would you prefer");
// });

// app.get("/youtube", (req, res) => {
//   res.send("youtube.com");
// });

app.use(express.json());

let data = [];

let nextid = 1;

//adding data
app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newdata = { id: nextid++, name, price };
  data.push(newdata);
  res.status(200).send(newdata);
});

//displaying data
app.get("/teas", (req, res) => {
  res.status(200).send(data);
});

//searching data
app.get("/teas/:id", (req, res) => {
  const tea = data.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    return res.status(404).send("tea not found");
  }
  return res.status(200).send(tea);
});

//updating data

app.put("/teas/:id", (req, res) => {
  const id = req.params.id;

  const tea = data.find((a) => a.id === parseInt(id));

  if (!tea) {
    res.status(404).send("not found any data");
  } else {
    const { name, price } = req.body;

    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
  }
});

//deleting data

app.delete("/teas/:id", (req, res) => {
  const index = data.findIndex((t) => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).send("no data");
  }
  data.splice(index, 1);
  return res.status(200).send("Deleted");
});

app.listen(port, () => {
  console.log(`Server is running at port: ${port}..`);
});
