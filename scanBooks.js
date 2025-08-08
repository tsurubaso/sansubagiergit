// scripts/scanBooks.js
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const booksDir = path.join(process.cwd(), "public", "books");
const outputFile = path.join(process.cwd(), "public", "books.json");

function getBooksData() {
  const files = fs.readdirSync(booksDir);

  const books = files
    .filter((file) => file.endsWith(".md"))
    .map((filename) => {
      const fullPath = path.join(booksDir, filename);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data: frontmatter, content } = matter(fileContents);
      const slug = filename.replace(/\.md$/, "");

      return { slug, frontmatter, content };
    });

  return books;
}

function saveBooksToJson() {
  const books = getBooksData();
  fs.writeFileSync(outputFile, JSON.stringify(books, null, 2), "utf8");
  console.log(`✅ Books data saved to ${outputFile}`);
}

saveBooksToJson();
