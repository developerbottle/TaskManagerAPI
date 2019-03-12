require('./db/mongoose');

const express = require('express');

const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const PORT = process.env.PORT;

let app = express();

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});