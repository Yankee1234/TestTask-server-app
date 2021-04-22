const config = require('./config/config');
const app = require('express')();
const corsHelper = require('./services/helpers/other/CorsHelper');
var authRouter = require('./routers/AuthRouter');
var profileRouter = require('./routers/HomeRouter');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, resp, next) => {
    corsHelper.unabledCorsPolicy(req,resp,next);
});

app.use('/auth', authRouter);

app.use('/profile', profileRouter);

app.listen(config.port, config.host, (err) => {
    if(err) {
        console.log('Failed listening a server');
    }

    console.log('Server has started');
})