import { Dispatch, SetStateAction } from "react";

export interface Stages {
  "Freshman": Stage;
  "Sophomore": Stage;
  "Junior": Stage;
  "Senior": Stage;
  "Other": Stage;
}

export interface Stage {
  gradeLevel: number | null;
  name: "Freshman" | "Sophomore" | "Junior" | "Senior" | "Other";
  courses?: { [key: string]: Course };
  difficulty?: number;
}

export interface Course {
  uuid: string,
  name: string;
  advancementLevel: number;
  difficulty: number;
  subject: string;
  scores?: {
    firstSemester: Grade;
    secondSemester: Grade;
  };
}

export interface Grade {
  letterGrade: string;
  percentGrade: number;
}

export interface AddCourseModalProps {
  addCourseVisible: boolean;
  setAddCourseVisible: Dispatch<SetStateAction<boolean>>;
  addCourse: (course: Course) => void;
}

export interface EditCourseModalProps {
  editCourseVisible: boolean;
  setEditCourseVisible: Dispatch<SetStateAction<boolean>>;
  editCourse: (course: Course) => void;
  course: Course | null
}

export interface GPASettings {
  usePlusMinus: boolean;
  advancedWeight: number;
  honorsWeight: number;
  collegeWeight: number;
  apWeight: number;
  ibWeight: number;
}
