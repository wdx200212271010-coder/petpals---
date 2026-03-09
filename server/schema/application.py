"""
领养申请 Pydantic 模型
"""
from pydantic import BaseModel, Field
from typing import Optional


class ApplicationCreate(BaseModel):
    """
    领养申请创建模型
    对应前端表单的字段结构
    """
    pet_id: str = Field(..., description="申请领养的宠物 ID")
    name: str = Field(..., description="申请人姓名")
    address: Optional[str] = Field(None, description="申请人地址")
    phone: str = Field(..., description="联系电话")
    housing: str = Field("Apartment", description="住房类型")
    has_garden: bool = Field(False, description="是否有花园")
    has_other_pets: bool = Field(False, description="是否有其他宠物")
    experience: Optional[str] = Field(None, description="养宠经验")
    reason: Optional[str] = Field(None, description="领养原因")


class ApplicationResponse(BaseModel):
    """领养申请响应模型"""
    id: str
    pet_id: Optional[str] = None
    name: str
    address: Optional[str] = None
    phone: str
    housing: str = "Apartment"
    has_garden: bool = False
    has_other_pets: bool = False
    experience: Optional[str] = None
    reason: Optional[str] = None
    status: str = "pending"
    created_at: Optional[str] = None

    class Config:
        from_attributes = True
