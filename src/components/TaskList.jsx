import api from "@/service/api";

function TaskList(props) {
  const { data, taskId, columnId, handleCheckboxChange } = props;

  return (
    <label className="flex items-center space-x-2">
      <input
        type="checkbox"
        id={data.id}
        checked={data.check}
        onChange={handleCheckboxChange({
          taskId,
          columnId,
          id: data.subTaskId,
        })}
        className="form-checkbox h-4 w-4 text-blue-600 rounded-xl cursor-pointer"
      />
      <span className="text-gray-700">{data.title}</span>{" "}
    </label>
  );
}

export default TaskList;
