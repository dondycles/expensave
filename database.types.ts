export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_total_money: {
        Row: {
          created_at: string
          date_and_user: string
          id: number
          total: number | null
          updated_at: string
          user: string | null
        }
        Insert: {
          created_at?: string
          date_and_user: string
          id?: number
          total?: number | null
          updated_at?: string
          user?: string | null
        }
        Update: {
          created_at?: string
          date_and_user?: string
          id?: number
          total?: number | null
          updated_at?: string
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_daily_total_money_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      logs: {
        Row: {
          action: string | null
          created_at: string
          current_total_money: number | null
          id: string
          last_data: Json | null
          latest_data: Json | null
          money: string | null
          user: string
        }
        Insert: {
          action?: string | null
          created_at?: string
          current_total_money?: number | null
          id?: string
          last_data?: Json | null
          latest_data?: Json | null
          money?: string | null
          user?: string
        }
        Update: {
          action?: string | null
          created_at?: string
          current_total_money?: number | null
          id?: string
          last_data?: Json | null
          latest_data?: Json | null
          money?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_logs_money_fkey"
            columns: ["money"]
            isOneToOne: false
            referencedRelation: "moneys"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_logs_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      moneys: {
        Row: {
          amount: number
          created_at: string
          id: string
          name: string
          opaque_color: string | null
          trans_color: string | null
          user: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          name: string
          opaque_color?: string | null
          trans_color?: string | null
          user?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          name?: string
          opaque_color?: string | null
          trans_color?: string | null
          user?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_moneys_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      users: {
        Row: {
          created_at: string
          id: string
          isPremium: boolean | null
          username: string
        }
        Insert: {
          created_at?: string
          id?: string
          isPremium?: boolean | null
          username: string
        }
        Update: {
          created_at?: string
          id?: string
          isPremium?: boolean | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      manila_date: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      total_money: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
