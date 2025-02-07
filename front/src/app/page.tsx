"use client"

import { DataTable } from "@/components/datatable";
import { DummyForm } from "@/components/dummyform";
import { listDummies, DummyModel, createDummy } from "@/lib/api/dummyGateway";
import { useEffect, useState } from "react";

export default function DemoPage() {
  const [data, setData] = useState<DummyModel[]>([]);
  const [columns, setColumns] = useState<{ header: string, accessorKey: string }[]>([]);

  function getColumnsFromData(data: DummyModel[]): { header: string; accessorKey: string }[] {
    if (!data.length) return [];
    return Object.keys(data[0]).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key, // Use accessorKey here
    }));
  }
  useEffect(() => {
    (async () => {
      const dummyData = await listDummies();
      setData(dummyData);
      console.log(getColumnsFromData(dummyData));
      setColumns(getColumnsFromData(dummyData));
    })();
  }, []);


  const onSubmit = async (values: any) => {
    await createDummy(values.name)
    // # update dummies
    setData(await listDummies())
  }

  return (
    <div className="container mx-auto">

      <div className="grid grid-cols-2 my-5">
        <div></div>
        <DummyForm onSubmit={onSubmit} />
      </div>

      <div>
        {data && columns &&
          <DataTable columns={columns} data={data} />
        }
      </div>
    </div>

  );
}
