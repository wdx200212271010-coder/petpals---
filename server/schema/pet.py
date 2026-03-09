"""
宠物数据 Pydantic 模型
定义请求/响应的数据结构和校验规则
"""
from pydantic import BaseModel, Field
from typing import Optional


class HealthRecords(BaseModel):
    """宠物健康记录"""
    vaccination: str = ""
    neutered: bool = False
    microchipped: bool = False


class PetResponse(BaseModel):
    """
    宠物响应模型
    对应前端 Pet 接口的字段结构
    """
    id: str
    name: str
    breed: str
    age: str
    distance: Optional[str] = None
    price: str = "免费"
    image: str
    gallery: list[str] = Field(default_factory=list)
    category: str
    description: Optional[str] = None
    traits: list[str] = Field(default_factory=list)
    location: Optional[str] = None
    healthRecords: HealthRecords = Field(default_factory=HealthRecords)

    class Config:
        from_attributes = True


class PetListParams(BaseModel):
    """宠物列表查询参数"""
    category: Optional[str] = None
