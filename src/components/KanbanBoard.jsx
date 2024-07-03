import React, { useEffect, useMemo, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import ColumnContainer from "./ColumnContainer";
import TaskCard from "./TaskCard";
import { classMappings } from "@/utils/classMappings";

const KanbanBoard = React.memo((props) => {
  const [activeTask, setActiveTask] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { isListview } = props;

  const [data, setData] = useState(props.data);

  const sensors = useSensors(useSensor(PointerSensor));

  function onDragStart(event) {
    if (event.active.id !== activeTask)
      setActiveTask(event.active.data.current.task);
    return;
  }

  function onDragOver(event) {
    const { active, over } = event;

    if (!activeTask || !over || !active || activeTask.taskId !== active.id) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activeColumnId = active.data.current.columnId;
    const overColumnId = over.data.current.columnId;

    const type = over.data.current.type;

    const tasks = data.map((e) => e);

    const activeColumn = tasks.find((e) => e.columnId === activeColumnId);
    const overColumn = tasks.find((e) => e.columnId === overColumnId);

    if (!activeColumn || !overColumn) {
      return;
    }

    const activeIndex = activeColumn.tasks.findIndex(
      (e) => e.taskId === activeId
    );
    const overIndex =
      type === "Column"
        ? 0
        : overColumn.tasks.findIndex((e) => e.taskId === overId);

    if (activeIndex < 0) {
      return;
    }

    if (activeColumnId === overColumnId) {
      activeColumn.tasks = arrayMove(
        activeColumn.tasks,
        activeIndex,
        overIndex
      );
    } else {
      overColumn.tasks.splice(
        overIndex,
        0,
        activeColumn.tasks.splice(activeIndex, 1)[0]
      );
    }

    setData(tasks);
    return;
  }

  function onDragEnd(event) {
    setActiveTask(null);
    return;
  }

  const handleCheckboxChange = (eventData) => async (event) => {
    setEditMode(true);
    const { checked } = event.target;
    const { columnId, taskId, id } = eventData;

    const tasks = data.map((e) => e);

    const subTask = tasks
      .find((e) => e.columnId === columnId)
      ?.tasks?.find((e) => e.taskId === taskId)
      ?.subTask.find((e) => e.subTaskId === id);

    if (subTask) subTask.check = checked;

    setData(tasks);
    setEditMode(false);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <div
        className={`m-auto ${classMappings[isListview].mainView} mt-[100px]`}
      >
        <SortableContext items={data.map((e) => e.columnId)}>
          {data.map((e) => (
            <ColumnContainer
              key={e.columnId}
              column={e}
              handleCheckboxChange={handleCheckboxChange}
              editMode={editMode}
              isListview={isListview}
            />
          ))}
        </SortableContext>
      </div>

      <DragOverlay>
        {activeTask && (
          <TaskCard
            task={activeTask}
            handleCheckboxChange={handleCheckboxChange}
            editMode={editMode}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
});

export default KanbanBoard;
