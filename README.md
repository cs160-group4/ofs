Team 4 project - OFS

## User's Guide (Installation and Configuration)

### Usage Video

Video: https://drive.google.com/file/d/1C829_4w0x5k0WtyUmXsM8hFuKrpAl40i/view?usp=sharing

### Prequisites
1. Setup Docker Desktop

### Getting Started

1. Clone the source
```bash
git clone https://github.com/cs160-group4/ofs.git
```
If there are errors for window users, run the following command before cloning for potential fix:
```bash
git config --global core.autocrlf false
```

2. Change directory to 'ofs'
```bash
cd ofs
```

3. Run Docker Compose:
```bash
docker compose up
```

4. In Docker Desktop Run the OFS container

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Example Personas

### Customer

1. Click the profile icon on the top right to sign in or register.
2. Explore the shop in the navigation bar.
    - On the left, sort or filter products.
    - Click a product to see more information.
3. In the product information, select a quantity and add to cart.
4. To see your cart, click the cart icon on the top right and "View Cart"
5. In the cart page, cart product, total costs, and delivery cost are all present.
6. Click "Checkout" to continue to the checkout page.
7. In the checkout page, you can add the delivery address and payment method before checkout.
8. Once satistfied, click "Place Your Order & Pay" to view your order summary.
9. In the order summary page, you can view the items ordered, subtotal, shipping cost, taxes, total weight, and total cost.

### Employee
1. Navigate to [localhost:3000/admin](http://localhost:3000/admin)
2. In the dashboard, the employee will be able to see money colected, total orders, products, customers, and latest orders
3. On the left, there are variety of navigation for employees.
4. Click on comments, and navigate recent comments
5. Click on categories, and create a category on the top right
6. To see all products in the store, click the "Products" section on the left hand side.
    - To add a product, click "Add Product" and fill in all the suggested information in the form.
    - To edit a product, click the pencil icon on the right of each product and edit as pleased.
    - To delete a product, click the red trash can icon on the right of each product.
7. Click on orders to recent orders made by customers
8. Click on robots to see the robot drivers available
9. Click delivery status on the left to see the route and status of each robot. 

### Admin 
1. Click the profile icon on the top right to sign in.
    - Use username: hung.pham@sjsu.edu and password: mastermind, to access the admin dashboard.
2. Once signed in, click the profile icon again and the "Admin Dashboard" link to visit the Administration Dashboard.
3. On the left, there are variety of dashboard for adminstration.
4. To view all users, click the "Users" section on the left hand side.
    - To promote a user, click on the pencil button and choose a new role.
5. Click on comments, and navigate recent comments
6. Click on categories, and create a category on the top right
7. To see all products in the store, click the "Products" section on the left hand side.
    - To add a product, click "Add Product" and fill in all the suggested information in the form.
    - To edit a product, click the pencil icon on the right of each product and edit as pleased.
    - To delete a product, click the red trash can icon on the right of each product.
8.  Click on orders to recent orders made by customers
9. Click on robots to see the robot drivers available
10. Click delivery status on the left to see the route and status of each robot.
11. To navigate back to the home page, click the "Back to Main Page" button on the bottom left.
