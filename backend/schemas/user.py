from typing import Optional
from pydantic import BaseModel

class UserIn(BaseModel):
   
    name: str
    email: str
    password: str


class UserOut(UserIn):
    id:int
    class Config:
        orm_mode = True