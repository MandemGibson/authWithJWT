import path from "path";
import { promises as fs } from "fs";

const filePath = path.join(__dirname, "../data/users.json");

export const readUsers = async () => {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading users:", error);
  } finally {
    console.log(`File path: ${filePath}`);
  }
};

export const writeToUsers = async (data: Array<any>) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), { encoding: "utf-8" });
  } catch (error) {
    console.error("Error writing users:", error);
  }
};
