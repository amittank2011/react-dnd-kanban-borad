import { useState } from "react";
import clsx from "clsx";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import TaskList from "./TaskList";
import ArchiveIcon from "@/icons/ArchiveIcon";
import Calendar from "@/icons/calendar";
import UnarchiveIcon from "@/icons/UnarchiveIcon";

function TaskCard(props) {
  const { task, columnId, handleCheckboxChange, editMode } = props;

  const [listView, setListView] = useState(false);

  const handleListView = () => {
    setListView(!listView);
  };

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.taskId,
    data: {
      type: "Task",
      task,
      columnId,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className={clsx(
        "bg-mainBackgroundColor p-2.5 items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task",
        isDragging && "opacity-30 "
      )}
    >
      <div className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="flex"
        >
          <p>{task.title}</p>
          <time className=" flex ml-auto mr-2 text-slate-500">
            <div className="flex gap-2 h-5 w-5 my-auto">
              <Calendar />
            </div>
            {task.dueDate}
          </time>
        </div>

        {task?.subTask ? (
          <div className="flex" onClick={handleListView}>
            <div className="flex gap-2 h-5 w-5 my-auto">
              {listView ? <UnarchiveIcon /> : <ArchiveIcon />}
            </div>
            <p className="my-auto ml-3">({task?.subTask?.length})</p>
          </div>
        ) : null}

        <div
          className={clsx(
            "flex flex-col gap-1 ml-[16px]",
            !listView && "hidden"
          )}
        >
          {task?.subTask?.map((e) => (
            <TaskList
              key={e.subTaskId}
              data={e}
              taskId={task.taskId}
              columnId={columnId}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
