-- PetPals 种子数据
-- 将前端硬编码的 PETS_DATA 迁移到数据库

INSERT INTO pets (name, breed, age, distance, price, image, gallery, category, description, traits, location, vaccination, neutered, microchipped)
VALUES
(
  '小乖',
  '金毛犬',
  '2岁',
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
  '1岁',
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
  '6个月',
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
  '3岁',
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
