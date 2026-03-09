-- PetPals 数据库表结构
-- 在 Supabase SQL Editor 中执行此脚本来初始化数据库

-- 宠物信息表
CREATE TABLE IF NOT EXISTS pets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  breed TEXT NOT NULL,
  age TEXT NOT NULL,
  distance TEXT,
  price TEXT DEFAULT '免费',
  image TEXT NOT NULL,
  gallery TEXT[] DEFAULT '{}',
  category TEXT NOT NULL CHECK (category IN ('Dogs', 'Cats', 'Rabbits')),
  description TEXT,
  traits TEXT[] DEFAULT '{}',
  location TEXT,
  vaccination TEXT,
  neutered BOOLEAN DEFAULT FALSE,
  microchipped BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 领养申请表
CREATE TABLE IF NOT EXISTS adoption_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  pet_id UUID REFERENCES pets(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT NOT NULL,
  housing TEXT DEFAULT 'Apartment' CHECK (housing IN ('Apartment', 'House')),
  has_garden BOOLEAN DEFAULT FALSE,
  has_other_pets BOOLEAN DEFAULT FALSE,
  experience TEXT,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 消息表
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender TEXT NOT NULL,
  avatar TEXT,
  content TEXT NOT NULL,
  time TEXT,
  unread BOOLEAN DEFAULT TRUE,
  type TEXT DEFAULT 'system' CHECK (type IN ('system', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 为宠物分类查询创建索引
CREATE INDEX IF NOT EXISTS idx_pets_category ON pets(category);

-- 为消息未读状态查询创建索引
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(unread);

-- 为领养申请状态查询创建索引
CREATE INDEX IF NOT EXISTS idx_applications_status ON adoption_applications(status);

-- 启用 RLS（行级安全策略）
-- NOTE: 当前使用 Service Role Key 访问，RLS 不会生效
-- 后续可按需添加策略
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 允许匿名读取宠物数据
CREATE POLICY "allow_public_read_pets" ON pets
  FOR SELECT USING (true);

-- 允许匿名读取消息
CREATE POLICY "allow_public_read_messages" ON messages
  FOR SELECT USING (true);

-- 允许匿名插入领养申请
CREATE POLICY "allow_public_insert_applications" ON adoption_applications
  FOR INSERT WITH CHECK (true);

-- 允许匿名插入消息
CREATE POLICY "allow_public_insert_messages" ON messages
  FOR INSERT WITH CHECK (true);

-- 允许匿名更新消息（标记已读）
CREATE POLICY "allow_public_update_messages" ON messages
  FOR UPDATE USING (true);
