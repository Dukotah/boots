// TypeScript definitions that strictly mirror supabase/schema.sql.
//
// Keep this in lock-step with the SQL. Once the Supabase CLI is wired up you can
// regenerate the equivalent with `supabase gen types typescript`, but a curated,
// hand-written version is clearer to read and review during early development.

export type LessonStatus = "in_progress" | "completed";
export type AchievementRarity = "common" | "rare" | "epic" | "legendary";

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
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
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
