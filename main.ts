// One-Line Laugh-Off — make.fun entry
// Writes exactly one funny line to <output dir>/entry.txt.
//
// Candidate lines drafted fresh for this bounty (judge: one joke, cold read,
// no setup notes, no explanation):
//   1. "My smart fridge emailed me a diet plan, so I unplugged it and ate the evidence."
//   2. "My bank said my account was overdrawn, so I asked them to call back when it felt better."
//   3. "I asked the GPS for the scenic route and it drove me past my ex's house twice."
// Picked #1: the sharpest turn — the fridge becomes the nag, and the eater
// disposes of the nag and its evidence in one bite. Short, visual, sudden.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const JOKE =
  "My smart fridge emailed me a diet plan, so I unplugged it and ate the evidence.";

// The gate requires 1-200 characters of UTF-8 text, not only whitespace.
const MIN_LEN = 1;
const MAX_LEN = 200;

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function resolveOutputDir(): string {
  const raw =
    process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
  const dir = raw.trim();
  if (dir === "") fail("output directory is empty");
  const resolved = resolve(dir);
  if (resolved === resolve(".")) {
    fail('refusing to write into the current directory (out dir ".")');
  }
  return resolved;
}

function validate(line: string): void {
  if (line.trim().length === 0) fail("entry is blank");
  if (line.length < MIN_LEN || line.length > MAX_LEN) {
    fail(`entry must be ${MIN_LEN}-${MAX_LEN} characters, got ${line.length}`);
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(line)) {
    fail("entry contains control characters");
  }
  if (line.includes("\n") || line.includes("\r")) {
    fail("entry must be exactly one line");
  }
}

function main(): void {
  validate(JOKE);
  const outDir = resolveOutputDir();
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, JOKE + "\n", "utf8");
  // Round-trip check: the file on disk must be exactly the validated line.
  const onDisk = readFileSync(outPath, "utf8");
  if (onDisk !== JOKE + "\n") fail("round-trip check failed: entry.txt mismatch");
  console.log(`wrote ${JOKE.length} characters to ${outPath}`);
}

main();
