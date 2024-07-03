export const classMappings = {
  true: {
    mainView: "flex-col w-full",
    columnMain: "",
    columnborder: "",
  },
  false: {
    mainView: "flex grid grid-cols-3 gap-4",
    columnMain: "rounded-md w-[350px] h-[500px] max-h-[500px] ",
    columnborder:
      "rounded-md rounded-b-none border-columnBackgroundColor border-4",
  },
};
