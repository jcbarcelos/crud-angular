import { ICourses } from "./ICourses";

export interface ICoursePage {
  courses: ICourses[];
  totalElements: number;
  totalPages: number;
}
