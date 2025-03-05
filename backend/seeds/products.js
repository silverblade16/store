import { sql } from "../config/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Macbook Pro",
    price: 1999.99,
    image:
      "https://plus.unsplash.com/premium_photo-1681302547899-9339f12aca53?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFjYm9vayUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Airpods Pro",
    price: 149.99,
    image:
      "https://images.unsplash.com/photo-1606741965509-717b9fdd6549?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFpcnBvZHMlMjBwcm98ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "iPhone 16",
    price: 699.99,
    image:
      "https://plus.unsplash.com/premium_photo-1680985551009-05107cd2752c?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aXBob25lJTIwMTZ8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Herman Miller Chair",
    price: 1999.99,
    image:
      "https://images.unsplash.com/photo-1688578735352-9a6f2ac3b70a?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZXJnb25vbWljJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D",
  },
  {
    name: "Parker Pen",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1600531597946-f9b1d7b0f486?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGVuJTIwcHJlbWl1bXxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Monitor Apple",
    price: 999.99,
    image:
      "https://plus.unsplash.com/premium_photo-1680721575881-6fad8bf84f51?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXBwbGUlMjBtb25pdG9yfGVufDB8fDB8fHww",
  },
  {
    name: "iPad",
    price: 599.99,
    image:
      "https://plus.unsplash.com/premium_photo-1680371835462-0bd2c8b26846?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGlwYWR8ZW58MHx8MHx8fDA%3D",
  },
];

async function seedDatabase() {
  try {
    await sql`TRUNCATE TABLE products RESTART IDENTITY`;

    for (const product of SAMPLE_PRODUCTS) {
      await sql`
        INSERT INTO products (name, price, image)
        VALUES (${product.name}, ${product.price}, ${product.image})
      `;
    }

    console.log("Database seeded successfully");
    process.exit(0); 
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1); 
  }
}

seedDatabase();