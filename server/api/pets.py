"""
宠物相关 API 路由
提供宠物列表查询和详情查看接口
"""
import logging
from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from schema.pet import PetResponse
from service import pet_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/pets", tags=["宠物"])


@router.get("", response_model=list[PetResponse])
def get_pets(
    category: Optional[str] = Query(
        None, description="按分类筛选：Dogs / Cats / Rabbits"
    ),
) -> list[PetResponse]:
    """获取宠物列表，支持按分类筛选"""
    return pet_service.get_pets(category)


@router.get("/{pet_id}", response_model=PetResponse)
def get_pet_detail(pet_id: str) -> PetResponse:
    """根据 ID 获取宠物详情"""
    pet = pet_service.get_pet_by_id(pet_id)
    if not pet:
        raise HTTPException(status_code=404, detail="宠物未找到")
    return pet
