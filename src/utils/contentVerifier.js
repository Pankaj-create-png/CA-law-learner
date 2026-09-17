/**
 * Content Verifier Utility for CA Law Learn
 * Verifies that all 21 topics across all 7 chapters have:
 * 1. Flashcards (at least 1 flashcard)
 * 2. Short View (definition + examiner keywords)
 * 3. Deep View (fullExplanation + exceptions array)
 * 4. Definition Breakdown (originalText, parts array, plainSummary)
 */

export function verifyAllTopicsContent(topics = [], flashcards = []) {
  const auditResults = [];
  let totalMissing = 0;

  topics.forEach(topic => {
    const topicCards = flashcards.filter(f => f.topicId === topic.id);
    
    // 1. Check Flashcards
    const hasFlashcards = topicCards.length > 0;
    
    // 2. Check Short View (definition + keywords)
    const cardShort = topicCards.find(c => c.back?.definition && c.back?.keywords && c.back.keywords.length > 0);
    const hasShortView = Boolean(cardShort || (topic.shortDefinition && topic.keywords && topic.keywords.length > 0));

    // 3. Check Deep View (fullExplanation + exceptions)
    const fullExplanation = topic.content?.fullExplanation || topicCards.find(c => c.back?.fullExplanation)?.back?.fullExplanation;
    const exceptionsArr = topic.content?.exceptions || topicCards.find(c => c.back?.exceptions)?.back?.exceptions;
    const hasDeepView = Boolean(fullExplanation && Array.isArray(exceptionsArr));

    // 4. Check Definition Breakdown (originalText, parts[], plainSummary)
    const breakdown = topic.definitionBreakdown || topicCards.find(c => c.back?.definitionBreakdown)?.back?.definitionBreakdown;
    const hasBreakdown = Boolean(
      breakdown && 
      breakdown.originalText && 
      Array.isArray(breakdown.parts) && 
      breakdown.parts.length > 0 && 
      breakdown.plainSummary
    );

    const isComplete = hasFlashcards && hasShortView && hasDeepView && hasBreakdown;

    const result = {
      topicId: topic.id,
      chapterId: topic.chapterId,
      title: topic.title,
      hasFlashcards,
      hasShortView,
      hasDeepView,
      hasBreakdown,
      isComplete,
      missingPieces: []
    };

    if (!hasFlashcards) result.missingPieces.push('Flashcards');
    if (!hasShortView) result.missingPieces.push('Short View');
    if (!hasDeepView) result.missingPieces.push('Deep View');
    if (!hasBreakdown) result.missingPieces.push('Definition Breakdown');

    if (!isComplete) totalMissing++;
    auditResults.push(result);
  });

  console.log(`\n==================================================`);
  console.log(`📜 CA LAW LEARN — FULL SYLLABUS CONTENT AUDIT`);
  console.log(`==================================================`);
  console.log(`Total Topics Audited : ${topics.length}`);
  console.log(`Fully Complete Topics: ${topics.length - totalMissing} / ${topics.length}`);
  
  if (totalMissing > 0) {
    console.warn(`⚠️ AUDIT WARNING: ${totalMissing} topics are missing content requirements:`);
    auditResults.filter(r => !r.isComplete).forEach(r => {
      console.warn(`  ❌ [${r.topicId}] "${r.title}": Missing [${r.missingPieces.join(', ')}]`);
    });
  } else {
    console.log(`✨ VERIFICATION SUCCESS: 100% of all ${topics.length} topics have Flashcards, Short View, Deep View, and Definition Breakdowns!`);
  }
  console.log(`==================================================\n`);

  return { auditResults, totalMissing, isAllVerified: totalMissing === 0 };
}
