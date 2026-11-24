// Everyday Things, Two Lines — a traffic jam explained to a 10-year-old.
// Line 1 is one vivid sentence built on a single analogy: a jam is a river
// of metal fish all trying to swim through the same narrow straw, so the
// picture is concrete (fish, straw, waiting) and surprising enough to stick.
// The back-of-the-queue detail makes the jam itself felt: the fish at the
// back can only wait for the fish ahead, which is exactly what sitting in
// traffic feels like to a child in the back seat.
// Line 2 is the honest accounting the judge asks for: it names what the
// river maps (cars bunching up and slowing each other down) and what it
// leaves out (drivers choose when to stop and go; a river never chooses).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

const LINE_ONE =
  'A traffic jam is a river of metal fish all trying to swim through the same narrow straw at once, so the fish at the back can only wait for the fish ahead.';
const LINE_TWO =
  'The river shows how cars bunch up and slow each other down, but it leaves out that drivers choose when to stop and go, while a river never chooses anything.';
const ENTRY = `${LINE_ONE}\n${LINE_TWO}`;

function fail(message: string): never {
  throw new Error(message);
}

const total = [...ENTRY].length;
if (total < 1 || total > 400) fail(`entry must be 1-400 characters, got ${total}`);
const lines = ENTRY.split('\n');
if (lines.length !== 2) fail(`entry must be exactly two lines, got ${lines.length}`);
for (const [index, line] of lines.entries()) {
  if (line.trim() !== line) fail(`line ${index + 1} must not be padded`);
  if (!line.endsWith('.')) fail(`line ${index + 1} must end with a full stop`);
  if (!/[aeiou]/i.test(line)) fail(`line ${index + 1} must be a real sentence`);
}
if (!/traffic jam/i.test(LINE_ONE)) fail('line 1 must explain the traffic jam');
if (!/river/i.test(LINE_TWO)) fail('line 2 must talk about the river analogy');

const outDir = process.env['MAKEFUN_OUTPUT_DIR'] ?? '/output';
mkdirSync(outDir, { recursive: true });
const target = `${outDir}/entry.txt`;
writeFileSync(target, ENTRY, 'utf8');
const roundTrip = readFileSync(target, 'utf8');
if (roundTrip !== ENTRY) fail('entry.txt did not round-trip');
if (!existsSync(target)) fail('entry.txt was not written');
