import {db} from '@/config/firebaseConfig';
import Course from '@/types/Course';
import {collection, getDocs, query, where} from 'firebase/firestore';
import {createContext, PropsWithChildren, useCallback, useContext, useEffect, useState} from 'react';
import {useUserDetailContext} from './userDetailContext';

interface CourseListContextType {
  isLoading: boolean;
  courseList: Course[];
  addCourse: (newCourse: Course) => void;
  onReadChapter: (courseId: string, chapterIndex: number) => void;
}

const CourseListContext = createContext<CourseListContextType>({} as CourseListContextType);

type Props = PropsWithChildren;

export default function CourseListContextProvider({children}: Props) {
  const {userDetail, isLoading: isUserDetailLoading} = useUserDetailContext();

  const [courseList, setCourseList] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getCourseList = useCallback(async () => {
    setIsLoading(true);
    const q = query(collection(db, 'courses'), where('createdBy', '==', userDetail?.email));
    const querySnapshot = await getDocs(q);

    const newCourseList: Course[] = [];

    querySnapshot.forEach(doc => {
      newCourseList.push(doc.data() as Course);
    });

    setCourseList(newCourseList);
    setIsLoading(false);
  }, [userDetail?.email]);

  const addCourse = useCallback((newCourse: Course) => {
    setCourseList(state => [...state, newCourse]);
  }, []);

  const onReadChapter = useCallback(
    (courseId: string, chapterIndex: number) => {
      setCourseList(state => {
        return [
          ...state.map(course => {
            const completedChapters = course.completedChapters[userDetail?.uid] || [];

            const isNotReaded = course.courseId === courseId && !completedChapters.includes(chapterIndex);

            return isNotReaded
              ? {
                  ...course,
                  completedChapters: {
                    ...course.completedChapters,
                    [userDetail?.uid]: [...course.completedChapters[userDetail?.uid], chapterIndex]
                  }
                }
              : course;
          })
        ];
      });
    },
    [userDetail?.uid]
  );

  useEffect(() => {
    if (userDetail) {
      getCourseList();
    } else if (!isUserDetailLoading) {
      setIsLoading(false);
    }
  }, [getCourseList, isUserDetailLoading, userDetail]);

  return (
    <CourseListContext.Provider value={{isLoading, courseList, addCourse, onReadChapter}}>
      {children}
    </CourseListContext.Provider>
  );
}

export function useCourseListContext() {
  const courseListContext = useContext(CourseListContext);
  return courseListContext;
}
