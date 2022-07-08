from typing import List
from fastapi import APIRouter,Depends, HTTPException,status,Response
from schemas.user import UserIn, UserOut
from models.user import User
from config.db import get_db

from sqlalchemy.orm import Session

user = APIRouter()



@user.get('/', response_model=List[UserOut])
async def fetch_users(db:Session=Depends(get_db)):
    return db.query(User).all()

@user.get('/{id}',response_model=UserOut)
async def fetch_user(id: int,db:Session=Depends(get_db)):
    user = db.query(User).filter(User.id==id).first()
    if not user:
        raise HTTPException(status_code=404, detail=f'User with id {id} not found. ')
    
    return user

@user.post('/', status_code=201,response_model=UserOut)
async def create_user(user: UserIn,db:Session=Depends(get_db)):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user

@user.put('/{id}')
async def update_user(id: int, update_user: UserIn, db:Session=Depends(get_db)):
    user_query = db.query(User).filter(User.id==id)

    db_user = user_query.first()

    if not db_user:
        raise HTTPException(status_code=404, detail=f'User with id {id} not found. ')

    user_query.update(update_user.dict(), synchronize_session=False)

    db.commit()

    return user_query.first() 

@user.delete('/{id}', status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(id: int, db:Session=Depends(get_db)):
    user_query = db.query(User).filter(User.id==id)
    db_user = user_query.first()

    if not db_user:
        raise HTTPException(status_code=404, detail=f'User with id {id} not found. ')
    user_query.delete(synchronize_session=False)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)