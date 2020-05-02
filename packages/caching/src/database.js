import Dexie from "dexie";

export const database = new Dexie("core");

// Declare tables, IDs and indexes
database.version(1).stores({
  tokens: "++id, address, name, symbol, decimals"
});
