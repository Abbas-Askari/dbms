export const getCartItems = (user_id: number | undefined) =>
`SELECT product.*, cart.quantity, image.data 
FROM cart JOIN product ON cart.product_id = product.id 
LEFT JOIN (SELECT distinct ON (product_id) * FROM productimage) ProdImage ON ProdImage.product_id = product.id
LEFT JOIN image ON image.id = ProdImage.image_id 
WHERE cart.user_id = '${user_id}' ORDER BY product.id;`;

export const getUserFromEmail = (email: string) => 
`SELECT * FROM users WHERE email = '${email}';` 

export const insertIntoCart = (user_id: number | undefined, product_id: number | undefined, quantity: number) =>
`INSERT INTO cart (user_id, product_id, quantity) VALUES (${user_id}, ${product_id}, ${quantity});`

export const deleteFromCart = (user_id: number | undefined, product_id: number | undefined) =>
`DELETE FROM cart WHERE product_id=${product_id} AND user_id=${user_id};`

export const getCartProduct = (product_id: number, user_id: number) =>
`SELECT * FROM cart WHERE user_id = ${user_id} AND product_id = ${product_id}`

export const getProductFromID = (id: number) =>
`SELECT * FROM product WHERE id = ${id}`

export const updateProductQuantityInCart = (user_id: string | undefined, product_id: number | undefined, quantity: number) => 
`UPDATE cart SET quantity = ${quantity} WHERE product_id = ${product_id} AND user_id = ${user_id}`

export const clearUserCart = (id: number | undefined) => 
`DELETE FROM cart WHERE user_id = ${id}`

export const insertAddress = (address: string, city: string, province: string, zip_code: number) =>
`INSERT INTO address (address, city, province, zip_code) VALUES ('${address}', '${city}', '${province}', ${zip_code}) RETURNING id;`

export const getProductImages = (product_id: number) => 
`SELECT image.* FROM image JOIN productImage ON image.id = productImage.image_id WHERE product_id = ${product_id}`

export const insertProduct = (title: string, description: string, stock: number, price: number, store_id: number) =>
`INSERT INTO product (title, description, stock, price, store_id) VALUES ('${title}', '${description}', ${stock}, ${price}, ${store_id}) RETURNING id;`

export const updateProduct = (product_id: number, title: string, description: string, stock: number, price: number) =>
`UPDATE product SET title = '${title}', description = '${description}', stock = ${stock}, price = ${price} WHERE id = ${product_id};`

export const insertUser = (email: string, password: string, phone: string, first_name: string, last_name: string, store_id?: number) => 
`INSERT INTO users (email, password, first_name, last_name, phone ${store_id ? ", store_id": ""}) VALUES ('${email}', '${password}', '${first_name}', '${last_name}', '${phone}' ${store_id ? `, ${store_id}`: ""}) RETURNING id`

export const insertStore = (name: string, description: string) => 
`INSERT INTO store (name, description) VALUES ('${name}', '${description}') RETURNING id`

export const getUserOrdersByID = (id: string | undefined) => 
`SELECT product.*, orderproduct.completed, orderproduct.quantity, orders.date
FROM orders JOIN orderproduct ON orderproduct.order_id = orders.id JOIN product ON orderproduct.product_id = product.id
WHERE user_id = ${id}`

export const getProductReviewsWithName = (product_id: number) =>
`SELECT review.*, users.first_name, users.last_name FROM review JOIN users ON user_id = users.id WHERE product_id = ${product_id};` 

export const getAllShelfProducts = () => 
`SELECT Pr.*, I.data, avg(R.rating) as rating 
FROM product Pr 
LEFT JOIN (select distinct on (product_id) * FROM productimage ) PI ON Pr.id = PI.product_id
LEFT JOIN image I ON PI.image_id = I.id
LEFT JOIN review R ON r.product_id = Pr.id
WHERE Pr.onShelf 
GROUP BY Pr.id, I.id;`

export const getQueriedShelfProducts = (query: string) => 
`SELECT Pr.*, I.data, avg(R.rating) as rating 
FROM product Pr 
LEFT JOIN (select distinct on (product_id) * FROM productimage ) PI ON Pr.id = PI.product_id
LEFT JOIN image I ON PI.image_id = I.id
LEFT JOIN review R ON r.product_id = Pr.id
WHERE starts_with(LOWER(Pr.title), LOWER('${query}')) AND Pr.onShelf
GROUP BY Pr.id, I.id;`

export const getStoreOrders = (store_id: number) =>
`SELECT * FROM orders JOIN users ON orders.user_id = users.id
JOIN orderProduct ON orders.id = orderProduct.order_id JOIN product ON orderProduct.product_id = product.id
LEFT JOIN (SELECT DISTINCT ON (product_id) * FROM productImage ) PI ON PI.product_id = product.id
LEFT JOIN (SELECT id as image_id, data, name FROM image) I ON I.image_id = PI.image_id
JOIN address ON address.id::INT = orders.address_id::INT WHERE completed = false AND product.store_id = ${store_id};` 

export const getStoreProducts = (store_id: number, isOwner: boolean) => 
`SELECT product.*, data from product 
LEFT JOIN (SELECT DISTINCT ON (product_id) * FROM productImage ) PI ON PI.product_id = product.id
LEFT JOIN (SELECT id as image_id, data, name FROM image) I ON I.image_id = PI.image_id
WHERE store_id = ${store_id} ${isOwner ? "" : "AND product.onshelf = true"};`

export const getPendingOrderCounts = (store_id: number) =>
`SELECT product.id, COUNT(orderproduct.order_id) 
FROM product LEFT JOIN orderproduct ON product.id = orderproduct.product_id
WHERE store_id = ${store_id}
GROUP BY product.id`

export const storeCustomerCount = (store_id: number) =>
`SELECT count(distinct user_id) as total
FROM orders JOIN orderproduct ON orders.id = orderproduct.order_id
JOIN (SELECT id FROM product WHERE store_id = ${store_id}) Pr ON Pr.id = orderproduct.product_id
WHERE completed = true;`

export const storeTotalSales = (store_id: number) =>
`SELECT SUM(Pr.price * OP.quantity) as total FROM product PR JOIN orderproduct OP ON PR.id = OP.product_id WHERE completed = true AND store_id = ${store_id};`

export const storeTotalProductsSold = (store_id: number) =>
`SELECT SUM(quantity) as total FROM orderproduct
JOIN (SELECT id FROM product WHERE store_id = ${store_id}) Pr ON Pr.id = orderproduct.product_id
WHERE completed = true;`

export const getAllStores = () =>
`SELECT * FROM store`

export const getQueriedStores = (query: string) =>
`SELECT * FROM store WHERE starts_with(LOWER(name), LOWER('${query}'))`