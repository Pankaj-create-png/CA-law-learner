/**
 * Spaced Repetition Scheduling Module (SM-2 simplified derivative)
 * Manages card mastery, ease factors, and next review dates based on student performance.
 */

export const DEFAULT_CARD_PROGRESS = {
  easeLevel: 2.5,
  intervalDays: 1,
  reviewCount: 0,
  lastReviewedAt: null,
  nextReviewDate: new Date().toISOString().split('T')[0],
  status: 'new', // 'new' | 'reviewing' | 'mastered'
  reviewHistory: []
};

/**
 * Calculates updated card progress after a user rates a card as 'easy' or 'hard'
 * @param {Object|null} currentProgress 
 * @param {'easy'|'hard'} rating 
 * @returns {Object} Updated card progress object
 */
export function calculateNextReview(currentProgress, rating) {
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  
  const prev = currentProgress || { ...DEFAULT_CARD_PROGRESS };
  let { easeLevel = 2.5, intervalDays = 1, reviewCount = 0, reviewHistory = [] } = prev;

  const newHistoryItem = {
    date: todayStr,
    timestamp: Date.now(),
    result: rating
  };

  if (rating === 'hard') {
    // Hard cards resurface immediately/tomorrow and decrease ease factor
    easeLevel = Math.max(1.3, Number((easeLevel - 0.2).toFixed(2)));
    intervalDays = 1;
  } else if (rating === 'easy') {
    // Easy cards expand interval
    if (reviewCount === 0) {
      intervalDays = 3;
    } else if (reviewCount === 1) {
      intervalDays = 6;
    } else {
      intervalDays = Math.max(intervalDays + 2, Math.round(intervalDays * easeLevel));
    }
    easeLevel = Number((easeLevel + 0.15).toFixed(2));
  }

  // Calculate next review date
  const nextDate = new Date(now);
  nextDate.setDate(nextDate.getDate() + intervalDays);
  const nextReviewDateStr = nextDate.toISOString().split('T')[0];

  const updatedCount = reviewCount + 1;
  
  // A card is considered 'mastered' if rated easy at least twice or interval >= 5 days
  let status = 'reviewing';
  if (rating === 'easy' && (intervalDays >= 5 || updatedCount >= 2)) {
    status = 'mastered';
  } else if (rating === 'hard') {
    status = 'reviewing';
  }

  return {
    easeLevel,
    intervalDays,
    reviewCount: updatedCount,
    lastReviewedAt: now.toISOString(),
    nextReviewDate: nextReviewDateStr,
    status,
    reviewHistory: [...reviewHistory, newHistoryItem]
  };
}

/**
 * Determines if a card is due for review today or overdue
 * @param {Object} cardProgress 
 * @returns {boolean}
 */
export function isCardDue(cardProgress) {
  if (!cardProgress || !cardProgress.nextReviewDate) return true;
  const today = new Date().toISOString().split('T')[0];
  return cardProgress.nextReviewDate <= today;
}

/**
 * Calculates user streak metrics
 * @param {Object} currentStreaks { currentStreak, longestStreak, lastActiveDate }
 * @returns {Object} Updated streaks object
 */
export function calculateStreakUpdate(currentStreaks = {}) {
  const today = new Date().toISOString().split('T')[0];
  const { currentStreak = 0, longestStreak = 0, lastActiveDate = null } = currentStreaks;

  if (lastActiveDate === today) {
    // Already reviewed today, streak stays intact
    return { currentStreak, longestStreak, lastActiveDate };
  }

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let newCurrent = currentStreak;
  if (lastActiveDate === yesterdayStr) {
    // Continued consecutive day!
    newCurrent += 1;
  } else {
    // Missed one or more days, reset streak to 1
    newCurrent = 1;
  }

  const newLongest = Math.max(longestStreak, newCurrent);

  return {
    currentStreak: newCurrent,
    longestStreak: newLongest,
    lastActiveDate: today
  };
}
