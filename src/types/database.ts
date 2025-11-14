export interface Player {
  id: string;
  name: string;
  avatar: string;
  created_at?: string;
}

export interface Pub {
  id: string;
  name: string;
  drink: string;
  par: number;
  challenge: string;
  order_index: number;
  created_at?: string;
}

export interface Score {
  id: string;
  player_id: string;
  pub_id: string;
  sips: number;
  penalties: number;
  bonuses: number;
  created_at: string;
  updated_at: string;
}

export interface TournamentSettings {
  id: number;
  current_pub_id: string | null;
  tournament_started: boolean;
  tournament_ended: boolean;
  updated_at: string;
}

export interface PlayerWithScores extends Player {
  scores: Score[];
  totalScore: number;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  avatar: string;
  total_score: number;
  holes_played: number;
}

export interface ScoreInput {
  player_id: string;
  pub_id: string;
  sips: number;
  penalties: number;
  bonuses: number;
}

export type Database = {
  public: {
    Tables: {
      players: {
        Row: Player;
        Insert: Omit<Player, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<Player, 'id' | 'created_at'>>;
      };
      pubs: {
        Row: Pub;
        Insert: Omit<Pub, 'created_at'>;
        Update: Partial<Omit<Pub, 'id' | 'created_at'>>;
      };
      scores: {
        Row: Score;
        Insert: Omit<Score, 'id' | 'created_at' | 'updated_at'> & { id?: string };
        Update: Partial<Omit<Score, 'id' | 'player_id' | 'pub_id' | 'created_at'>>;
      };
    };
  };
};
