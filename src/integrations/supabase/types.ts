export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      attendance: {
        Row: {
          clock_in: string | null
          clock_out: string | null
          created_at: string | null
          date: string
          employee_id: string
          id: string
          marked_by: string | null
          notes: string | null
          overtime_hours: number | null
          status: Database["public"]["Enums"]["attendance_status"]
          working_hours: number | null
        }
        Insert: {
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string | null
          date?: string
          employee_id: string
          id?: string
          marked_by?: string | null
          notes?: string | null
          overtime_hours?: number | null
          status?: Database["public"]["Enums"]["attendance_status"]
          working_hours?: number | null
        }
        Update: {
          clock_in?: string | null
          clock_out?: string | null
          created_at?: string | null
          date?: string
          employee_id?: string
          id?: string
          marked_by?: string | null
          notes?: string | null
          overtime_hours?: number | null
          status?: Database["public"]["Enums"]["attendance_status"]
          working_hours?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: unknown | null
          resource_id: string | null
          resource_type: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: unknown | null
          resource_id?: string | null
          resource_type?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      departments: {
        Row: {
          created_at: string | null
          id: string
          manager_id: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          manager_id?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          manager_id?: string | null
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "departments_manager_id_fkey"
            columns: ["manager_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          address: string | null
          bank_account: string | null
          created_at: string | null
          created_by: string
          date_of_birth: string | null
          department_id: string
          email: string
          emergency_contact: string | null
          employee_id: string
          employee_type: Database["public"]["Enums"]["employee_type"]
          first_name: string
          id: string
          ifsc_code: string | null
          join_date: string
          last_name: string
          phone: string | null
          photo_url: string | null
          role_id: string
          salary_monthly: number | null
          status: Database["public"]["Enums"]["employee_status"]
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          address?: string | null
          bank_account?: string | null
          created_at?: string | null
          created_by: string
          date_of_birth?: string | null
          department_id: string
          email: string
          emergency_contact?: string | null
          employee_id: string
          employee_type?: Database["public"]["Enums"]["employee_type"]
          first_name: string
          id?: string
          ifsc_code?: string | null
          join_date?: string
          last_name: string
          phone?: string | null
          photo_url?: string | null
          role_id: string
          salary_monthly?: number | null
          status?: Database["public"]["Enums"]["employee_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          address?: string | null
          bank_account?: string | null
          created_at?: string | null
          created_by?: string
          date_of_birth?: string | null
          department_id?: string
          email?: string
          emergency_contact?: string | null
          employee_id?: string
          employee_type?: Database["public"]["Enums"]["employee_type"]
          first_name?: string
          id?: string
          ifsc_code?: string | null
          join_date?: string
          last_name?: string
          phone?: string | null
          photo_url?: string | null
          role_id?: string
          salary_monthly?: number | null
          status?: Database["public"]["Enums"]["employee_status"]
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      leave_requests: {
        Row: {
          approver_comment: string | null
          approver_id: string | null
          attachment_url: string | null
          created_at: string | null
          employee_id: string
          from_date: string
          id: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          status: Database["public"]["Enums"]["leave_status"]
          to_date: string
          total_days: number
          updated_at: string | null
        }
        Insert: {
          approver_comment?: string | null
          approver_id?: string | null
          attachment_url?: string | null
          created_at?: string | null
          employee_id: string
          from_date: string
          id?: string
          leave_type: Database["public"]["Enums"]["leave_type"]
          reason: string
          status?: Database["public"]["Enums"]["leave_status"]
          to_date: string
          total_days: number
          updated_at?: string | null
        }
        Update: {
          approver_comment?: string | null
          approver_id?: string | null
          attachment_url?: string | null
          created_at?: string | null
          employee_id?: string
          from_date?: string
          id?: string
          leave_type?: Database["public"]["Enums"]["leave_type"]
          reason?: string
          status?: Database["public"]["Enums"]["leave_status"]
          to_date?: string
          total_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leave_requests_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          related_id: string | null
          related_type: string | null
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          related_id?: string | null
          related_type?: string | null
          title: string
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          related_id?: string | null
          related_type?: string | null
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      payroll: {
        Row: {
          allowances: Json | null
          approver_comment: string | null
          approver_id: string | null
          basic: number
          created_at: string | null
          deductions: Json | null
          employee_id: string
          gross_pay: number
          hra: number | null
          id: string
          month: number
          net_pay: number
          overtime: number | null
          paid_at: string | null
          payment_method: string | null
          status: Database["public"]["Enums"]["payroll_status"]
          total_deductions: number | null
          transaction_id: string | null
          updated_at: string | null
          year: number
        }
        Insert: {
          allowances?: Json | null
          approver_comment?: string | null
          approver_id?: string | null
          basic: number
          created_at?: string | null
          deductions?: Json | null
          employee_id: string
          gross_pay: number
          hra?: number | null
          id?: string
          month: number
          net_pay: number
          overtime?: number | null
          paid_at?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["payroll_status"]
          total_deductions?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          year: number
        }
        Update: {
          allowances?: Json | null
          approver_comment?: string | null
          approver_id?: string | null
          basic?: number
          created_at?: string | null
          deductions?: Json | null
          employee_id?: string
          gross_pay?: number
          hra?: number | null
          id?: string
          month?: number
          net_pay?: number
          overtime?: number | null
          paid_at?: string | null
          payment_method?: string | null
          status?: Database["public"]["Enums"]["payroll_status"]
          total_deductions?: number | null
          transaction_id?: string | null
          updated_at?: string | null
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "payroll_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string
          id: string
          last_name: string
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name: string
          id: string
          last_name: string
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string
          id?: string
          last_name?: string
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          department_id: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          department_id: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          department_id?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "roles_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_employee_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      send_notification: {
        Args: {
          p_message: string
          p_related_id?: string
          p_related_type?: string
          p_title: string
          p_type: string
          p_user_id: string
        }
        Returns: string
      }
    }
    Enums: {
      app_role: "admin" | "hr" | "manager" | "employee"
      attendance_status: "present" | "absent" | "leave" | "half_day" | "late"
      employee_status: "active" | "inactive" | "on_leave" | "terminated"
      employee_type: "permanent" | "contract" | "intern"
      leave_status: "pending" | "approved" | "rejected"
      leave_type: "paid" | "unpaid" | "medical" | "casual" | "annual"
      payroll_status: "generated" | "approved" | "paid" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "hr", "manager", "employee"],
      attendance_status: ["present", "absent", "leave", "half_day", "late"],
      employee_status: ["active", "inactive", "on_leave", "terminated"],
      employee_type: ["permanent", "contract", "intern"],
      leave_status: ["pending", "approved", "rejected"],
      leave_type: ["paid", "unpaid", "medical", "casual", "annual"],
      payroll_status: ["generated", "approved", "paid", "rejected"],
    },
  },
} as const
