import { ILesson } from "./ILesson";

export interface ICourses {
  id: string;
  category: string;
  name: string;
  status: string;
  lessons?: ILesson[];
}
