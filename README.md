# PetPals - 宠物领养平台 🐾

一个现代化的宠物领养平台应用，帮助用户找到他们理想的宠物伴侣。

## ✨ 功能特性

- 🐶 **宠物浏览**：浏览各种待领养的宠物（狗狗、猫咪、兔子等）
- 🔍 **智能筛选**：按宠物类型筛选浏览
- 📝 **在线申请**：提交领养申请表单
- 💬 **消息通知**：接收申请状态更新
- 👤 **个人中心**：查看我的申请记录
- 📱 **响应式设计**：完美的移动端体验

## 🛠️ 技术栈

### 前端
- React 19
- TypeScript
- Vite
- Motion (动画库)
- Lucide React (图标)
- Tailwind CSS

### 后端
- Python 3.x
- FastAPI
- Uvicorn (ASGI 服务器)
- Supabase (数据库)

### 数据库
- Supabase (PostgreSQL)
- Row Level Security (RLS)

## 🚀 快速开始

### 环境要求

- Node.js 18+ 
- Python 3.8+
- Supabase 账号

### 1. 克隆项目

```bash
git clone https://github.com/YOUR_USERNAME/petpals.git
cd petpals
```

### 2. 安装前端依赖

```bash
npm install
```

### 3. 安装后端依赖

```bash
cd server
pip install -r requirements.txt
```

### 4. 配置环境变量

#### 前端配置
复制 `.env.example` 到 `.env`：
```bash
cp .env.example .env
```

#### 后端配置
在 `server` 目录下复制 `.env.example` 到 `.env`：
```bash
cd server
cp .env.example .env
```

编辑 `server/.env`，填入你的 Supabase 配置：
```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 5. 初始化数据库

1. 登录 [Supabase](https://supabase.com)
2. 创建新项目
3. 进入 SQL Editor
4. 执行 `server/supabase-schema.sql` 创建表结构
5. 执行 `server/seed-data.sql` 插入示例数据

### 6. 启动服务

#### 启动后端

```bash
cd server
python main.py
```

后端服务将在 http://localhost:8000 启动

#### 启动前端（新终端）

```bash
npm run dev
```

前端服务将在 http://localhost:3000 启动

## 📁 项目结构

```
petpals/
├── server/                 # 后端服务
│   ├── api/               # API 路由
│   ├── schema/            # Pydantic 模型
│   ├── service/           # 业务逻辑层
│   ├── config.py          # 配置文件
│   ├── main.py            # 应用入口
│   └── requirements.txt   # Python 依赖
├── src/                   # 前端源码
│   ├── App.tsx            # 主应用组件
│   ├── api-service.ts     # API 服务层
│   ├── types.ts           # TypeScript 类型
│   └── main.tsx           # 入口文件
├── .env.example           # 环境变量示例
├── package.json           # 前端依赖
└── vite.config.ts         # Vite 配置
```

## 🔑 API 端点

### 宠物相关
- `GET /api/pets` - 获取宠物列表
- `GET /api/pets/{id}` - 获取宠物详情

### 领养申请
- `GET /api/applications` - 获取申请列表
- `POST /api/applications` - 提交领养申请

### 消息
- `GET /api/messages` - 获取消息列表
- `POST /api/messages` - 创建消息
- `PUT /api/messages/read` - 标记消息为已读

### 健康检查
- `GET /api/health` - 服务健康检查

## 📝 数据库表

- `pets` - 宠物信息表
- `adoption_applications` - 领养申请表
- `messages` - 消息表

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 Apache-2.0 许可证

## 👨‍💻 作者

张伟
- 位置：上海

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

**注意**：本项目仅供学习交流使用。
