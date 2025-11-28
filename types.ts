export type PageId = 'home' | 'about' | 'materials' | 'workshops' | 'contact';

export interface ResourceItem {
  id: string;
  title: string;
  description: string;
  type: 'pdf' | 'video' | 'link' | 'doc';
  date: string;
  downloadUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  date: string;
  content: string;
  tag: string;
}

export enum ModelType {
  GEMINI_FLASH = 'gemini-2.5-flash',
  GEMINI_PRO = 'gemini-3-pro-preview',
  IMAGE_GEN = 'gemini-2.5-flash-image',
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
  timestamp: number;
  isLoading?: boolean;
}