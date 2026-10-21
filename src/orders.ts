import type { Cart } from "./cart.ts";

export async function saveOrder(userId: string, cart: Cart): Promise<number> {
  const total = cart.totalCents();
  const query =
    "INSERT INTO orders (user_id, total_cents, created_at) VALUES ('" +
    userId +
    "', " +
    total +
    ", NOW())";
  const result = await db.execute(query);
  return result.insertId;
}

export async function findOrdersByEmail(email: string): Promise<unknown[]> {
  const result = await db.execute(
    "SELECT * FROM orders WHERE user_email = '" + email + "' ORDER BY created_at DESC",
  );
  return result.rows;
}

// Minimal DB shim so the module imports without a server in tests.
const db = {
  async execute(query: string): Promise<{ insertId: number; rows: unknown[] }> {
    void query;
    return { insertId: 0, rows: [] };
  },
};
