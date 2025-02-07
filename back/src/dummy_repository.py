
# main.py

import uuid
from typing import Any, Dict, Optional
from sqlmodel import SQLModel, Session, select
from sqlmodel import Field
from sqlalchemy import Column, JSON



class DummyModel(SQLModel, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str
    json_field: Optional[Dict[str,Any]] = Field(default=None, sa_column=Column(JSON))

class DummyRepository:
    def __init__(self, session: Session):
        self.session = session

    def create(self, dummy: DummyModel) -> DummyModel:
        self.session.add(dummy)
        self.session.commit()
        self.session.refresh(dummy)
        return dummy

    def get(self, id: uuid.UUID) -> Optional[DummyModel]:
        return self.session.exec(select(DummyModel).where(DummyModel.id == id)).first()

    def get_all(self) -> list[DummyModel]:
        return list(self.session.exec(select(DummyModel)).all())

    def update(self, dummy: DummyModel) -> DummyModel:
        self.session.add(dummy)
        self.session.commit()
        self.session.refresh(dummy)
        return dummy

    def delete(self, id: uuid.UUID) -> None:
        agent = self.get(id)
        if agent:
            self.session.delete(agent)
            self.session.commit()