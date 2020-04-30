const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth-routes');
const questionsRoutes = require('./routes/question-routes');
const answerRouter = require('./routes/answer-routes');
const voteRoutes = require('./routes/vote-routes');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json({extended: false}));


app.use('/api/auth', authRoutes);
app.use('/api/question', questionsRoutes);
app.use('/api/answer', answerRouter);
app.use('/api/vote', voteRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(result => app.listen(PORT, () => console.log(`server running at port ${PORT}.....`)))
    .catch(err => console.log(err));