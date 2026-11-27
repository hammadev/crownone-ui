// Fails when a public export from an entry point (src/index.ts, src/receipt.ts, src/otp.ts…)
// is not mentioned in llms-full.txt,
// so the AI usage reference can't silently fall behind the code.
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const pkg = require(path.join(root, "package.json"));
// Every entry point in package.json "exports" maps to src/<name>.ts.
const entryFiles = Object.keys(pkg.exports)
  .filter((key) => key !== "./package.json")
  .map((key) => (key === "." ? "index" : key.slice(2)))
  .map((name) => path.join(root, "src", `${name}.ts`));
const index = entryFiles.map((f) => fs.readFileSync(f, "utf8")).join("\n");
const docs = fs.readFileSync(path.join(root, "llms-full.txt"), "utf8");

const names = new Set();
for (const [, list] of index.matchAll(/export\s+(?:type\s+)?\{([^}]+)\}/g)) {
  for (const part of list.split(",")) {
    // "default as StyledText" -> StyledText, "useTheme" -> useTheme
    const name = part.trim().split(/\s+as\s+/).pop().trim();
    if (name) names.add(name);
  }
}

const missing = [...names].filter((name) => !new RegExp(`\\b${name}\\b`).test(docs));

const requiredFiles = ["llms.txt", "llms-full.txt", "skills/crownone-ui/SKILL.md"];
const missingFiles = requiredFiles.filter((f) => !fs.existsSync(path.join(root, f)));

if (missing.length || missingFiles.length) {
  if (missing.length) {
    console.error(`llms-full.txt does not mention these public exports: ${missing.join(", ")}`);
  }
  if (missingFiles.length) {
    console.error(`Missing AI docs files: ${missingFiles.join(", ")}`);
  }
  process.exit(1);
}

console.log(`AI docs cover all ${names.size} public exports.`);
