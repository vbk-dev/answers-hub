const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const keys = require('./config/keys');
const authRoutes = require('./routes/auth-routes');
const questionsRoutes = require('./routes/question-routes');
const answerRouter = require('./routes/answer-routes');
const voteRoutes = require('./routes/vote-routes');

const app = express();

app.use(cors());
app.use(express.json({extended: false}));


app.use('/api/auth', authRoutes);
app.use('/api/question', questionsRoutes);
app.use('/api/answer', answerRouter);
app.use('/api/vote', voteRoutes);

app.use('/', (req, res, next)=>{
    res.status(404).json({error: 'Page not found'});
});

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(result => app.listen(keys.PORT, () => console.log(`server running at port ${keys.PORT}.....`)))
    .catch(err => console.log(err));