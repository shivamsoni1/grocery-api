import { addProduct,disableProduct,getProduct, updateProduct } from '../contollers/productController';
import { createInternalUser, getUserByEmailId } from '../contollers/users';
import express from 'express';
import { addInventoryItem ,getAvailableInventoryItems,getInventoryItems} from '../contollers/inventoryController';
import { registerCustomer } from '../contollers/customers';
import { addItem, deleteItem, updateItem } from '../contollers/cartController';
import { placeOrder } from '../contollers/orderController';
const router = express.Router();


//get all inventory items
router.get('/inventory', getInventoryItems);

//get all available inventory items
router.get('/inventory/availableItem', getAvailableInventoryItems);

//add inventory item
router.post('/inventory/add', addInventoryItem);

//get all products
router.get('/product', getProduct);

//disbale product
router.post('/product/disable', disableProduct);  

//update productß
router.post('/product/update', updateProduct);    

//add product
router.post('/product/add', addProduct);

//  register customer
router.post('/customer', registerCustomer);

//cart operations
//add item to cart  
router.post('/cart/add',addItem );

//update item in cart
router.post('/cart/update',updateItem );


router.delete('/cart/remove',deleteItem );

// get user by email id
router.get('/user', getUserByEmailId);

router.post('/user', createInternalUser);

//place order
router.post('/order/place', placeOrder);

export default router;