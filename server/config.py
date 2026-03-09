"""
Supabase 数据库连接配置
通过 httpx 直接调用 Supabase REST API，避免重量级 SDK 依赖
"""
import os
import logging
from typing import Any, Optional

import httpx
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
SUPABASE_KEY: str = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

if not SUPABASE_URL or not SUPABASE_KEY:
    logger.warning(
        "SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY 未设置，"
        "数据库功能将不可用"
    )


class SupabaseClient:
    """
    轻量级 Supabase REST API 客户端
    NOTE: 直接通过 PostgREST API 操作数据库，
    避免使用官方 SDK 的重量级依赖（pyiceberg 等）
    """

    def __init__(self, url: str, key: str) -> None:
        self.base_url = f"{url}/rest/v1"
        self.headers = {
            "apikey": key,
            "Authorization": f"Bearer {key}",
            "Content-Type": "application/json",
            "Prefer": "return=representation",
        }

    def _get_client(self) -> httpx.Client:
        return httpx.Client(headers=self.headers, timeout=30.0)

    def select(
        self,
        table: str,
        columns: str = "*",
        params: Optional[dict[str, str]] = None,
    ) -> list[dict[str, Any]]:
        """
        查询数据
        @param table: 表名
        @param columns: 选择的列
        @param params: 额外的查询参数（如过滤条件）
        """
        url = f"{self.base_url}/{table}?select={columns}"
        if params:
            for key, value in params.items():
                url += f"&{key}={value}"

        with self._get_client() as client:
            response = client.get(url)
            response.raise_for_status()
            return response.json()

    def insert(
        self, table: str, data: dict[str, Any]
    ) -> list[dict[str, Any]]:
        """
        插入数据
        @param table: 表名
        @param data: 要插入的数据
        """
        url = f"{self.base_url}/{table}"
        with self._get_client() as client:
            response = client.post(url, json=data)
            response.raise_for_status()
            return response.json()

    def update(
        self,
        table: str,
        data: dict[str, Any],
        params: Optional[dict[str, str]] = None,
    ) -> list[dict[str, Any]]:
        """
        更新数据
        @param table: 表名
        @param data: 要更新的字段
        @param params: 过滤条件
        """
        url = f"{self.base_url}/{table}"
        if params:
            for key, value in params.items():
                url += f"?{key}={value}" if "?" not in url else f"&{key}={value}"

        with self._get_client() as client:
            response = client.patch(url, json=data)
            response.raise_for_status()
            return response.json()


def get_supabase_client() -> SupabaseClient:
    """获取 Supabase 客户端实例"""
    return SupabaseClient(SUPABASE_URL, SUPABASE_KEY)
