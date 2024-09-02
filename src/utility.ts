import { GPASettings } from "./types";
import {
  faAtom,
  faAward,
  faBriefcase,
  faCalendarDay,
  faDesktop,
  faDumbbell,
  faGraduationCap,
  faHandshakeAngle,
  faHouseUser,
  faLandmarkFlag,
  faMagnifyingGlass,
  faMasksTheater,
  faMusic,
  faPalette,
  faPencil,
  faPlusMinus,
  faPuzzlePiece,
  faRankingStar,
  faUmbrellaBeach,
  faWrench,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

/**
 * Converts a letter grade to its corresponding GPA value.
 *
 * @param {string} grade - The letter grade (e.g., "A", "B+", "C-").
 * @param {boolean} usePlusMinus - Whether to consider plus/minus in the grade conversion.
 * @returns {number} The GPA value corresponding to the letter grade.
 */
export function letterToGPA(grade: string, usePlusMinus: boolean): number {
  if (usePlusMinus) {
    if (["A+", "A"].includes(grade)) return 4;
    else if (grade === "A-") return 3.7;
    else if (grade === "B+") return 3.3;
    else if (grade === "B") return 3;
    else if (grade === "B-") return 2.7;
    else if (grade === "C+") return 2.3;
    else if (grade === "C") return 2;
    else if (grade === "C-") return 1.7;
    else if (grade === "D+") return 1.3;
    else if (grade === "D") return 1;
    else if (grade === "D-") return 0;
    else if (grade === "F") return 0;
  } else {
    if (grade.includes("A")) return 4;
    else if (grade.includes("B")) return 3;
    else if (grade.includes("C")) return 2;
    else if (grade.includes("D")) return 1;
    else if (grade.includes("F")) return 0;
  }

  return 0;
}

/**
 * Converts a percentage grade to its corresponding letter grade.
 *
 * @param percentGrade - The percentage grade.
 * @returns The letter grade corresponding to the percentage.
 */
export function getLetter(percentGrade: number) {
  if (percentGrade >= 93) {
    return "A";
  } else if (percentGrade >= 90) {
    return "A-";
  } else if (percentGrade >= 87) {
    return "B+";
  } else if (percentGrade >= 83) {
    return "B";
  } else if (percentGrade >= 80) {
    return "B-";
  } else if (percentGrade >= 77) {
    return "C+";
  } else if (percentGrade >= 73) {
    return "C";
  } else if (percentGrade >= 70) {
    return "C-";
  } else if (percentGrade >= 67) {
    return "D+";
  } else if (percentGrade >= 63) {
    return "D";
  } else if (percentGrade >= 60) {
    return "D-";
  } else {
    return "F";
  }
}

/**
 * Converts an **OVERALL** difficulty rating to a descriptive text.
 *
 * @param difficulty - The difficulty level (0-6).
 * @returns A string describing the difficulty level.
 */
export function getOverallDifficultyText(difficulty: number) {
  if (difficulty < 0.5) {
    return "Effortless Coursework";
  } else if (difficulty < 1) {
    return "Easy Coursework";
  } else if (difficulty < 2) {
    return "Regular Coursework";
  } else if (difficulty < 3) {
    return "Hard Coursework";
  } else if (difficulty < 4) {
    return "Difficult Coursework";
  } else if (difficulty < 5) {
    return "Challenging Coursework";
  } else {
    return "Extreme Coursework";
  }
}

/**
 * Converts an **OVERALL** difficulty rating to a corresponding color class.
 *
 * @param difficulty - The difficulty level (0-6).
 * @returns The CSS classes corresponding to the difficulty level.
 */
export function getDifficultyColor(difficulty: number) {
  if (difficulty < 2) {
    return "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition";
  } else if (difficulty < 3) {
    return "bg-yellow-300 hover:bg-yellow-400 dark:bg-yellow-700/80 dark:hover:bg-yellow-600/80 text-gray-700 dark:text-gray-300 transition";
  } else if (difficulty < 4) {
    return "bg-orange-300 hover:bg-orange-400 dark:bg-orange-700/80 dark:hover:bg-orange-600/80 text-gray-700 dark:text-gray-300 transition";
  } else if (difficulty < 5) {
    return "bg-red-300 hover:bg-red-400 dark:bg-red-700/80 dark:hover:bg-red-600/80 text-gray-700 dark:text-gray-300 transition";
  } else {
    return "bg-pink-300 hover:bg-pink-400 dark:bg-pink-700/80 dark:hover:bg-pink-600/80 text-gray-700 dark:text-gray-300 transition";
  }
}

/**
 * Converts an **INDIVIDUAL** difficulty rating to a descriptive text.
 *
 * @param difficulty - The difficulty level (e.g., "0.25", "1.5").
 * @returns The corresponding descriptive text for the given difficulty level.
 */
export function getIndividualDifficultyText(difficulty: string) {
  if (difficulty == "0.25") {
    return "Effortless";
  } else if (difficulty == "0.5") {
    return "Easy";
  } else if (difficulty == "1.5") {
    return "Difficult";
  } else if (difficulty == "1.75") {
    return "Challenging";
  } else {
    return "";
  }
}

/**
 * Returns the descriptive text for the advancement level based on the provided level.
 *
 * @param advLevel - The advancement level (e.g., "2", "3.5", "4").
 * @returns The corresponding descriptive text for the given advancement level.
 */
export function getAdvLevelText(advLevel: string) {
  if (advLevel == "2") {
    return "Advanced";
  } else if (advLevel == "2.01") {
    return "Accelerated";
  } else if (advLevel == "3") {
    return "Honors";
  } else if (advLevel == "3.5") {
    return "College Prep";
  } else if (advLevel == "3.51") {
    return "Dual Enrollment";
  } else if (advLevel == "4") {
    return "AP";
  } else if (advLevel == "5") {
    return "IB";
  } else {
    return "";
  }
}

/**
 * Calculates the GPA weight based on the advancement level and GPA settings.
 *
 * @param gpaSettings - The GPA settings object containing weight mappings.
 * @param advancementLevel - The advancement level for the course.
 * @returns The GPA weight for the given advancement level.
 */
export function calculateWeights(
  gpaSettings: GPASettings,
  advancementLevel: number
) {
  const weights: { [key: string]: keyof GPASettings } = {
    "1.00": "noneWeight",
    "2.00": "advancedWeight",
    "2.01": "acceleratedWeight",
    "3.00": "honorsWeight",
    "3.50": "collegeWeight",
    "3.51": "dualWeight",
    "4.00": "apWeight",
    "5.00": "ibWeight",
  };

  return (gpaSettings[weights[advancementLevel.toFixed(2)]] || 0) as number;
}

/**
 * Returns the CSS class for the advancement level based on the provided level.
 *
 * @param advLevel - The advancement level (e.g., "2", "3.5", "4").
 * @returns The corresponding CSS class for the given advancement level.
 */
export function getAdvLevelColor(advLevel: string) {
  if (advLevel == "2" || advLevel == "2.01") {
    return "text-indigo-800/80 dark:text-indigo-300";
  } else if (advLevel == "3") {
    return "text-amber-700/90 dark:text-amber-300";
  } else if (advLevel == "3.5" || advLevel == "3.51") {
    return "text-red-800/80 dark:text-red-300";
  } else if (advLevel == "4") {
    return "text-blue-800/80 dark:text-blue-400";
  } else if (advLevel == "5") {
    return "text-sky-800/80 dark:text-sky-400";
  } else {
    return "hidden";
  }
}

/**
 * Returns the CSS class for the advancement level based on the provided level.
 *
 * @param category - The activity category
 * @returns The corresponding icon for the given category.
 */
export function getActivityIcon(category: string): IconDefinition {
  if (category == "Athletics") return faDumbbell;
  else if (category == "Award") return faAward;
  else if (category == "Club") return faPuzzlePiece;
  else if (category == "Competition") return faRankingStar;
  else if (category == "Employment") return faBriefcase;
  else if (category == "Event") return faCalendarDay;
  else if (category == "Internship") return faWrench;
  else if (category == "Math") return faPlusMinus;
  else if (category == "Music") return faMusic;
  else if (category == "Science") return faAtom;
  else if (category == "Summer Class") return faUmbrellaBeach;
  else if (category == "Technology") return faDesktop;
  else if (category == "Visual Arts") return faPalette;
  else if (category == "Performing Arts") return faMasksTheater;
  else if (category == "Personal Responsibility") return faHouseUser;
  else if (category == "Politics") return faLandmarkFlag;
  else if (category == "Research") return faMagnifyingGlass;
  else if (category == "Volunteering") return faHandshakeAngle;
  else if (category == "Writing") return faPencil;
  else return faGraduationCap;
}

/**
 * Returns the number of words
 *
 * @param string - The inputted string
 * @returns The number of words in the string
 */
export function wordCount(string: string) {
  // https://www.mediacollege.com/internet/javascript/text/count-words.html
  if (string.trim().length == 0) return 0;
  else {
    string = string
      .replaceAll("\n", " ")
      .replace(/(^\s*)|(\s*$)/gi, "")
      .replace(/[ ]{2,}/gi, " ")
      .replace(/\n /, "\n");
    return string.split(" ").length;
  }
}

/**
 * Convert month number to month name
 *
 * @param number - The month number
 * @returns The corresponding month name
 */
export function monthName(num: number) {
  if (num == 0) return "January";
  else if (num == 1) return "February";
  else if (num == 2) return "March";
  else if (num == 3) return "April";
  else if (num == 4) return "May";
  else if (num == 5) return "June";
  else if (num == 6) return "July";
  else if (num == 7) return "August";
  else if (num == 8) return "September";
  else if (num == 9) return "October";
  else if (num == 10) return "November";
  else if (num == 11) return "December";
  else return "";
}

/**
 * Get class name for deadline text from days until deadline, deadline date, and current date
 *
 * @param daysTil - Days until deadline
 * @param deadlineDate - Deadline date
 * @param currentDate - Current date
 * @returns Deadline class name
 */
export function deadlineClassName(
  daysTil: number,
  deadlineDate: number,
  currentDate: number
) {
  if (deadlineDate < currentDate) return ""; // deadline passed
  else if (deadlineDate == currentDate) return "text-red-700"; // deadline today
  else if (daysTil < 7) return "text-orange-700"; // deadline super soon
  else if (daysTil < 14) return "text-yellow-700"; // deadline soon
  else return ""; // deadline far
}

/**
 * Get deadline text from days until deadline, deadline date, and current date
 *
 * @param daysTil - Days until deadline
 * @param deadlineDate - Deadline date
 * @param currentDate - Current date
 * @returns Deadline text
 */
export function deadlineText(
  daysTil: number,
  deadlineDate: number,
  currentDate: number
) {
  if (deadlineDate < currentDate) return "Deadline passed"; // deadline passed
  else if (deadlineDate == currentDate)
    return "Deadline today"; // deadline today
  else if (daysTil < 2) return "Deadline tomorrow"; // deadline tomorrow
  else return daysTil + " days until deadline"; // deadline far
}

/**
 * Get color class name college app status
 *
 * @param status - College application status
 * @returns Status color class name
 */
export function statusColor(status: string) {
  if (status == "Considering")
    return "bg-gray-500 hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500";
  else if (status == "Applying")
    return "bg-gray-500 hover:bg-gray-400 dark:bg-gray-400 dark:hover:bg-gray-500";
  else if (status == "Applied")
    return "bg-sky-700/80 hover:bg-sky-600/80 dark:bg-sky-400/80 dark:hover:bg-sky-500/80";
  else if (status == "Accepted")
    return "bg-emerald-700/80 hover:bg-emerald-600/80 dark:bg-emerald-400/80 dark:hover:bg-emerald-500/80";
  else if (status == "Deferred")
    return "bg-violet-700/80 hover:bg-violet-600/80 dark:bg-violet-400/80 dark:hover:bg-violet-500/80";
  else if (status == "Waitlisted")
    return "bg-violet-700/80 hover:bg-violet-600/80 dark:bg-violet-400/80 dark:hover:bg-violet-500/80";
  else if (status == "Denied")
    return "bg-red-700/80 hover:bg-red-600/80 dark:bg-red-400/80 dark:hover:bg-red-500/80";
}
