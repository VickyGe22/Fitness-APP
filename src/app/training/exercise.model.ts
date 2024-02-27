export interface ExerciseRecord {
    id: string;
    name: string;
    duration: number;
    calories: number;
    date?: String | Date;
    state?: 'completed' | 'cancelled' | null;
  }
  