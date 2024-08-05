import CommonHead from "@/components/CommonHead";
import Header from "@/components/Header";
import LargeSideMenu from "@/components/LargeSideMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Tests() {
  return (
    <>
      <CommonHead>
        <title>Plannter: Tests</title>
      </CommonHead>

      <Header />

      <div className="flex h-full md:h-screen">
        <LargeSideMenu />

        <div
          id="testsDiv"
          class="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0"
        >
          <div class="mb-12">
            <div class="font-medium px-4">
              <h2 class="text-lg font-Calistoga">Tests</h2>
              <div class="block mb-3">
                <button
                  class="listAttr hidden"
                  id="bestSAT"
                  onclick="openBestSAT()"
                ></button>
                <button
                  class="listAttr hidden"
                  id="bestACT"
                  onclick="openBestACT()"
                ></button>
                <button
                  class="listAttr hidden"
                  id="favoredTest"
                  onclick="openFavoredTest()"
                ></button>
              </div>
            </div>
            <ul id="listTests"></ul>
            <button
              class="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
              onclick="openAddTest()"
            >
              <FontAwesomeIcon icon={faPlus} className="mr-1" />
              Add a test
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
