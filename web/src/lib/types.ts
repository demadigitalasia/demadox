// Tipe kontrak DEMA DOX — mock-first.
// Backend nanti WAJIB mengikuti bentuk ini (lihat FRONTEND.md §4).

export type Plan = "free" | "starter" | "pro";
export type PrdStatus = "draft" | "ready";
export type Priority = "P0" | "P1" | "P2";
export type TaskLabel = "FE" | "BE" | "DB" | "AI";

export interface Quota {
  prdUsed: number;
  prdLimit: number;
  chatUsed: number;
  chatLimit: number;
  plan: Plan;
}

export interface PrdSection {
  key: string;
  title: string;
  contentMd: string;
  order: number;
}

export interface Feature {
  id: string;
  code: string;
  name: string;
  priority: Priority;
  estimate: string;
  dependsOn?: string;
}

export interface TaskItem {
  id: string;
  code: string;
  featureCode: string;
  title: string;
  detail: string;
  acceptance: string[];
  label: TaskLabel;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export interface Prd {
  id: string;
  title: string;
  idea: string;
  category: string;
  stack: string;
  status: PrdStatus;
  sections: PrdSection[];
  features: Feature[];
  tasks: TaskItem[];
  chat: ChatMessage[];
  createdAt: string;
  updatedAt: string;
}
