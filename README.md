### Grocery API Documentation

## Docker Compose
-**start-command:** : docker compose up
- Above Command will start the app server and postgresql server 

## Endpoints

### Inventory Endpoints

#### Get All Inventory Items
- **URL:** `/inventory`
- **Method:** `GET`
- **Description:** Retrieve all inventory items.

#### Get Available Inventory Items
- **URL:** `/inventory/availableItem`
- **Method:** `GET`
- **Description:** Retrieve all available inventory items.

#### Add Inventory Item
- **URL:** `/inventory/add`
- **Method:** `POST`
- **Description:** Add a new inventory item.
- **Request Body:**
  - productId,
  - mrp,
  - unitCostPrice,
  - quantity,
  - status

### Product Endpoints

#### Get All Products
- **URL:** `/product`
- **Method:** `GET`
- **Description:** Retrieve all products.

#### Disable Product
- **URL:** `/product/disable`
- **Method:** `POST`
- **Description:** Disable a product.
- **Request Body:**
  - `id`: The ID of the product to disable.

#### Update Product
- **URL:** `/product/update`
- **Method:** `POST`
- **Description:** Update product details.
- **Request Body:**
  - id,
  - name,
  - imageUrl,
  - price,
  - mrp

#### Add Product
- **URL:** `/product/add`
- **Method:** `POST`
- **Description:** Add a new product.
- **Request Body:**
  - name,
  - imageUrl,
  - price,
  - mrp,
  - status 

### Customer Endpoints

#### Register Customer
- **URL:** `/customer`
- **Method:** `POST`
- **Description:** Register a new customer.
- **Request Body:**
  - `name`: The name of the customer.
  - `email`: The email of the customer.
  - `mobile`: mobile of the customer.

### Cart Endpoints

#### Add Item to Cart
- **URL:** `/cart/add`
- **Method:** `POST`
- **Description:** Add an item to the cart.
- **Request Body:**
  - customerId
  - productId
  - mrp 
  - price
  - quantity
  - cartId : This is a optional field. Required only if cart exist

#### Update Item in Cart
- **URL:** `/cart/update`
- **Method:** `POST`
- **Description:** Update an item in the cart.
- **Request Body:**
  - customerId
  - productId
  - mrp 
  - price
  - quantity
  - cartId : This is a optional field. Required only if cart exist

#### Remove Item from Cart
- **URL:** `/cart/remove`
- **Method:** `DELETE`
- **Description:** Remove an item from the cart.
- **Request Body:**
  - customerId
  - productId
  -  cartId 

### User Endpoints

#### Get User by Email ID
- **URL:** `/user`
- **Method:** `GET`
- **Description:** Retrieve user details by email ID.
- **Request Parameters:**
  - `email`: The email ID of the user.

#### Create Internal User
- **URL:** `/user`
- **Method:** `POST`
- **Description:** Create a new internal user.
- **Request Body:**
  - `name`: The name of the user.
  - `email`: The email of the user.
  - `role`: Role of internal user.

### Order Endpoints

#### Place Order
- **URL:** `/order/place`
- **Method:** `POST`
- **Description:** Place an order.
- **Request Body:**
  - `customerId`: The ID of the customer placing the order.
  - `cartId`: Cart id.

## Conclusion
This documentation provides an overview of the Grocery API endpoints. For further details and examples, refer to the specific endpoint descriptions.

