import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

// CREATE TABLE IF NOT EXISTS product (
//     id VARCHAR(255) PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description VARCHAR(2048),
//     price DECIMAL(9, 2),
//     stock INT
// );


// CREATE TABLE IF NOT EXISTS customer (
//     id VARCHAR(255) PRIMARY KEY,
//     email VARCHAR(255) NOT NULL CHECK ( email like '%@%.%'),
//     password VARCHAR(255) NOT NULL,
//     first_name VARCHAR(255) NOT NULL,
//     last_name VARCHAR(255) NOT NULL,
//     phone VARCHAR(13) NOT NULL
// );

// CREATE TABLE IF NOT EXISTS cart (
//     product_id VARCHAR(255) NOT NULL,
//     customer_id VARCHAR(255) NOT NULL,
//     quantity INT NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES product(id),
//     FOREIGN KEY (customer_id) REFERENCES customer(id)
//   )


// CREATE TABLE IF NOT EXISTS address (
  //   id VARCHAR(255) PRIMARY KEY,
  //   address VARCHAR(255),
  //   city VARCHAR(255),
  //   province VARCHAR(255),
  //   zip_code INT
  // );
  // CREATE TABLE IF NOT EXISTS order_ (
    //     id VARCHAR(255) PRIMARY KEY,
    //     date DATE NOT NULL,
    //     customer_id VARCHAR(255) NOT NULL,
    //     address_id VARCHAR(255) NOT NULL,
    //   FOREIGN KEY (customer_id) REFERENCES customer(id),
    //   FOREIGN KEY (address_id) REFERENCES address(id)  
    // );
    export async function GET(request: Request) {
      try {
        const result = await sql`
        CREATE TABLE IF NOT EXISTS orderProducts (
            order_id VARCHAR(255) NOT NULL,
            product_id VARCHAR(255) NOT NULL,
            quantity INT,
            FOREIGN KEY (product_id) REFERENCES product (id),
            FOREIGN KEY (order_id) REFERENCES "order_"(id)
          );
        `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    console.error("Failed to create tables: ", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
