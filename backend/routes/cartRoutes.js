import express from "express";
import { addToCart, getAllOrders, getCart, getTotalOrders, getTotalUsers, removeCartItem, updateCartItem } from "../controlers/cartController.js";




const cartRoutes = express.Router();


cartRoutes.post('/add',addToCart);
cartRoutes.get('/cart/:userId', getCart);
cartRoutes.patch('/cart/update/:itemId', updateCartItem);
cartRoutes.delete('/cart/remove/:itemId', removeCartItem);

cartRoutes.get("/total-users", getTotalUsers);
cartRoutes.get("/total-orders", getTotalOrders);
cartRoutes.get("/all-orders", getAllOrders);

export default cartRoutes;