# PetPals 数据库初始化指南

## 问题分析

前端显示空白是因为后端无法从 Supabase 数据库获取数据。需要完成以下步骤来初始化数据库。

## 解决步骤

### 步骤 1: 访问 Supabase 控制台

1. 打开浏览器，访问：https://supabase.com/dashboard
2. 登录你的账号
3. 选择你的项目（lexmsuaouaozpyqiehbn）

### 步骤 2: 执行 SQL 脚本创建表结构

1. 在左侧菜单点击 **SQL Editor**
2. 点击 **New query**
3. 复制并粘贴以下内容：

```sql
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

-- 索引
CREATE INDEX IF NOT EXISTS idx_pets_category ON pets(category);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(unread);
CREATE INDEX IF NOT EXISTS idx_applications_status ON adoption_applications(status);

-- 启用 RLS
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE adoption_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 安全策略
CREATE POLICY "allow_public_read_pets" ON pets FOR SELECT USING (true);
CREATE POLICY "allow_public_read_messages" ON messages FOR SELECT USING (true);
CREATE POLICY "allow_public_insert_applications" ON adoption_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_public_insert_messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "allow_public_update_messages" ON messages FOR UPDATE USING (true);
```

4. 点击 **Run** 按钮执行

### 步骤 3: 插入种子数据

1. 继续在 SQL Editor 中
2. 复制并粘贴以下 SQL：

```sql
-- 插入示例宠物数据
INSERT INTO pets (name, breed, age, distance, price, image, gallery, category, description, traits, location, vaccination, neutered, microchipped)
VALUES
(
  '小乖',
  '金毛犬',
  '2 岁',
  '2.5 公里外',
  '免费',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDCnZMw0XaWPJF3tDHJk5L36gChDWoZtiPMt7o9IirUct0Mxfm1A-OAMnCAFKXqnbyqXaexS0aMdIzrqFRxmzNeUAHc7dilRlek7Q2nnTxPU1yuIt5KZ21J9Zr1X1hO2awQ1yLRmUqRPKoDPxNW-8i_Y4tohaosmwsMhR6aveCWEv80GYJiWWX1puE4YbeHZkluYjSID8jHMJb1QVQmg4QKrcuoYO28Tv0I-_JP0qFwmSX5OwaQkxrCjnWmY_NO63FPV3n5Phh_dFfH',
  ARRAY[
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCnZMw0XaWPJF3tDHJk5L36gChDWoZtiPMt7o9IirUct0Mxfm1A-OAMnCAFKXqnbyqXaexS0aMdIzrqFRxmzNeUAHc7dilRlek7Q2nnTxPU1yuIt5KZ21J9Zr1X1hO2awQ1yLRmUqRPKoDPxNW-8i_Y4tohaosmwsMhR6aveCWEv80GYJiWWX1puE4YbeHZkluYjSID8jHMJb1QVQmg4QKrcuoYO28Tv0I-_JP0qFwmSX5OwaQkxrCjnWmY_NO63FPV3n5Phh_dFfH',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwMlq47TXmKvKmhILN-jt1TvNx5kwJweOpnHSwrPDZVd-bpVav2hGfnmoKFCdqfIBt0T_pl7gHCb8IFlqLjkvTByZ00tF2ACOjnxEE_hoVqYOmmS4JG82htuH_F0TSTH0hkWJMkYN8xpPm1JdXxnLW4uIGTj-118jXpCvEaMUgladyxnvqpEciUJzGLRi8w4fjjHYA3S06-TGMqN1ZiUubjZWsYi5kKWH0KhHlTldrTxDmI8AG38YVT10-fju8XzHU3PbXre_B2pH-C',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDWfOeqiuJopAQBzZ0gOYUcgOrS4mDNJlE8yZTbimjOsaJ4vzyiBHE7vMg8uHQBRSp7TNPD4cHQFm16jo2hzZThg1Kb5MBtKTfSI0z-WJHw_fiUglg_tL2oom-tPCVERHohiJXbXI7KvKRLgN1kNK3Nw9C5bLSrIc-Fomvr-JC9IciSG9DmgGs-Hqov6TV6g4ViKSXWi85VuqVczqKAk1Fu6F32KlDnFTGjWp2Iys24mbXaWmRxl7BHfaNQZsLjBeDtzOUKKyeEEm0K'
  ],
  'Dogs',
  '小乖是一只友好且充满活力的金毛猎犬，它非常喜欢散步和玩接球游戏。它对小朋友和其他狗狗都非常友善，目前正在寻找一个温暖的家。它是一个真正的"跟屁虫"，只想时刻待在你的身边。',
  ARRAY['友好', '充满活力', '对孩子友善', '聪明', '贪玩'],
  '加州洛杉矶',
  '所有核心疫苗均已按时接种',
  TRUE,
  TRUE
),
(
  '露娜',
  '暹罗混血',
  '1 岁',
  '0.8 公里外',
  '免费',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCWn--RQtWVDff9TaSwgJOrMsPaaT8q_guvZ5iAUouYRjhSL9yucTEV1nbJFbZUp2Eg3tWXkAluDYH5J0j_q-t3ladr693cK-Jfysd6z9WvE2-xBzvHa4Nx8M1TMoJJsMDgPPh94S0fHNS1WzIiWnTQ_7k9f_cAMv5RGSrDy606XbboHVIKI5n1FAK0DwDtd6THRWb_yqUwNdZEZczxAHNOy5emr4uunF8EcZBeUw9AVP7aMcIyLy6GWUzUEtVW2ldrTTre0KSXp5Cl',
  '{}',
  'Cats',
  '露娜是一只优雅且安静的暹罗混血猫。她喜欢在阳光充足的窗台上打盹，偶尔也会展现出顽皮的一面。她非常独立，但也渴望人类的陪伴。',
  ARRAY['优雅', '安静', '独立', '亲人'],
  '上海',
  '已接种',
  TRUE,
  FALSE
),
(
  '小白',
  '荷兰垂耳兔',
  '6 个月',
  '1.2 公里外',
  '免费',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAPbKDKvLllTF_0Q3nHob9gJiNCnzvmm53Kbm5n3490tktuzRq5j-O6f7NJydNhlmLefsTsdbelFgKChkIPBTN0lYEMZNalsJpPuTimyqEJI8XDW9-qvYS5eq0QYuXlEnrsUVaT8juWdlKhzQSzbUemKy-sfQydM0_Ws1i20HJaUgPyZCDLpF623JCTt1tFQSnHLi4buCzMSknbL7MsyOBy3vh1JYi1uCpBPiPvMevTUKdbnH1Mpx49VARtIrwXwZdqlIlvDy41orT8',
  '{}',
  'Rabbits',
  '小白是一只超级软萌的荷兰垂耳兔。他非常温顺，喜欢吃新鲜的蔬菜和干草。他需要一个安静的环境和主人的细心呵护。',
  ARRAY['温顺', '软萌', '安静'],
  '北京',
  '已接种',
  FALSE,
  FALSE
),
(
  '查理',
  '比格犬',
  '3 岁',
  '4.0 公里外',
  '免费',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAs0-0ITaMJg6VTMn7J6o_rohQZaOIqSuP-qwnRiNAEcF9eBk8gVMJdjAR5205C9dpL3Z5CWSv8NqNhAp9PRLzA6w7JicGsl50_U4neU_NFoaCP8nfpM-bKvW5c8JgpwIXZdI7BF7iDLdkqfEHb_DEMnzq0QrEahvJly2lKZj_f8DQHPx755zGhLbGtWPcVagrfHc-MEhstVvAUSMYmcDVcDEjr8aCXJ9RhClyxo-cfmPBCC9QgXlz7Qu0aoQJynsFLK1dISbk7hNjM',
  '{}',
  'Dogs',
  '查理是一只充满好奇心的比格犬。他有着敏锐的嗅觉，总是喜欢到处探索。他非常活泼，需要大量的运动和互动。',
  ARRAY['好奇', '活泼', '爱探索'],
  '广州',
  '已接种',
  TRUE,
  TRUE
);
```

3. 点击 **Run** 按钮执行

### 步骤 4: 验证数据

1. 在左侧菜单点击 **Table Editor**
2. 你应该能看到 `pets`、`adoption_applications`、`messages` 三个表
3. 点击 `pets` 表，应该能看到 4 条宠物记录

### 步骤 5: 重启后端服务

数据库初始化完成后，需要重启后端服务以加载数据：

1. 在后端运行的终端窗口按 `Ctrl+C` 停止服务
2. 重新运行：
   ```powershell
   cd "C:\Users\Administrator\Desktop\petpals - 副本\server"
   python main.py
   ```

### 步骤 6: 刷新前端

1. 在浏览器中刷新页面（按 F5）
2. 现在应该能看到宠物列表了！

## 验证 API

你可以通过以下方式验证 API 是否正常工作：

1. 打开浏览器访问：http://localhost:8000/api/pets
2. 如果看到 JSON 格式的宠物数据，说明后端已成功连接数据库
3. 如果看到错误，请检查 Supabase 配置是否正确

## 常见问题

### Q: 看不到 pets 表？
A: 确保步骤 2 的 SQL 脚本执行成功，查看下方 Messages 面板是否有错误。

### Q: API 返回空数组？
A: 确保步骤 3 的种子数据已执行，并在 Table Editor 中确认有数据。

### Q: 仍然显示空白？
A: 打开浏览器开发者工具（F12），查看 Console 和 Network 标签页的错误信息。

## 手动添加数据

如果你想自己添加更多宠物，可以在 Table Editor 中直接添加，或执行类似这样的 SQL：

```sql
INSERT INTO pets (name, breed, age, category, image, description)
VALUES ('你的宠物名', '品种', '年龄', 'Dogs/Cats/Rabbits', '图片 URL', '描述');
```
