import { Dispatch, SetStateAction } from "react";

export interface ChangeGPAModalProps {
  changeGPAVisible: boolean;
  setChangeGPAVisible: Dispatch<SetStateAction<boolean>>;
  gpaSettings: GPASettings | null;
  saveGPASettings: (newGPASettings: GPASettings) => void;
}

export interface ImportDataModalProps {
  importDataVisible: boolean;
  setImportDataVisible: Dispatch<SetStateAction<boolean>>;
}

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
  uuid: string;
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
  currentStageName: string;
  addCourse: (course: Course) => void;
}

export interface EditCourseModalProps {
  editCourseVisible: boolean;
  setEditCourseVisible: Dispatch<SetStateAction<boolean>>;
  currentStageName: string;
  course: Course | null;
  saveCourse: (course: Course) => void;
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
  uuid: string;
  name: string;
  description: string;
  category: string;
}

export interface AddActivityModalProps {
  addActivityVisible: boolean;
  setAddActivityVisible: Dispatch<SetStateAction<boolean>>;
  currentStrengthName: string;
  addActivity: (activity: Activity) => void;
}

export interface EditActivityModalProps {
  editActivityVisible: boolean;
  setEditActivityVisible: Dispatch<SetStateAction<boolean>>;
  currentStrengthName: string;
  activity: Activity | null;
  saveActivity: (activity: Activity) => void;
}

// test types

export interface Groups {
  "All": Group;
}

export interface Group {
  level: number | null;
  name: "All";
  tests?: { [key: string]: Test };
}

export interface Test {
  uuid: string;
  name: string;
  type: string;
  subType: string;
  month: string;
  year: number;
  score: number;
  readScore: number;
  mathScore: number;
}

export interface AddTestModalProps {
  addTestVisible: boolean;
  setAddTestVisible: Dispatch<SetStateAction<boolean>>;
  addTest: (test: Test) => void;
}

export interface EditTestModalProps {
  editTestVisible: boolean;
  setEditTestVisible: Dispatch<SetStateAction<boolean>>;
  test: Test | null;
  saveTest: (test: Test) => void;
}

// essay types

export interface Folders {
  "All": Folder;
}

export interface Folder {
  level: number | null;
  name: "All";
  essays?: { [key: string]: Essay };
}

export interface Essay {
  uuid: string;
  name: string;
  paper: string;
  status: string;
  notes: string;
  lastEdited?: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
  };
}

export interface EditEssayModalProps {
  editEssayVisible: boolean;
  setEditEssayVisible: Dispatch<SetStateAction<boolean>>;
  essay: Essay | null;
  saveEssay: (essay: Essay) => void;
}

// college types

export interface Ranks {
  "Reach": Rank;
  "Target": Rank;
  "Safety": Rank;
}

export interface Rank {
  level: number | null;
  name: "Reach" | "Target" | "Safety";
  colleges?: { [key: string]: College };
}

export interface College {
  uuid: string;
  name: string;
  location: string;
  chance: number;
  deadline: {
    day: number;
    month: number;
    year: number;
  };
  status: string;
}

export interface AddCollegeModalProps {
  addCollegeVisible: boolean;
  setAddCollegeVisible: Dispatch<SetStateAction<boolean>>;
  currentRankName: string;
  addCollege: (college: College) => void;
}

export interface EditCollegeModalProps {
  editCollegeVisible: boolean;
  setEditCollegeVisible: Dispatch<SetStateAction<boolean>>;
  currentRankName: string;
  college: College | null;
  saveCollege: (college: College) => void;
}