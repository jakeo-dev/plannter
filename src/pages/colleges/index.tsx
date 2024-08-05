import CommonHead from "@/components/CommonHead";
import Header from "@/components/Header";
import LargeSideMenu from "@/components/LargeSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Colleges() {
  return (
    <>
      <CommonHead>
        <title>Plannter: Colleges</title>
      </CommonHead>

      <Header />

      <div className="flex h-full md:h-screen">
        <LargeSideMenu />

        <div
          id="collegesDiv"
          class="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0"
        >
          <div class="mb-12">
            <h2 class="text-lg font-Calistoga font-medium px-4 mb-3">
              Reach Colleges
            </h2>
            <ul id="listColleges"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddCollege(1)"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a reach college
            </button>
          </div>

          <div class="mb-12">
            <h2 class="text-lg font-Calistoga font-medium px-4 mb-3">
              Target Colleges
            </h2>
            <ul id="listColleges2"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddCollege(2)"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a target college
            </button>
          </div>

          <div class="mb-12">
            <h2 class="text-lg font-Calistoga font-medium px-4 mb-3">
              Safety Colleges
            </h2>
            <ul id="listColleges3"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddCollege(3)"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a safety college
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
