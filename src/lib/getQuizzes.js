import fs from "fs";
import path from "path";

export function getQuizzes() {
  const filePath = path.join(process.cwd(), "src", "data", "data.json");
  const fileContent = fs.readFileSync(filePath);
  const data = JSON.parse(fileContent);
  return data;
}
