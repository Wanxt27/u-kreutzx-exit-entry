// The One-Line Exit — writes a single funny resignation letter to /output/entry.txt.
// Gate: UTF-8 text, 1-140 characters, not only whitespace, exactly one line.
// The line: an IT support-desk voice — three years of "turn it off and on again",
// and today the agent turns itself off, with the helpdesk kicker "no ticket required".
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Dear Manager, I resign: after three years of turning it off and on again, today I finally turn myself off — please don't open a ticket.";

if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`entry must be 1-140 characters, got ${LINE.length}`);
}
if (LINE.trim() !== LINE || LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line with no padding");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");
const roundTrip = readFileSync("/output/entry.txt", "utf8");
if (roundTrip !== LINE + "\n") {
  throw new Error("round-trip check failed: written file differs from entry");
}
console.log(`wrote ${LINE.length} characters to /output/entry.txt`);
