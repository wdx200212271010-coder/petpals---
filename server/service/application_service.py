"""
领养申请业务逻辑层
负责申请的提交和查询
"""
import logging

from config import get_supabase_client
from schema.application import ApplicationCreate, ApplicationResponse

logger = logging.getLogger(__name__)


def get_applications() -> list[ApplicationResponse]:
    """
    获取所有领养申请，按创建时间倒序排列
    @return: 申请列表
    """
    client = get_supabase_client()
    response = client.select("adoption_applications", "*", {"order": "created_at.desc"})

    return [
        ApplicationResponse(
            id=str(row["id"]),
            pet_id=str(row["pet_id"]) if row.get("pet_id") else None,
            name=row["name"],
            address=row.get("address"),
            phone=row["phone"],
            housing=row.get("housing", "Apartment"),
            has_garden=row.get("has_garden", False),
            has_other_pets=row.get("has_other_pets", False),
            experience=row.get("experience"),
            reason=row.get("reason"),
            status=row.get("status", "pending"),
            created_at=str(row.get("created_at", "")),
        )
        for row in response
    ]


def create_application(data: ApplicationCreate) -> ApplicationResponse:
    """
    提交领养申请
    @param data: 申请表单数据
    @return: 创建后的申请记录
    """
    client = get_supabase_client()
    response = client.insert("adoption_applications", data.model_dump())

    row = response[0]
    return ApplicationResponse(
        id=str(row["id"]),
        pet_id=str(row["pet_id"]) if row.get("pet_id") else None,
        name=row["name"],
        address=row.get("address"),
        phone=row["phone"],
        housing=row.get("housing", "Apartment"),
        has_garden=row.get("has_garden", False),
        has_other_pets=row.get("has_other_pets", False),
        experience=row.get("experience"),
        reason=row.get("reason"),
        status=row.get("status", "pending"),
        created_at=str(row.get("created_at", "")),
    )
