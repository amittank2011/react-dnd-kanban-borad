const task = [
  {
    columnId: "todo",
    title: "To-Do",
    tasks: [
      {
        taskId: "task1",
        title: "Task 1",
        dueDate: "Sunday",
        subTask: [
          { subTaskId: "1", title: "subTask1", check: false },
          { subTaskId: "2", title: "subTask2", check: false },
          { subTaskId: "3", title: "subTask3", check: false },
        ],
      },
      {
        taskId: "task2",
        title: "Task 2",
        dueDate: "2024/03/28",
        subTask: [
          { subTaskId: "4", title: "subTask1", check: false },
          { subTaskId: "5", title: "subTask2", check: true },
          { subTaskId: "6", title: "subTask3", check: false },
        ],
      },
      { taskId: "task3", title: "Task 3", dueDate: "2024/04/14" },
    ],
  },
  {
    columnId: "doing",
    title: "Doing",
    tasks: [
      {
        taskId: "task4",
        title: "Task 4",
        dueDate: "2024/04/10",
        subTask: [
          { subTaskId: "7", title: "subTask1", check: false },
          { subTaskId: "8", title: "subTask2", check: true },
          { subTaskId: "9", title: "subTask3", check: false },
          { subTaskId: "10", title: "subTask4", check: false },
          { subTaskId: "11", title: "subTask5", check: false },
          { subTaskId: "12", title: "subTask6", check: false },
        ],
      },
      { taskId: "task5", title: "Task 5", dueDate: "6 days ago" },
    ],
  },
  {
    columnId: "done",
    title: "Done",
    tasks: [
      {
        taskId: "task6",
        title: "Task 6",
        dueDate: "2024/04/15",
        subTask: [
          { subTaskId: "13", title: "subTask1", check: false },
          { subTaskId: "14", title: "subTask2", check: true },
          { subTaskId: "15", title: "subTask3", check: false },
          { subTaskId: "16", title: "subTask4", check: false },
          { subTaskId: "17", title: "subTask5", check: false },
          { subTaskId: "18", title: "subTask6", check: false },
        ],
      },
      {
        taskId: "task7",
        title: "Task 7",
        dueDate: "2024/04/14",
        subTask: [
          { subTaskId: "19", title: "subTask1", check: true },
          { subTaskId: "20", title: "subTask2", check: true },
          { subTaskId: "21", title: "subTask3", check: true },
          { subTaskId: "22", title: "subTask4", check: true },
          { subTaskId: "23", title: "subTask5", check: true },
          { subTaskId: "24", title: "subTask6", check: true },
        ],
      },
      { taskId: "task8", title: "Task 8", dueDate: "2024/04/14" },
      { taskId: "task9", title: "Task 9", dueDate: "2024/04/14" },
    ],
  },
];

export default function handler(req, res) {
  if (req.method === "PUT") {
    const { columnId, taskId, id, checked } = req.body;
    const subTask = task
      .find((e) => e.columnId === columnId)
      ?.tasks?.find((e) => e.taskId === taskId)
      ?.subTask.find((e) => e.subTaskId === id);

    if (subTask) subTask.check = checked;

    res.status(200).json({ task });
  } else if (req.method === "GET") {
    // Handle any other HTTP method
    console.log("get method");
    res.status(200).json({ task });
    return;
  }

  res.status(200).json({ data: "Hello from Next.js!" });
}
