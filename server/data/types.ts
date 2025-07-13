export interface Question {
  id: number;
  text: string;
  type: number;
}

export interface EnneagramType {
  id: number;
  name: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
}
