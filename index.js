const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.route'));

if(process.env.NODE_ENV === 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.3lxjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });

        app.listen(PORT, () =>{
            console.log(`Server started on port ${PORT}`)
        })
        
    } catch (err) {
        console.error(err);
    }
}
start();