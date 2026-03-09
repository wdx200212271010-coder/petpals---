"""
消息业务逻辑层
负责消息的创建、查询和已读状态更新
"""
import logging

from config import get_supabase_client
from schema.message import MessageCreate, MessageResponse

logger = logging.getLogger(__name__)


def get_messages() -> list[MessageResponse]:
    """
    获取所有消息，按创建时间倒序排列
    @return: 消息列表
    """
    client = get_supabase_client()
    response = client.select("messages", "*", {"order": "created_at.desc"})

    return [
        MessageResponse(
            id=str(row["id"]),
            sender=row["sender"],
            avatar=row.get("avatar"),
            content=row["content"],
            time=row.get("time"),
            unread=row.get("unread", True),
            type=row.get("type", "system"),
        )
        for row in response
    ]


def create_message(data: MessageCreate) -> MessageResponse:
    """
    创建新消息
    @param data: 消息内容
    @return: 创建后的消息记录
    """
    client = get_supabase_client()
    response = client.insert("messages", {**data.model_dump(), "unread": True})

    row = response[0]
    return MessageResponse(
        id=str(row["id"]),
        sender=row["sender"],
        avatar=row.get("avatar"),
        content=row["content"],
        time=row.get("time"),
        unread=row.get("unread", True),
        type=row.get("type", "system"),
    )


def mark_all_read() -> int:
    """
    将所有未读消息标记为已读
    @return: 更新的消息数量
    """
    client = get_supabase_client()
    response = client.update("messages", {"unread": False}, {"unread": "eq.true"})

    count = len(response) if response else 0
    logger.info("已将 %d 条消息标记为已读", count)
    return count
