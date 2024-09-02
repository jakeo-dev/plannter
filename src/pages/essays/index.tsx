import { Dispatch, SetStateAction, useState } from "react";

import CommonHead from "@/components/CommonHead";

import FolderElem from "@/components/essays/FolderElem";
import { Essay, Folder, Folders } from "@/types";
import EditEssayModal from "@/components/essays/modals/EditEssayModal";

export default function Essays({
  folders,
  setFolders,
}: {
  folders: Folders;
  setFolders: Dispatch<SetStateAction<Folders>>;
}) {
  const [activeFolder, setActiveFolder] = useState<Folder | null>(null);
  const [activeEssay, setActiveEssay] = useState<Essay | null>(null);

  const [editEssayVisible, setEditEssayVisible] = useState(false);

  return (
    <>
      <CommonHead>
        <title>Plannter: Essays</title>
      </CommonHead>

      <EditEssayModal
        editEssayVisible={editEssayVisible}
        setEditEssayVisible={setEditEssayVisible}
        essay={activeEssay}
        saveEssay={(updatedEssay: Essay) => {
          if (!activeFolder) return;
          if (!activeEssay) return;

          const newFolders = JSON.parse(JSON.stringify(folders)) as Folders; // make a deep copy
          const currentFolder = newFolders[activeFolder.name];
          if (!currentFolder.essays) return;

          currentFolder.essays[activeEssay.uuid] = updatedEssay;

          setFolders(newFolders);
          localStorage.setItem("folders", JSON.stringify(newFolders));
        }}
      />

      <div className="w-full overflow-y-scroll px-4 md:px-8 lg:px-16 xl:px-32 md:pt-28 md:pb-28 mt-8 md:mt-0 flex flex-col gap-12">
        {(Object.values(folders) as Folder[]).map((folder) => (
          <FolderElem
            key={folder.name}
            folder={folder}
            setActiveFolder={setActiveFolder}
            setActiveEssay={setActiveEssay}
            setEditEssayVisible={setEditEssayVisible}
            setFolder={(folder: Folder) => {
              const newFolders = JSON.parse(JSON.stringify(folders)) as Folders; // make a deep copy

              newFolders[folder.name] = folder;
              setFolders(newFolders);
              localStorage.setItem("folders", JSON.stringify(newFolders));
            }}
            addEssay={(newEssay: Essay, activeFolder: Folder) => {
              if (!activeFolder) return;

              const newFolders = JSON.parse(JSON.stringify(folders)) as Folders; // make a deep copy
              const currentFolder = newFolders[activeFolder.name];

              if (!currentFolder.essays) {
                currentFolder.essays = {};
              }
              currentFolder.essays[newEssay.uuid] = newEssay;

              setFolders(newFolders);
              localStorage.setItem("folders", JSON.stringify(newFolders));
            }}
          />
        ))}
      </div>
    </>
  );
}
