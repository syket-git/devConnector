const express = require('express');
const app = express();
const connectDB = require('./config/db');


connectDB();
app.use(express.json({extended: false}));
app.get("/", (req, res) => {
    res.send("Hello App is running successfully");
})

app.use('/api/users', require('./routers/api/users'));
app.use('/api/posts', require('./routers/api/posts'));
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/profile', require('./routers/api/profile'));

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`App Listening on ${PORT}`));