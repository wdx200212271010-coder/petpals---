"""
消息 API 路由
"""
import logging

from fastapi import APIRouter

from schema.message import MessageCreate, MessageResponse
from service import message_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/messages", tags=["消息"])


@router.get("", response_model=list[MessageResponse])
def get_messages() -> list[MessageResponse]:
    """获取所有消息列表"""
    return message_service.get_messages()


@router.post("", response_model=MessageResponse, status_code=201)
def create_message(data: MessageCreate) -> MessageResponse:
    """创建新消息"""
    return message_service.create_message(data)


@router.put("/read-all")
def mark_all_read() -> dict:
    """标记所有消息为已读"""
    count = message_service.mark_all_read()
    return {"updated": count, "message": f"已将 {count} 条消息标记为已读"}
