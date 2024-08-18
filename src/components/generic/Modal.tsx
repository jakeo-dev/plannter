import {
  faCheck,
  faPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Modal(props: {
  modalVisible: boolean;
  onSubmit: () => void;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-black/40 flex justify-center items-center fixed top-0 left-0 z-30 w-full h-full overflow-auto ${
        props.modalVisible ? "visibleFade" : "invisibleFade"
      }`}
    >
      <div className="bg-gray-100 dark:bg-gray-800 relative rounded-xl w-11/12 md:max-w-2xl shadow-md px-8 py-8 md:px-11 md:py-10">
        <button
          className="absolute top-6 right-7 text-lg hover:text-gray-500 transition"
          onClick={() => {
            props.onClose();
          }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <h1 className="text-xl font-medium mb-6">{props.title}</h1>

        {props.children}

        <button
          className="buttonPrimary"
          onClick={(e) => {
            e.preventDefault();
            props.onSubmit();
          }}
        >
          {props.title.toLocaleLowerCase().startsWith("add") ? (
            <FontAwesomeIcon icon={faPlus} className="mr-1 md:mr-1.5" />
          ) : (
            <FontAwesomeIcon icon={faCheck} className="mr-1 md:mr-1.5" />
          )}
          {props.title}
        </button>

        <button
          className="buttonSecondary"
          onClick={() => {
            props.onClose();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
