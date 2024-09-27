const express = require('express');
const dotenv = require('dotenv');
const AuthMiddleware = require('./modules/auth');
const Routes = require('./routes/gateway');
dotenv.config();
const PORT = process.env.PORT || 5005;

async function exec() {

    const app = express();
    // verify user auth meddleware

    // public get path
    const publicGetPaths = [ 
        '/product/products',        
    ];

    // public post path
    const publicPostPaths = [
        '/users/register',  
        '/users/login',      
    ];

    // use middleware verify user auth
    app.use((req, res, next) => {

        if ( req.method === 'GET' ) {
            /* ignor public path */
            publicGetPaths.forEach( pubGP => req.url.includes(pubGP) ? req.visitor = true : 1 )
        } 
        
        if ( req.method === 'POST' ) {
            /* ignor public path */
            publicPostPaths.forEach( pubPP => req.url.includes(pubPP) ? req.visitor = true : 1 )
        } 

        AuthMiddleware(req, res, next);
    });

    // route
    app.use('/eCommerce', Routes);
    app.listen(PORT, () => {
        console.log(`API Gateway running on port ${PORT}`);
    });
}
exec()