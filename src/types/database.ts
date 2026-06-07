// TypeScript definitions that strictly mirror supabase/schema.sql.
//
// Keep this in lock-step with the SQL. Once the Supabase CLI is wired up you can
// regenerate the equivalent with `supabase gen types typescript`, but a curated,
// hand-written version is clearer to read and review during early development.

export type LessonStatus = "in_progress" | "completed";
export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

/** The cosmetic loadout stored as jsonb on profiles.equipped. */
export type EquippedLoadout = {
  flair: string | null;
  title: string | null;
  banner: string | null;
  border: string | null;
};

// Row / Insert / Update triplets per table (the shape supabase-js expects).
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string | null;
          display_name: string | null;
          avatar_url: string | null;
          xp: number;
          gold: number;
          streak: number;
          last_active_day: string | null;
          completed: string[];
          achievements: string[];
          active_quest: string | null;
          github_login: string | null;
          github_installation_id: number | null;
          github_repo: string | null;
          weekly_xp: number;
          league_tier: number;
          season_start: string | null;
          cosmetics: string[];
          talents: string[];
          equipped: EquippedLoadout;
          streak_freezes: number;
          guild_id: string | null;
          guild_name: string | null;
          goal: string | null;
          onboarded: boolean;
          daily_challenge_claimed: string | null;
          daily_challenge_streak: number;
          daily_challenge_best: number;
          rev: number;
          is_pro: boolean;
          stripe_customer_id: string | null;
          pro_since: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          display_name?: string | null;
          avatar_url?: string | null;
          xp?: number;
          gold?: number;
          streak?: number;
          last_active_day?: string | null;
          completed?: string[];
          achievements?: string[];
          active_quest?: string | null;
          github_login?: string | null;
          github_installation_id?: number | null;
          github_repo?: string | null;
          weekly_xp?: number;
          league_tier?: number;
          season_start?: string | null;
          cosmetics?: string[];
          talents?: string[];
          equipped?: EquippedLoadout;
          streak_freezes?: number;
          guild_id?: string | null;
          guild_name?: string | null;
          goal?: string | null;
          onboarded?: boolean;
          daily_challenge_claimed?: string | null;
          daily_challenge_streak?: number;
          daily_challenge_best?: number;
          rev?: number;
          is_pro?: boolean;
          stripe_customer_id?: string | null;
          pro_since?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      courses: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          emoji: string;
          gradient: string;
          tagline: string;
          sort_order: number;
          is_published: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          description?: string;
          emoji?: string;
          gradient?: string;
          tagline?: string;
          sort_order?: number;
          is_published?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["courses"]["Insert"]>;
        Relationships: [];
      };
      lessons: {
        Row: {
          id: string;
          course_id: string;
          slug: string;
          title: string;
          blurb: string;
          xp: number;
          gold: number;
          sort_order: number;
          content: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          course_id: string;
          slug: string;
          title: string;
          blurb?: string;
          xp?: number;
          gold?: number;
          sort_order?: number;
          content?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["lessons"]["Insert"]>;
        Relationships: [];
      };
      user_progress: {
        Row: {
          id: string;
          user_id: string;
          lesson_id: string;
          status: LessonStatus;
          attempts: number;
          xp_awarded: number;
          best_code: string | null;
          completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          lesson_id: string;
          status?: LessonStatus;
          attempts?: number;
          xp_awarded?: number;
          best_code?: string | null;
          completed_at?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["user_progress"]["Insert"]>;
        Relationships: [];
      };
      achievements: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          icon: string;
          rarity: AchievementRarity;
          reward_xp: number;
          reward_gold: number;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          slug: string;
          title: string;
          description?: string;
          icon?: string;
          rarity?: AchievementRarity;
          reward_xp?: number;
          reward_gold?: number;
          sort_order?: number;
        };
        Update: Partial<Database["public"]["Tables"]["achievements"]["Insert"]>;
        Relationships: [];
      };
      user_achievements: {
        Row: {
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["user_achievements"]["Insert"]
        >;
        Relationships: [];
      };
      push_subscriptions: {
        Row: {
          id: string;
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          endpoint: string;
          p256dh: string;
          auth: string;
        };
        Update: Partial<
          Database["public"]["Tables"]["push_subscriptions"]["Insert"]
        >;
        Relationships: [];
      };
      follows: {
        Row: {
          follower_id: string;
          following_id: string;
          created_at: string;
        };
        Insert: {
          follower_id: string;
          following_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["follows"]["Insert"]>;
        Relationships: [];
      };
      duels: {
        Row: {
          id: string;
          challenger_id: string;
          opponent_id: string;
          goal_lessons: number;
          challenger_progress: number;
          opponent_progress: number;
          status: string;
          ends_at: string;
          created_at: string;
        };
        Insert: {
          challenger_id: string;
          opponent_id: string;
          goal_lessons?: number;
          challenger_progress?: number;
          opponent_progress?: number;
          status?: string;
          ends_at: string;
        };
        Update: Partial<Database["public"]["Tables"]["duels"]["Insert"]>;
        Relationships: [];
      };
      stripe_events: {
        Row: {
          id: string;
          type: string;
          received_at: string;
        };
        Insert: {
          id: string;
          type: string;
          received_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["stripe_events"]["Insert"]>;
        Relationships: [];
      };
      study_buddies: {
        Row: {
          id: string;
          user_id: string;
          buddy_id: string;
          pair_streak: number;
          last_advanced: string | null;
          created_at: string;
        };
        Insert: {
          user_id: string;
          buddy_id: string;
          pair_streak?: number;
          last_advanced?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["study_buddies"]["Insert"]>;
        Relationships: [];
      };
      guild_boss: {
        Row: {
          id: string;
          guild_id: string;
          week: string;
          boss_id: string;
          total_damage: number;
          defeated: boolean;
          created_at: string;
        };
        Insert: {
          guild_id: string;
          week: string;
          boss_id: string;
          total_damage?: number;
          defeated?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["guild_boss"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      contribute_guild_boss_damage: {
        Args: {
          p_guild_id: string;
          p_week: string;
          p_boss_id: string;
          p_damage: number;
        };
        Returns: number;
      };
    };
    Enums: {
      lesson_status: LessonStatus;
      achievement_rarity: AchievementRarity;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Handy row aliases for app code.
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Course = Database["public"]["Tables"]["courses"]["Row"];
export type LessonRow = Database["public"]["Tables"]["lessons"]["Row"];
export type UserProgress = Database["public"]["Tables"]["user_progress"]["Row"];
export type AchievementRow = Database["public"]["Tables"]["achievements"]["Row"];
export type UserAchievement =
  Database["public"]["Tables"]["user_achievements"]["Row"];
export type StudyBuddy =
  Database["public"]["Tables"]["study_buddies"]["Row"];
export type GuildBoss =
  Database["public"]["Tables"]["guild_boss"]["Row"];
