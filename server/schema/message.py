"""
消息 Pydantic 模型
"""
from pydantic import BaseModel, Field
from typing import Optional


class MessageCreate(BaseModel):
    """消息创建模型"""
    sender: str = Field(..., description="发送者名称")
    avatar: Optional[str] = Field(None, description="发送者头像 URL")
    content: str = Field(..., description="消息内容")
    time: Optional[str] = Field(None, description="显示时间文本")
    type: str = Field("system", description="消息类型：system 或 user")


class MessageResponse(BaseModel):
    """消息响应模型"""
    id: str
    sender: str
    avatar: Optional[str] = None
    content: str
    time: Optional[str] = None
    unread: bool = True
    type: str = "system"

    class Config:
        from_attributes = True
