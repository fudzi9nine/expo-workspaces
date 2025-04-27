import CourseChapter from './CourseChapter';

export default interface Course {
  banner_image: string;
  category: string;
  chapters: CourseChapter[];
  courseName: string;
  description: string;
  createdBy: string;
  createdOn: Date;
  courseId: string;
  completedChapters: {[userUid: string]: number[]};
  enrolledUsers: string[];
}
