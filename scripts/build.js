const { spawnSync } = require("node:child_process");

const result = spawnSync(
  "pnpm",
  ["exec", "expo", "export", "--platform", "web", "--output-dir", "dist"],
  { stdio: "inherit" },
);

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
