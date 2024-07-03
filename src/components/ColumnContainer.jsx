import { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { SortableContext } from "@dnd-kit/sortable";
import clsx from "clsx";

import TaskCard from "./TaskCard";
import { classMappings } from "@/utils/classMappings";

function ColumnContainer(props) {
  const { column, handleCheckboxChange, editMode, isListview } = props;
  const [isTaskView, setIsTaskView] = useState(false);

  useEffect(() => {
    if(!isListview) setIsTaskView(false)
  }, [isListview]);

  const { setNodeRef } = useSortable({
    id: column.columnId,
    data: {
      type: "Column",
      ...column,
    },
  });

  function toggleTaskVisibility() {
    setIsTaskView(!isTaskView);
  }

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col bg-columnBackgroundColor ${classMappings[isListview].columnMain}`}
    >
      <div
        className={`flex bg-mainBackgroundColor text-md h-[60px] p-3 font-bold border-columnBackgroundColor ${classMappings[isListview].columnborder}`}
      >
        {isListview ? (
          <div
            onClick={toggleTaskVisibility}
            className="flex pr-4 cursor-pointer"
          >
            {isTaskView ? "-" : "+"}
          </div>
        ) : null}
        <div className="flex gap-2">{column.title}</div>
      </div>

      <div
        className={clsx(
          "flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto",
          isTaskView && "hidden"
        )}
      >
        <SortableContext id={column.columnId} items={column.tasks}>
          {column.tasks.map((task) => (
            <TaskCard
              key={task.taskId}
              task={task}
              columnId={column.columnId}
              handleCheckboxChange={handleCheckboxChange}
              editMode={editMode}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;
