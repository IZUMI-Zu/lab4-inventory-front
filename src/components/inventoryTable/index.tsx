import React from "react";
import TableWrapper from "../table/table"

export const ITable = () => {
  return (
    <div className="mx-auto w-full flex flex-col gap-4 p-12 pb-10">

      <h3 className="text-xl font-semibold">All Inventories</h3>
      <div className="max-w-[95rem] mx-auto w-full">
        <TableWrapper />
      </div>
    </div>
  );
};
