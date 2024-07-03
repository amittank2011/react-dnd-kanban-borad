import KanbanBoard from "@/components/KanbanBoard";
import api from "../service/api";
import { useState } from "react";

export default function Home({ data }) {
  const [isListview, setIsListview] = useState(false);

  function handleView() {
    setIsListview(!isListview);
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <button
        onClick={handleView}
        className="absolute right-10 top-10 cursor-pointer rounded-lg h-[50px] w-[100px] min-w-[100px]bg-mainBackgroundColor border-2 border-columnBackgroundColor p-2 ring-rose-500 hover:ring-2 gap-2"
      >
        {isListview ? "Grid" : "List"}
      </button>
      <KanbanBoard data={data.task} isListview={isListview} />
    </div>
  );
}

export async function getServerSideProps() {
  const data = await api({ request: `/api/data`, method: "GET" });

  return {
    props: {
      data,
    },
  };
}
