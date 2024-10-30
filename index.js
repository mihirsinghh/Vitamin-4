//imports Express module, allowing us to use Express functionalities to build server
const express = require('express'); 

//create new Express object, which allows us to handle requests made to the Express server
const app = express();

//sets PORT variable, the value of which represents the port number that our server will listen on 
const PORT = 3000;

//tells Express app to use express.json() middleware, which parses incoming JSON data
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



let todos = []; //stores to-do items

//this endpoint sends to-do list back to client upon receiving GET request at /todos URL
app.get('/todos', (req, res) => {
    res.json(todos);
});

//this endpoint adds a new task to the to-do list upon receiving a POST request at the /todos URL
app.post('/todos', (req, res) => {
    const {task} = req.body; //accesses the task description from the request object
    const newToDo = {id: todos.length + 1, task}; //create new JSON object "newToDo" with attributes "id" and "task", where "id" corresponds to the task number that this task will be on the to-do list and "task" has the string value of its description
    todos.push(newToDo); //adds new to-do object to list
    res.status(201).json(newToDo);
});

//this endpoint updates an exist item upon receiving a PUT request at the /todos/:id URL, where :id is a route parameter whose argument is passed dynamically by the client, representing the ID of the task that the client wants to update
app.put('/todos/:id', (req, res) => {
    const { id } = req.params; //req.params consists of any route parameters from the request data, such as "id" in this case
    const { task } = req.body; //the req.body in a PUT request only contains the data that is to be updated. The "id" of the task object is already provided in the URL, so the req. body will only contain the updated task description.
    const todo = todos.find((t) => t.id === parseInt(id)); //todos.find() searches through the "todos" array until it finds the task whose ID matches the ID in the client request
  
    if (todo) { //if the todo object is found, update the task and send back the updated task object. 
      todo.task = task;
      res.json(todo);
    } else {
      res.status(404).send('To-Do item not found');
    }
});
  
//this endpoint deletes the task object with the given "id" value at the /todos/:id URL
app.delete('/todos/:id', (req, res) => {
    const { id } = req.params; //obtains the ID from the URL
    todos = todos.filter((t) => t.id !== parseInt(id)); //creates a new array by keeping only the task objects whose id does not match the id of the given task object
    res.status(204).send(); //sends empty response back to client as there is no content to send back in response
});

