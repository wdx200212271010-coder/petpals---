"""
宠物业务逻辑层
负责与 Supabase 交互，处理宠物数据的查询
"""
import logging
from typing import Optional

from config import get_supabase_client
from schema.pet import PetResponse, HealthRecords

logger = logging.getLogger(__name__)


def _map_pet_row(row: dict) -> PetResponse:
    """
    将数据库行映射为前端需要的 PetResponse 格式
    NOTE: 数据库中 healthRecords 拆分为独立字段，
    需要重新组装为嵌套结构以匹配前端类型
    """
    return PetResponse(
        id=str(row["id"]),
        name=row["name"],
        breed=row["breed"],
        age=row["age"],
        distance=row.get("distance"),
        price=row.get("price", "免费"),
        image=row["image"],
        gallery=row.get("gallery") or [],
        category=row["category"],
        description=row.get("description"),
        traits=row.get("traits") or [],
        location=row.get("location"),
        healthRecords=HealthRecords(
            vaccination=row.get("vaccination", ""),
            neutered=row.get("neutered", False),
            microchipped=row.get("microchipped", False),
        ),
    )


def get_pets(category: Optional[str] = None) -> list[PetResponse]:
    """
    获取宠物列表
    @param category: 可选分类筛选（Dogs/Cats/Rabbits）
    @return: 宠物列表
    """
    client = get_supabase_client()
    
    # 构建查询参数
    params = {}
    if category and category != "All":
        params["category"] = f"eq.{category}"
    
    response = client.select("pets", "*", params)
    return [_map_pet_row(row) for row in response]


def get_pet_by_id(pet_id: str) -> Optional[PetResponse]:
    """
    根据 ID 获取单个宠物详情
    @param pet_id: 宠物 UUID
    @return: 宠物详情或 None
    """
    client = get_supabase_client()
    response = client.select("pets", "*", {"id": f"eq.{pet_id}"})

    if not response:
        return None

    return _map_pet_row(response[0])
