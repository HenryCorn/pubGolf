import type { Score, PlayerWithScores } from '../types/database';

/**
 * Calculate the total score for a single hole
 */
export function calculateHoleScore(score: Pick<Score, 'sips' | 'penalties' | 'bonuses'>): number {
  return score.sips + score.penalties - score.bonuses;
}

/**
 * Calculate the total score for a player across all holes
 */
export function calculateTotalScore(scores: Score[]): number {
  return scores.reduce((total, score) => {
    return total + calculateHoleScore(score);
  }, 0);
}

/**
 * Sort players by total score (ascending - lower is better)
 */
export function sortPlayersByScore(players: PlayerWithScores[]): PlayerWithScores[] {
  return [...players].sort((a, b) => {
    if (a.totalScore === b.totalScore) {
      // If scores are equal, sort by number of holes played (descending)
      return b.scores.length - a.scores.length;
    }
    return a.totalScore - b.totalScore;
  });
}

/**
 * Get score color class based on value
 */
export function getScoreColorClass(score: number): string {
  if (score <= 0) return 'text-green-600';
  if (score <= 5) return 'text-amber';
  return 'text-red-600';
}

/**
 * Format score with +/- prefix
 */
export function formatScore(score: number): string {
  if (score === 0) return '0';
  return score > 0 ? `+${score}` : `${score}`;
}

/**
 * Get position class for leaderboard ranking
 */
export function getPositionClass(position: number): string {
  return position <= 3 ? 'text-amber' : 'text-gray-600';
}

/**
 * Calculate average score per hole for a player
 */
export function calculateAverageScore(scores: Score[]): number {
  if (scores.length === 0) return 0;
  const total = calculateTotalScore(scores);
  return Number((total / scores.length).toFixed(1));
}

/**
 * Get best and worst hole scores for a player
 */
export function getBestAndWorstScores(scores: Score[]): { best: number; worst: number } {
  if (scores.length === 0) return { best: 0, worst: 0 };
  
  const holeScores = scores.map(calculateHoleScore);
  return {
    best: Math.min(...holeScores),
    worst: Math.max(...holeScores)
  };
}

/**
 * Calculate total penalties and bonuses for a player
 */
export function calculatePenaltiesAndBonuses(scores: Score[]): { penalties: number; bonuses: number } {
  return scores.reduce(
    (totals, score) => ({
      penalties: totals.penalties + score.penalties,
      bonuses: totals.bonuses + score.bonuses
    }),
    { penalties: 0, bonuses: 0 }
  );
}
