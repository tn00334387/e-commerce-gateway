const { createProxyMiddleware } = require('http-proxy-middleware');
const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

router.use('/users', createProxyMiddleware({
    target: process.env.USER_HOST_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/users/' },
}));

router.use('/product', createProxyMiddleware({
    target: process.env.PRODUCT_HOST_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/product/' }
}));

router.use('/carts', createProxyMiddleware({
    target: process.env.CART_HOST_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/cart/' }
}));

router.use('/orders', createProxyMiddleware({
    target: process.env.ORDER_HOST_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/order/' }
}));

router.use('/payments', createProxyMiddleware({
    target: process.env.PAYMENT_HOST_URL,
    changeOrigin: true,
    pathRewrite: { '^/': '/api/payment/' }
}));

module.exports = router;
