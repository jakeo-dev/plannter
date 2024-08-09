import CommonHead from "@/components/CommonHead";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Essays() {
  return (
    <>
      <CommonHead>
        <title>Plannter: Essays</title>
      </CommonHead>

      <div
        id="essaysDiv"
        className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-40 md:pt-28 md:pb-14 mt-8 md:mt-0"
      >
        <div className="mb-12">
          <h2 className="text-lg font-Calistoga font-medium px-4 mb-3">
            Essays
          </h2>
          <ul id="listEssays"></ul>
          <button
            id="addEssayBtn"
            className="text-gray-100 dark:text-gray-900 border-2 rounded-md bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 border-transparent w-full text-left transition px-3 py-2"
          >
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Write an essay
          </button>
        </div>
      </div>
    </>
  );
}
