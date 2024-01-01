import DB from "@/database";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

// CREATE TABLE IF NOT EXISTS customer (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) NOT NULL CHECK ( email like '%@%.%'),
//     password VARCHAR(255) NOT NULL,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     phone VARCHAR(13) NOT NULL
// );

// ALTER TABLE orderproduct ALTER COLUMN order_id TYPE INT USING order_id::INT

// CREATE TABLE IF NOT EXISTS image (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   data TEXT NOT NULL
// );

// CREATE TABLE IF NOT EXISTS customer (
//     id SERIAL PRIMARY KEY,
//     email VARCHAR(255) NOT NULL CHECK ( email like '%@%.%'),
//     password VARCHAR(255) NOT NULL,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     phone VARCHAR(13) NOT NULL
// );
// CREATE TABLE IF NOT EXISTS address (
//   id SERIAL PRIMARY KEY,
//   address VARCHAR(255),
//   city VARCHAR(255),
//   province VARCHAR(255),
//   zip_code INT
// );

// CREATE TABLE IF NOT EXISTS product (
//     id SERIAL PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description VARCHAR(2048),
//     price DECIMAL(9, 2),
//     stock INT
// );

// CREATE TABLE IF NOT EXISTS order_ (
//   id SERIAL PRIMARY KEY,
//   date DATE NOT NULL,
//   customer_id INT NOT NULL,
//   address_id INT NOT NULL
// )

// CREATE TABLE IF NOT EXISTS cart (
//     product_id INT NOT NULL,
//     customer_id INT NOT NULL,
//     quantity INT NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES product(id),
//     FOREIGN KEY (customer_id) REFERENCES customer(id)
//   )

// CREATE TABLE IF NOT EXISTS  orderproduct  (
//     order_id INT NOT NULL,
//     product_id INT NOT NULL,
//     quantity INT,
//     FOREIGN KEY (product_id) REFERENCES product (id),
//     FOREIGN KEY (order_id) REFERENCES orders(id)
//   );

// CREATE TABLE IF NOT EXISTS productimage (
//   image_id INT NOT NULL,
//   product_id INT NOT NULL,
//   FOREIGN KEY (image_id) REFERENCES image(id),
//   FOREIGN KEY (product_id) REFERENCES product(id)
// )

// CREATE TABLE IF NOT EXISTS review (
//   id SERIAL PRIMARY KEY,
//   product_id INT NOT NULL,
//   customer_id INT NOT NULL,
//   title TEXT NOT NULL,
//   content TEXT NOT NULL,
//   rating INT NOT NULL,
//   FOREIGN KEY (product_id) REFERENCES product(id),
//   FOREIGN KEY (customer_id) REFERENCES customer(id)
// );

export async function GET(request: Request) {
  try {
    //write schema for the review table
    const result = await DB.query(`
    `);

    revalidatePath("/");
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
