import { DummyCard } from "@/components/dummycard";
import { DummyModel, listDummies } from "@/lib/api/dummyGateway";
import Image from "next/image";

export default async function Home() {
  
  const dummies = await listDummies()
  
  return (
    <div>
      <div className="grid grid-cols-1 gap-2 max-w-[50%] mx-auto">
        {dummies.map((dummy: DummyModel) => (
          <DummyCard request={dummy} />
        ))}
      </div>
    </div>
}
