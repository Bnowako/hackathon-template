const BASE_URL = "http://localhost:8000";


export interface DummyModel {
    id: string;
    name: string;
    json_field?: Record<string, any>;
  }

export async function getStatus(): Promise<any> {
  const res = await fetch(`${BASE_URL}/status`);
  return res.json();
}

export async function listDummies(): Promise<DummyModel[]> {
  const res = await fetch(`${BASE_URL}/dummies`);
  return res.json();
}

export async function createDummy(name: string): Promise<DummyModel> {
  const res = await fetch(`${BASE_URL}/dummies`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function getDummy(dummyId: string): Promise<DummyModel> {
  const res = await fetch(`${BASE_URL}/dummies/${dummyId}`);
  return res.json();
}

export async function updateDummy(dummyId: string, data: { name: string }): Promise<void> {
  await fetch(`${BASE_URL}/dummies/${dummyId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function deleteDummy(dummyId: string): Promise<void> {
  await fetch(`${BASE_URL}/dummies/${dummyId}`, {
    method: "DELETE",
  });
}

