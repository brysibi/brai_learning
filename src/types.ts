
export interface Article {
  id: string;
  title: string;
  section: string;
  imageUrl: string;
  abstract: string;
  content: string;
  publishedDate: string;
}

export enum Section {
  NewsAI = 'News AI',
  VibeCoding = 'Vibe Coding',
  ContentCreation = 'Content Creation & AI Avatars',
  OpenSource = 'Progetti Open Source',
  Creativity = 'Creatività e Proposte Open Source'
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
