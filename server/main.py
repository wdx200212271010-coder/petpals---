"""
PetPals 后端 API 入口
负责 FastAPI 应用初始化、CORS 配置和路由注册
"""
import logging
import sys

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.pets import router as pets_router
from api.applications import router as applications_router
from api.messages import router as messages_router

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    stream=sys.stdout,
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="PetPals API",
    description="宠物领养平台后端 API",
    version="1.0.0",
)

# CORS 配置：允许前端开发服务器访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由，统一使用 /api 前缀
app.include_router(pets_router, prefix="/api")
app.include_router(applications_router, prefix="/api")
app.include_router(messages_router, prefix="/api")


@app.get("/api/health")
def health_check() -> dict:
    """健康检查端点"""
    return {"status": "ok", "service": "PetPals API"}


if __name__ == "__main__":
    import uvicorn

    logger.info("启动 PetPals API 服务...")
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
