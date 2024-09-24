import { ICourses } from "./ICourses";

export interface CoursePage {
  courses: ICourses[];
  totalElements: number;
  totalPages: number;
}
