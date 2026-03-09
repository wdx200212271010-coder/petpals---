# PetPals 全栈应用 — 完成总结

## 完成内容

将纯前端宠物领养应用改造为前后端分离的全栈应用，后端使用 FastAPI + Supabase。

## 后端架构（FastAPI）

```
server/
├── main.py                  # FastAPI 入口，CORS + 路由注册
├── config.py                # Supabase 连接配置
├── requirements.txt         # Python 依赖
├── supabase-schema.sql      # 数据库 DDL（3 张表 + 索引 + RLS）
├── seed-data.sql            # 种子数据（4 条宠物记录）
├── .env.example             # 环境变量模板
├── api/
│   ├── pets.py              # GET /api/pets, GET /api/pets/{id}
│   ├── applications.py      # POST /api/applications
│   └── messages.py          # GET/POST /api/messages, PUT /api/messages/read-all
├── schema/                  # Pydantic 数据校验模型
│   ├── pet.py, application.py, message.py
└── service/                 # 业务逻辑层（Supabase 读写）
    ├── pet_service.py, application_service.py, message_service.py
```

## 前端改造

| 文件 | 变更 |
|------|------|
| [api-service.ts](file:///c:/Users/Administrator/Desktop/petpals/src/api-service.ts) | **新增** — 统一 API 调用层 |
| [types.ts](file:///c:/Users/Administrator/Desktop/petpals/src/types.ts) | 移除硬编码 `PETS_DATA` |
| [App.tsx](file:///c:/Users/Administrator/Desktop/petpals/src/App.tsx) | 所有组件改为 API 驱动 |
| [vite.config.ts](file:///c:/Users/Administrator/Desktop/petpals/vite.config.ts) | 添加 `/api` 代理到后端 |
| [.env.example](file:///c:/Users/Administrator/Desktop/petpals/.env.example) | 添加 Supabase 变量 |

## 启动步骤

### 1. 初始化 Supabase 数据库

在 Supabase 控制台的 SQL Editor 中依次执行：
- [server/supabase-schema.sql](file:///c:/Users/Administrator/Desktop/petpals/server/supabase-schema.sql)（建表）
- [server/seed-data.sql](file:///c:/Users/Administrator/Desktop/petpals/server/seed-data.sql)（初始数据）

### 2. 配置环境变量

```bash
# 后端
cp server/.env.example server/.env
# 编辑 server/.env 填入你的 Supabase URL 和 Service Role Key
```

### 3. 启动后端

**Windows PowerShell 用户请注意：** 如果你的目录名包含空格或特殊字符（如"petpals - 副本"），请使用引号包裹路径。

```bash
# 方法 1：使用相对路径（推荐）
cd "server"
python -m pip install -r requirements.txt
python main.py

# 方法 2：如果上面的 cd 命令失败，使用绝对路径
cd "C:\Users\Administrator\Desktop\petpals - 副本\server"
python -m pip install -r requirements.txt
python main.py

# 如果 pip 仍然报错，尝试直接使用 python 安装
python -m pip install -r requirements.txt

# 后端将在 http://localhost:8000 启动
```

**常见问题解决：**
- 如果出现 `pip` 命令未找到错误，使用 `python -m pip` 替代 `pip`
- 如果目录路径包含空格，使用引号包裹路径：`cd "server"`
- 确保已安装 Python 3.8+ 版本

### 4. 启动前端

```bash
npm install
npm run dev
# 前端将在 http://localhost:3000 启动，API 请求自动代理到后端
```
