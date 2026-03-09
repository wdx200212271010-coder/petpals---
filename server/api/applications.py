"""
领养申请 API 路由
"""
import logging

from fastapi import APIRouter

from schema.application import ApplicationCreate, ApplicationResponse
from service import application_service

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/applications", tags=["领养申请"])


@router.get("", response_model=list[ApplicationResponse])
def list_applications() -> list[ApplicationResponse]:
    """获取所有领养申请列表"""
    logger.info("获取领养申请列表")
    return application_service.get_applications()


@router.post("", response_model=ApplicationResponse, status_code=201)
def submit_application(data: ApplicationCreate) -> ApplicationResponse:
    """提交领养申请"""
    logger.info("收到领养申请，宠物 ID: %s，申请人：%s", data.pet_id, data.name)
    return application_service.create_application(data)
