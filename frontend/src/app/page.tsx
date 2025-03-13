"use client"

import { DataTable } from "@/components/datatable";
import { DummyForm } from "@/components/dummyform";
import { getExamples, createExample, deleteExample } from "@/lib/api";
import { useEffect, useState } from "react";
import { ExampleResponse } from "@/lib/apiTypes";

export default function DemoPage() {
  const [data, setData] = useState<ExampleResponse[]>([]);
  const [columns, setColumns] = useState<{ header: string, accessorKey: string }[]>([]);

  function getColumnsFromData(data: ExampleResponse[]): { header: string; accessorKey: string }[] {
    if (!data.length) return [];
    return Object.keys(data[0]).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key, // Use accessorKey here
    }));
  }
  useEffect(() => {
    (async () => {
      const exampleData = await getExamples();
      setData(exampleData);
      console.log('columns',getColumnsFromData(exampleData));
      setColumns(getColumnsFromData(exampleData));
    })();
  }, []);


  const onSubmit = async (values: any) => {
    await createExample({name: values.name})
    // # update dummies
    setData(await getExamples())
  }
  const onRowClicked = (data: object) => {
    console.log(data)
  } 
  const onDeleteClicked = async (data: ExampleResponse) => {
    await deleteExample(data.id as string)
    setData(await getExamples())
    console.log(data)
  }

  return (
    <div className="container mx-auto">
      <h1>Hello</h1>
    </div>
  );
}
