import { Dispatch, SetStateAction } from "react";

// course types

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

export interface GPASettings {
  usePlusMinus: boolean;
  noneWeight: number;
  advancedWeight: number;
  acceleratedWeight: number;
  honorsWeight: number;
  collegeWeight: number;
  dualWeight: number;
  apWeight: number;
  ibWeight: number;
}

export interface AddCourseModalProps {
  addCourseVisible: boolean;
  setAddCourseVisible: Dispatch<SetStateAction<boolean>>;
  addCourse: (course: Course) => void;
}

export interface EditCourseModalProps {
  editCourseVisible: boolean;
  setEditCourseVisible: Dispatch<SetStateAction<boolean>>;
  course: Course | null;
  saveCourse: (course: Course) => void;
}

export interface ChangeGPAModalProps {
  changeGPAVisible: boolean;
  setChangeGPAVisible: Dispatch<SetStateAction<boolean>>;
  gpaSettings: GPASettings | null;
  saveGPASettings: (newGPASettings: GPASettings) => void;
}

// activity types

export interface Strengths {
  "Major": Strength;
  "Moderate": Strength;
  "Minor": Strength;
}

export interface Strength {
  level: number | null;
  name: "Major" | "Moderate" | "Minor";
  activities?: { [key: string]: Activity };
}

export interface Activity {
  uuid: string,
  name: string;
  description: string;
  category: string;
}

export interface AddActivityModalProps {
  addActivityVisible: boolean;
  setAddActivityVisible: Dispatch<SetStateAction<boolean>>;
  addActivity: (activity: Activity) => void;
}

export interface EditActivityModalProps {
  editActivityVisible: boolean;
  setEditActivityVisible: Dispatch<SetStateAction<boolean>>;
  activity: Activity | null;
  saveActivity: (activity: Activity) => void;
}