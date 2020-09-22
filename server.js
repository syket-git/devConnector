const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');


connectDB();
app.use(express.json({extended: false}));


app.use('/api/users', require('./routers/api/users'));
app.use('/api/posts', require('./routers/api/posts'));
app.use('/api/auth', require('./routers/api/auth'));
app.use('/api/profile', require('./routers/api/profile'));


//Server static assets in production

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT , () => console.log(`App Listening on ${PORT}`));