"use client"

import { DataTable } from "@/components/datatable";
import { DummyForm } from "@/components/dummyform";
import { listDummies, DummyModel, createDummy, deleteDummy } from "@/lib/api/dummyGateway";
import { on } from "events";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

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
  const onRowClicked = (data: object) => {
    console.log(data)
  } 
  const onDeleteClicked = async (data: DummyModel) => {
    await deleteDummy(data.id as string)
    setData(await listDummies())
    console.log(data)
  }

  return (
    <div className="container mx-auto">

      <div className="grid grid-cols-2 my-5">
        <div></div>
        <DummyForm onSubmit={onSubmit} />
      </div>

      <div>
        {data && columns &&
          <DataTable 
          onDeleteClicked={(data) => onDeleteClicked(data as DummyModel)}
          onRowClicked={(data) => onRowClicked(data)}
          columns={columns} data={data} />
        }
      </div>
    </div>

  );
}
