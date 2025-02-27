/**
 * This file is used to seed the database with some initial data.
 * This is useful for development purposes.
 */
import { mutation } from "./_generated/server";

export const seedMessages = mutation(async ({ db }) => {
  const messages = Array.from({ length: 50 }, (_, i) => ({
    title: `Title ${i + 1}`,
    description: `This is the description for message ${i + 1}.`,
    class: "3A",
  }));

  for (const message of messages) {
    await db.insert("message", message);
  }

  return "Inserted 50 messages successfully!";
});
