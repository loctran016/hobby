export type Muscles =
  | 'Upper chest'
  | 'Middle chest'
  | 'Lower chest'
  | 'Front delts'
  | 'Side delts'
  | 'Rear delts'
  | 'Abs'
  | 'Lats'
  | 'Traps'
  | 'Lower back'
  | 'Forearm'
  | 'Triceps'
  | 'Biceps';

export interface ExerciseRecord {
  id: number;
  date: string; // timestamp
  exercisee: string;
  created_at: string; // timestamp
  equipment: string;
  sets: number[];
  muscles: Muscles[];
}

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: ExerciseRecord;
        Insert: Omit<ExerciseRecord, 'id' | 'created_at'>;
        Update: Partial<Omit<ExerciseRecord, 'id' | 'created_at'>>;
      };
    };
  };
}
