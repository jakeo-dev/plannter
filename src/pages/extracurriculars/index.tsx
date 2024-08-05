import CommonHead from "@/components/CommonHead";
import Header from "@/components/Header";
import LargeSideMenu from "@/components/LargeSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Extracurriculars() {
  return (
    <>
      <CommonHead>
        <title>Plannter: Extracurriculars</title>
      </CommonHead>

      <Header />

      <div className="flex h-full md:h-screen">
        <LargeSideMenu />

        <div
          id="actsDiv"
          class="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0"
        >
          <div class="mb-12">
            <h2 class="text-lg font-Calistoga font-medium px-4 mb-3">
              Major Activities
            </h2>
            <ul id="listActs" class="lg:grid lg:grid-cols-2 gap-3"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddAct(1)"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a major activity
            </button>
          </div>

          <div class="mb-12">
            <h2 class="text-lg font-Calistoga font-medium px-4 mb-3">
              Moderate Activities
            </h2>
            <ul id="listActs2" class="lg:grid lg:grid-cols-2 gap-3"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddAct(2)"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a moderate activity
            </button>
          </div>

          <div class="mb-12">
            <h2 class="text-lg font-Calistoga font-medium px-4 mb-3">
              Minor Activities
            </h2>
            <ul id="listActs3" class="lg:grid lg:grid-cols-2 gap-3"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddAct(3)"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a minor activity
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
