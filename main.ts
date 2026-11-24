import { mkdirSync, writeFileSync } from "node:fs";

// The entry line: exactly one sentence, 1-200 characters. The competition's
// sealed gate requires /output/entry.txt to be UTF-8 text of 1 to 200
// characters, not only white space, so validate before writing anything.
// The entry line, built from its three beats so each can be read on its own:
// the handrail drifting, the climb, and the stranger it leaves you holding.
function buildLine(): string {
  const drift =
    "The escalator handrail keeps creeping ahead of my hand, ";
  const climb = "so by the top of the stairs ";
  const turn = "I am holding hands with someone who arrived before me.";
  return drift + climb + turn;
}

const LINE = buildLine();

// Runtime guard: the entry must be exactly one line (no trailing newline)
// and within the 1-200 character limit.
const charCount = [...LINE].length;
if (LINE.length === 0) {
  throw new Error("entry must be non-empty");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be exactly one line (no internal newlines)");
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only white space");
}
if (charCount < 1 || charCount > 200) {
  throw new Error(`entry must be 1-200 characters, got ${charCount}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
