import { INITIAL_TOPICS, INITIAL_FLASHCARDS } from '../src/data/seedData.js';
import { verifyAllTopicsContent } from '../src/utils/contentVerifier.js';

console.log("Running Content Verification Test...");
const res = verifyAllTopicsContent(INITIAL_TOPICS, INITIAL_FLASHCARDS);

if (res.isAllVerified) {
  console.log("SUCCESS: All topics passed verification!");
  process.exit(0);
} else {
  console.error("FAIL: Missing pieces found!");
  process.exit(1);
}
