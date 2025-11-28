export enum ServiceType {
  EMPLOYMENT = 'Employment Agency',
  INSURANCE = 'Insurance Agency',
  MANAGEMENT = 'Management Services',
  IT = 'Information Technology'
}

export interface ChecklistItem {
  id: string;
  task: string;
  description: string;
  isCompleted: boolean;
}

export interface ChecklistResponse {
  title: string;
  items: Array<{ task: string; description: string }>;
}

export interface NavItem {
  label: string;
  id: string;
}

export interface ServiceInfo {
  id: ServiceType;
  title: string;
  iconName: string;
  shortDesc: string;
  fullDesc: string;
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  company?: string;
}