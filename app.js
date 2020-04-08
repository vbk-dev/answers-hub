const express = require('express');
const mongoose = require('mongoose');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');

const app = express();

app.use(express.json({extended: false}));

app.use('/api/auth', authRoutes);

app.use('/', (req, res, next)=>{
    res.status(404).json({error: 'Page not found'});
});

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => app.listen(keys.PORT, () => console.log(`server running at port ${keys.PORT}.....`)))
    .catch(err => console.log(err));