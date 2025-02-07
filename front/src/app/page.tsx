"use client"

import { DummyCard } from "@/components/dummycard";
import { DummyForm } from "@/components/dummyform";
import { createDummy, DummyModel, listDummies } from "@/lib/api/dummyGateway";
import { useEffect, useState } from "react";

export default  function Home() {

  
  const [dummies, setdummy] = useState<DummyModel[]>([])

  useEffect(() => {
    (async () => {
      setdummy(await listDummies())
    })()
  })

  const onSubmit = async (values: any) => {
    await createDummy(values.name)
    // # update dummies
    setdummy(await listDummies())
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-2 max-w-[50%] mx-auto">
        <div className="grid grid-cols-2 my-5">
          <div></div>
          <DummyForm  onSubmit={onSubmit}/>

        </div>
        {dummies.map((dummy: DummyModel) => (
          <DummyCard key={dummy.id} request={dummy} />
        ))}
      </div>
    </div>
  )
}
