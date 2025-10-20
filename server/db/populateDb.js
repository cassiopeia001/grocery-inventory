const { Client } = require('pg');
require('dotenv').config()

const SQL = `
    DROP TABLE IF EXISTS items CASCADE;
    DROP TABLE IF EXISTS categories CASCADE;
    CREATE TABLE categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        nItems INTEGER DEFAULT 0
    );
    CREATE TABLE items (
        id SERIAL PRIMARY KEY,
        name VARCHAR (255) UNIQUE NOT NULL,
        price REAL,
        quantity REAL,
        unit VARCHAR (255),
        category_id INTEGER REFERENCES categories (id) ON DELETE CASCADE
    );

    CREATE FUNCTION update_category_count () RETURNS trigger AS $$ 
    BEGIN 
        IF TG_OP = 'INSERT' THEN 
            UPDATE categories set nItems = nItems +1 
            WHERE id = NEW.category_id;
        ELSIF TG_OP ='DELETE' THEN 
        UPDATE categories set nItems = nItems -1 
        WHERE id = OLD.category_id; 
        END IF;
        RETURN NULL;
    END; 
    $$ LANGUAGE plpgsql;


    CREATE TRIGGER tg_update_category_count 
    AFTER INSERT OR DELETE on items 
    FOR EACH ROW  
    EXECUTE FUNCTION update_category_count();

    INSERT INTO categories (name) VALUES 
        ('Vegetables'),
        ('Fruits'),
        ('Dairy products'),
        ('Meats'),
        ('Grains');
    INSERT INTO items (name, price, quantity, unit, category_id)
    VALUES
        ('Potatoes', 1.20, 100, 'kg', 1),
        ('Asparagus', 2.50, 30, 'bunch', 1),
        ('Lettuce', 1.00, 40, 'head', 1),
        ('Onions', 0.90, 80, 'kg', 1),
        ('Garlic', 1.80, 60, 'bulb', 1),
        ('Carrots', 1.10, 70, 'kg', 1),
        ('Beet', 1.40, 50, 'kg', 1),
        ('Broccoli', 2.00, 35, 'head', 1),
        ('Cauliflower', 2.20, 25, 'head', 1),
        ('Apples', 2.50, 100, 'kg', 2),
        ('Bananas', 1.80, 120, 'kg', 2),
        ('Grapes', 3.00, 90, 'kg', 2),
        ('Oranges', 2.20, 110, 'kg', 2),
        ('Pears', 2.40, 70, 'kg', 2),
        ('Watermelon', 5.00, 40, 'pcs', 2),
        ('Pineapples', 4.50, 50, 'pcs', 2),
        ('Strawberries', 3.50, 80, 'kg', 2),
        ('Melons', 4.80, 30, 'pcs', 2), 
        ('Milk', 1.20, 200, 'liter', 3),
        ('Cheese', 5.50, 80, 'kg', 3),
        ('Yogurt', 0.90, 150, 'cup', 3),
        ('Butter', 4.00, 60, 'kg', 3),
        ('Cream', 2.50, 70, 'liter', 3),
        ('Eggs', 0.20, 500, 'pcs', 3),
        ('Cottage Cheese', 3.80, 40, 'kg', 3),
        ('Sour Cream', 2.20, 60, 'cup', 3),
        ('Beef', 8.50, 50, 'kg', 4),
        ('Chicken', 5.20, 70, 'kg', 4),
        ('Lamb', 9.00, 30, 'kg', 4),
        ('Turkey', 6.50, 35, 'kg', 4),
        ('Sausages', 4.50, 60, 'kg', 4),
        ('Fish', 7.50, 50, 'kg', 4),
        ('Rice', 2.00, 100, 'kg', 5),
        ('Wheat', 1.50, 120, 'kg', 5),
        ('Oats', 1.80, 80, 'kg', 5),
        ('Barley', 1.60, 70, 'kg', 5),
        ('Corn', 1.40, 90, 'kg', 5),
        ('Quinoa', 4.50, 40, 'kg', 5),
        ('Millet', 2.20, 60, 'kg', 5),
        ('Rye', 1.70, 50, 'kg', 5),
        ('Pasta', 2.50, 100, 'kg', 5),
        ('Bread', 1.20, 80, 'loaf', 5);
`
async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/grocery_inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
