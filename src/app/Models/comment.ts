export interface Comment {
  id?: any;
  userId?: string;
  teacherId?: string;
  comment?: string;
  date?: Date;
  likes?: number;
  dislikes?: number;
  disabled?: boolean;
}
