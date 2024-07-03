import { useState } from "react";

import ColumnContainer from "./ColumnContainer";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

export default function Board(props) {
  const [data, setData] = useState(props.data);

  // dnd handler
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragStart = (event) => {};

  const handleDragMove = (event) => {};
  
  const handleDragEnd = (event) => {};

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragMove={handleDragMove}
      onDragEnd={handleDragEnd}
    >
      <div className="m-auto mt-[100px] flex gap-4">
        <div className="flex gap-4">
          {data.map((e) => (
            <ColumnContainer key={e.columnId} data={e} />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
