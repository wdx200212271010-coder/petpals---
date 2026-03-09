/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Bell, 
  MapPin, 
  Heart, 
  Home as HomeIcon, 
  Compass, 
  MessageSquare, 
  User, 
  Plus, 
  ArrowLeft, 
  Share2, 
  ChevronRight, 
  FileText, 
  BookOpen, 
  Settings, 
  LogOut,
  Send,
  CheckCircle2,
  ShieldCheck,
  PawPrint,
  Loader2,
  Phone,
  Home,
  CheckCircle
} from 'lucide-react';
import { Pet, Screen, PetCategory } from './types';
import { petApi, applicationApi, messageApi, ApplicationResponse } from './api-service';

// --- Components ---

const BottomNav = ({ currentScreen, setScreen, hasUnread }: { currentScreen: Screen, setScreen: (s: Screen) => void, hasUnread: boolean }) => {
  const navItems = [
    { id: 'home', label: '首页', icon: HomeIcon },
    { id: 'explore', label: '探索', icon: Compass },
    { id: 'messages', label: '消息', icon: MessageSquare },
    { id: 'profile', label: '我的', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-primary/10 px-4 pb-6 pt-3 z-50">
      <div className="max-w-2xl mx-auto flex justify-between items-center relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id as Screen)}
              className={`flex flex-col items-center gap-1 transition-colors relative ${isActive ? 'text-primary' : 'text-slate-400'}`}
            >
              <Icon size={24} fill={isActive ? 'currentColor' : 'none'} />
              {item.id === 'messages' && hasUnread && (
                <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
              )}
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>{item.label}</span>
            </button>
          );
        })}
        
        <div className="absolute left-1/2 -translate-x-1/2 -top-10">
          <button className="bg-primary size-14 rounded-full text-white shadow-xl shadow-primary/40 border-4 border-background-light flex items-center justify-center active:scale-95 transition-transform">
            <Plus size={32} />
          </button>
        </div>
      </div>
    </nav>
  );
};

// --- Screens ---

const OnboardingScreen = ({ onStart }: { onStart: () => void }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="h-screen flex flex-col items-center justify-between px-8 py-12 bg-background-light relative overflow-hidden"
  >
    <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute top-1/2 -right-32 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
    
    <div className="relative z-10 flex flex-col items-center text-center mt-8">
      <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
        <PawPrint className="text-white" size={40} />
      </div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-slate-900">
        宠<span className="text-primary">友</span>
      </h1>
      <p className="text-lg font-medium text-slate-600">寻找你的新朋友</p>
    </div>

    <div className="relative z-10 w-full max-w-[320px] aspect-square">
      <div className="absolute inset-0 bg-primary/10 rounded-full scale-110" />
      <div className="absolute inset-0 bg-primary/5 rounded-full scale-125" />
      <img 
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpQgRTnAki4iYZRuPr928WtISyp1TqqKSX_xt6DuqRHUgmIGvZUjU82OOBvd8T89SJFCKCAWyln7CzcmHqM9iHmeC0v7BjcP0LhR9-cZLLqDbW3XcRu4U4DKT7UsqwUzk9vyygULnAxwd1JZEIbVlB3p2zQa1Os2SYiGkqWgeEJ67S6i1McEKnvZqZ7pCnCEWuHmui5UbxPxBRC_gYPd-WdGLXwF2m144sF8vBmr3nS2b27mWb_4SgrAMr9PEnrhpnY1PGH1AYUtgt" 
        alt="Pets" 
        referrerPolicy="no-referrer"
        className="relative z-10 w-full h-full object-cover rounded-full border-8 border-white shadow-2xl"
      />
      <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 z-20">
        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
          <Heart className="text-green-500" size={20} fill="currentColor" />
        </div>
        <div>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">今日已领养</p>
          <p className="text-sm font-bold text-slate-900">124 只宠物找到了家</p>
        </div>
      </div>
    </div>

    <div className="w-full space-y-4 relative z-10">
      <button 
        onClick={onStart}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 group"
      >
        开启旅程
        <ChevronRight className="group-hover:translate-x-1 transition-transform" />
      </button>
      <button className="w-full bg-primary/10 hover:bg-primary/20 text-primary font-bold py-4 px-8 rounded-xl transition-all">
        我已有账号
      </button>
    </div>

    <div className="flex gap-2 relative z-10">
      <div className="w-8 h-1.5 bg-primary rounded-full" />
      <div className="w-2 h-1.5 bg-primary/30 rounded-full" />
      <div className="w-2 h-1.5 bg-primary/30 rounded-full" />
    </div>
  </motion.div>
);

const HomeScreen = ({ onSelectPet }: { onSelectPet: (p: Pet) => void }) => {
  const [category, setCategory] = useState<PetCategory>('All');
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const categories: { id: PetCategory; label: string }[] = [
    { id: 'All', label: '全部' },
    { id: 'Dogs', label: '狗狗' },
    { id: 'Cats', label: '猫咪' },
    { id: 'Rabbits', label: '兔子' },
  ];

  // NOTE: 分类切换时重新从 API 加载数据
  useEffect(() => {
    setLoading(true);
    petApi.getAll(category === 'All' ? undefined : category)
      .then(setPets)
      .catch((err) => console.error('Failed to load pets:', err))
      .finally(() => setLoading(false));
  }, [category]);

  const filteredPets = pets;

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center p-4 justify-between max-w-2xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-lg text-white">
              <PawPrint size={24} />
            </div>
            <h1 className="text-xl font-bold tracking-tight">PetPals</h1>
          </div>
          <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
            <Bell size={24} />
          </button>
        </div>
        <div className="px-4 py-2 max-w-2xl mx-auto w-full">
          <div className="relative flex items-center">
            <Search className="absolute left-4 text-slate-400" size={20} />
            <input 
              className="w-full h-12 pl-12 pr-4 rounded-xl border-none bg-primary/5 focus:bg-primary/10 focus:ring-2 focus:ring-primary/20 text-slate-900 placeholder:text-slate-400 transition-all" 
              placeholder="搜索宠物..." 
            />
          </div>
        </div>
        <div className="flex gap-3 p-4 overflow-x-auto no-scrollbar max-w-2xl mx-auto w-full">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-6 font-medium transition-all ${
                category === cat.id 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white text-slate-600 border border-primary/10 hover:border-primary/30'
              }`}
            >
              {cat.id !== 'All' && <PawPrint size={16} />}
              <span className="text-sm">{cat.label}</span>
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-2xl mx-auto w-full p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">附近的宠物</h2>
          <button className="text-primary text-sm font-semibold">查看全部</button>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-20 text-slate-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
          </div>
        ) : (
        <div className="grid grid-cols-2 gap-4">
          {filteredPets.map((pet) => (
            <motion.div 
              layoutId={`pet-${pet.id}`}
              key={pet.id}
              onClick={() => onSelectPet(pet)}
              className="group relative bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="aspect-square w-full overflow-hidden">
                <img 
                  src={pet.image} 
                  alt={pet.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur rounded-full text-primary font-bold text-[10px]">
                {pet.price}
              </div>
              <div className="p-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900">{pet.name}</h3>
                  <span className="text-primary font-bold text-sm">{pet.price}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{pet.breed} • {pet.age}</p>
                <div className="flex items-center mt-2 text-slate-400">
                  <MapPin size={12} className="mr-1" />
                  <span className="text-[10px] font-medium uppercase tracking-wider">{pet.distance}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        )}
      </main>
    </div>
  );
};

const PetDetailsScreen = ({ pet, onBack, onAdopt }: { pet: Pet, onBack: () => void, onAdopt: () => void }) => {
  const [activeImage, setActiveImage] = useState(0);
  const gallery = pet.gallery || [pet.image];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-background-light min-h-screen pb-32"
    >
      <div className="sticky top-0 z-50 flex items-center bg-background-light/80 backdrop-blur-md p-4 justify-between border-b border-primary/10">
        <button onClick={onBack} className="text-slate-900 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-lg font-bold flex-1 text-center">宠物详情</h2>
        <button className="flex items-center justify-center rounded-full size-10 hover:bg-primary/10 transition-colors">
          <Share2 size={24} />
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="px-4 py-3">
          <div className="w-full aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden shadow-lg relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={gallery[activeImage]} 
                alt={pet.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            
            {/* Gallery Indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
              {gallery.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all ${idx === activeImage ? 'w-6 bg-primary' : 'w-1.5 bg-white/50'}`} 
                />
              ))}
            </div>

            <div className="relative p-6 text-white h-full flex flex-col justify-end">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">待领养</span>
              </div>
              <h1 className="text-4xl font-bold mb-1">{pet.name}</h1>
              <p className="text-white/90 text-lg">{pet.breed} • {pet.age}</p>
            </div>
          </div>
          
          {/* Gallery Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar pb-2">
              {gallery.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === activeImage ? 'border-primary' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex p-4 gap-4">
          <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Breed</span>
            <span className="text-sm font-bold">{pet.breed.split('犬')[0]}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Age</span>
            <span className="text-sm font-bold">{pet.age}</span>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center p-4 rounded-xl bg-primary/10 border border-primary/20">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-tight">Location</span>
            <span className="text-sm font-bold">{pet.location}</span>
          </div>
        </div>

        <div className="space-y-6 px-4 mt-4">
          <section>
            <h3 className="text-xl font-bold mb-3">关于我</h3>
            <p className="text-slate-700 leading-relaxed">{pet.description}</p>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4">性格特点</h3>
            <div className="flex flex-wrap gap-2">
              {pet.traits.map(trait => (
                <span key={trait} className="px-4 py-2 rounded-full bg-slate-200 text-slate-800 text-sm font-medium">
                  {trait}
                </span>
              ))}
            </div>
          </section>

          <section>
            <div className="bg-white p-5 rounded-xl border border-primary/10">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-primary" /> 健康记录
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" size={18} />
                  <div>
                    <p className="text-sm font-bold">疫苗接种</p>
                    <p className="text-xs text-slate-500">{pet.healthRecords.vaccination}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" size={18} />
                  <div>
                    <p className="text-sm font-bold">已绝育</p>
                    <p className="text-xs text-slate-500">{pet.healthRecords.neutered ? '是的，已完成' : '尚未完成'}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="text-green-500 mt-1" size={18} />
                  <div>
                    <p className="text-sm font-bold">已植入芯片</p>
                    <p className="text-xs text-slate-500">{pet.healthRecords.microchipped ? '将提供详细的注册信息' : '尚未植入'}</p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <div className="w-full h-40 rounded-xl overflow-hidden relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiWBx82ZCC1yCD0ENnggSKPZBfhMhynh5xcquy9xxpV0JQqk7EW3H1QEVryw5fwLsEnExjPCrk6pabvGPa7_Sm-DuuVFwd-YVP3G-KrW3NA6gLPhj5wloV0GidwaivOcPC0u5ac-p1-_qblAiJ4Mk9VvEcAXHZYFnmj9qP9A1xSuZRTFQP1aKAZa9ZQjgpkBMWvcbfpeCnMcFftTsg3LtDdQuzWqXh7SOfG-guXgrpPJLKB7IHSFyDPHLG0NYsdhMuYVNrJnx8XJWP" 
                alt="Map" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <MapPin className="text-primary" size={18} />
                  <span className="text-sm font-bold">救助站位置：{pet.location}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/90 backdrop-blur-lg border-t border-primary/10 z-50">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          <button className="flex items-center justify-center size-14 rounded-xl border-2 border-primary/30 text-primary hover:bg-primary/5 transition-colors shrink-0">
            <Heart size={24} />
          </button>
          <button 
            onClick={onAdopt}
            className="flex-1 h-14 bg-primary text-white text-lg font-bold rounded-xl shadow-lg shadow-primary/30 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            领养{pet.name}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ApplicationScreen = ({ onBack, onSubmitted, petName, petId }: { onBack: () => void, onSubmitted: () => void, petName: string, petId: string }) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    housing: 'Apartment',
    hasGarden: false,
    hasOtherPets: false,
    experience: '',
    reason: ''
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // NOTE: 提交时同时调用申请 API 和消息 API
  const handleNext = async () => {
    if (step < totalSteps) { setStep(step + 1); return; }

    try {
      await applicationApi.submit({
        pet_id: petId,
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        housing: formData.housing,
        has_garden: formData.hasGarden,
        has_other_pets: formData.hasOtherPets,
        experience: formData.experience,
        reason: formData.reason,
      });

      await messageApi.create({
        sender: '系统通知',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDCnZMw0XaWPJF3tDHJk5L36gChDWoZtiPMt7o9IirUct0Mxfm1A-OAMnCAFKXqnbyqXaexS0aMdIzrqFRxmzNeUAHc7dilRlek7Q2nnTxPU1yuIt5KZ21J9Zr1X1hO2awQ1yLRmUqRPKoDPxNW-8i_Y4tohaosmwsMhR6aveCWEv80GYJiWWX1puE4YbeHZkluYjSID8jHMJb1QVQmg4QKrcuoYO28Tv0I-_JP0qFwmSX5OwaQkxrCjnWmY_NO63FPV3n5Phh_dFfH',
        content: `您的领养申请（宠物：${petName}）已成功提交！我们将尽快审核。`,
        time: '刚刚',
        type: 'system',
      });

      setIsSubmitted(true);
      onSubmitted();
    } catch (err) {
      console.error('Failed to submit application:', err);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else onBack();
  };

  const updateField = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="h-screen bg-background-light flex flex-col items-center justify-center p-8 text-center"
      >
        <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h1 className="text-3xl font-extrabold mb-2">申请已提交！</h1>
        <p className="text-slate-600 mb-8">
          感谢您的申请。我们的团队将在 2-3 个工作日内审核您的资料并与您联系。
        </p>
        <button 
          onClick={onBack}
          className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25"
        >
          返回首页
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className="bg-background-light min-h-screen flex flex-col"
    >
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center px-4 py-4 max-w-2xl mx-auto w-full">
          <button onClick={handleBack} className="text-slate-900 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-bold flex-1 text-center pr-10 uppercase tracking-wider">宠友领养</h2>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-4 py-6 overflow-y-auto">
        <div className="mb-8">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-primary font-bold text-sm uppercase tracking-widest">第 {step} 步 (共 {totalSteps} 步)</p>
              <h1 className="text-3xl font-extrabold tracking-tight mt-1">
                {step === 1 && "个人详情"}
                {step === 2 && "居住情况"}
                {step === 3 && "养宠经验"}
                {step === 4 && "确认申请"}
              </h1>
            </div>
            <p className="text-slate-500 text-sm font-medium">{Math.round(progress)}% 已完成</p>
          </div>
          <div className="h-2.5 w-full bg-primary/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="space-y-6 pb-24">
          {step === 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">姓名</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full pl-12 pr-4 h-14 bg-white border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-all text-base" 
                    placeholder="例如：张三" 
                    type="text" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">地址</label>
                <div className="relative">
                  <HomeIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    value={formData.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full pl-12 pr-4 h-14 bg-white border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-all text-base" 
                    placeholder="街道、城市、省份、邮编" 
                    type="text" 
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">电话号码</label>
                <div className="relative">
                  <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input 
                    value={formData.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full pl-12 pr-4 h-14 bg-white border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-all text-base" 
                    placeholder="请输入电话号码" 
                    type="tel" 
                  />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 ml-1">住房类型</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Apartment', 'House'].map((type) => (
                    <button
                      key={type}
                      onClick={() => updateField('housing', type)}
                      className={`h-14 rounded-xl border-2 font-bold transition-all ${
                        formData.housing === type 
                          ? 'border-primary bg-primary/5 text-primary' 
                          : 'border-slate-100 bg-white text-slate-500'
                      }`}
                    >
                      {type === 'Apartment' ? '公寓' : '别墅/平房'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border-2 border-slate-100 rounded-xl">
                <span className="font-bold text-slate-700">是否有花园？</span>
                <button 
                  onClick={() => updateField('hasGarden', !formData.hasGarden)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${formData.hasGarden ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.hasGarden ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-white border-2 border-slate-100 rounded-xl">
                <span className="font-bold text-slate-700">家里有其他宠物吗？</span>
                <button 
                  onClick={() => updateField('hasOtherPets', !formData.hasOtherPets)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${formData.hasOtherPets ? 'bg-primary' : 'bg-slate-200'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.hasOtherPets ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">养宠经验</label>
                <textarea 
                  value={formData.experience}
                  onChange={(e) => updateField('experience', e.target.value)}
                  className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-all text-base resize-none" 
                  placeholder="告诉我们您之前的养宠经验..." 
                  rows={4} 
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-slate-700 ml-1">领养原因</label>
                <textarea 
                  value={formData.reason}
                  onChange={(e) => updateField('reason', e.target.value)}
                  className="w-full p-4 bg-white border-2 border-slate-100 rounded-xl focus:border-primary focus:ring-0 transition-all text-base resize-none" 
                  placeholder="为什么您想领养这只宠物？" 
                  rows={4} 
                />
              </div>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 space-y-4">
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">姓名</span>
                  <span className="font-bold">{formData.name || '未填写'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">电话</span>
                  <span className="font-bold">{formData.phone || '未填写'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">住房</span>
                  <span className="font-bold">{formData.housing === 'Apartment' ? '公寓' : '别墅'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">花园</span>
                  <span className="font-bold">{formData.hasGarden ? '有' : '无'}</span>
                </div>
                <div className="flex justify-between border-b border-slate-50 pb-2">
                  <span className="text-slate-500">其他宠物</span>
                  <span className="font-bold">{formData.hasOtherPets ? '有' : '无'}</span>
                </div>
              </div>
              <p className="text-xs text-slate-400 text-center px-4">
                点击提交即表示您同意我们的服务条款，并确认以上信息真实有效。
              </p>
            </motion.div>
          )}

          <div className="pt-4 flex gap-3">
            {step > 1 && (
              <button 
                onClick={handleBack}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-4 rounded-xl transition-all active:scale-[0.98]"
              >
                上一步
              </button>
            )}
            <button 
              onClick={handleNext}
              className={`${step > 1 ? 'flex-[2]' : 'w-full'} bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2`}
            >
              {step === totalSteps ? '提交申请' : '下一步'}
              {step === totalSteps ? <Send size={20} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

// --- API 驱动的子组件 ---

/**
 * 个人中心“最近看过”子组件
 * 从 API 加载宠物列表展示
 */
const RecentPetsSection = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(() => {
    petApi.getAll().then(data => setPets(data.slice(0, 3))).catch(console.error);
  }, []);

  return (
    <section className="mt-8 px-4">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-bold">最近看过</h3>
        <button className="text-primary text-sm font-semibold">查看全部</button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {pets.map(pet => (
          <div key={pet.id} className="flex-shrink-0 w-40 bg-white rounded-xl overflow-hidden border border-primary/5 shadow-sm">
            <div className="h-32 w-full">
              <img src={pet.image} alt={pet.name} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            <div className="p-3">
              <p className="font-bold">{pet.name}</p>
              <p className="text-xs text-slate-500">{pet.breed}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

/**
 * 探索页“热门推荐”网格子组件
 */
const ExplorePetsGrid = ({ onSelectPet }: { onSelectPet: (p: Pet) => void }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(() => {
    petApi.getAll().then(data => setPets(data.slice(0, 2))).catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {pets.map((pet) => (
        <div key={pet.id} onClick={() => onSelectPet(pet)} className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer">
          <img src={pet.image} alt={pet.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <p className="font-bold text-sm">{pet.name}</p>
            <p className="text-[10px] opacity-80">{pet.breed} • {pet.age}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * 探索页“新成员加入”子组件
 */
const ExploreNewPets = ({ onSelectPet }: { onSelectPet: (p: Pet) => void }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  useEffect(() => {
    petApi.getAll().then(setPets).catch(console.error);
  }, []);

  return (
    <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
      {pets.map((pet) => (
        <div key={pet.id} onClick={() => onSelectPet(pet)} className="flex-shrink-0 w-32 space-y-2 cursor-pointer">
          <div className="aspect-square rounded-2xl overflow-hidden border border-primary/5 shadow-sm">
            <img src={pet.image} alt={pet.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
          </div>
          <p className="font-bold text-xs text-center">{pet.name}</p>
        </div>
      ))}
    </div>
  );
};

/** 我的申请页面组件 */
const MyApplicationsScreen = ({ onBack }: { onBack: () => void }) => {
  const [applications, setApplications] = useState<ApplicationResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    applicationApi.getAll()
      .then(setApplications)
      .catch((err) => console.error('Failed to load applications:', err))
      .finally(() => setLoading(false));
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return '审核中';
      case 'approved':
        return '已通过';
      case 'rejected':
        return '已拒绝';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="h-screen bg-background-light flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-50 bg-background-light/80 backdrop-blur-md border-b border-primary/10">
        <div className="flex items-center px-4 py-4 max-w-2xl mx-auto w-full">
          <button onClick={onBack} className="text-slate-900 flex size-10 items-center justify-center rounded-full hover:bg-primary/10 transition-colors">
            <ArrowLeft size={24} />
          </button>
          <h2 className="text-lg font-bold flex-1 text-center">我的申请</h2>
          <div className="w-10" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto w-full p-4">
        {applications.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="mx-auto text-slate-300 mb-4" size={64} />
            <p className="text-slate-500 text-lg font-medium">暂无申请记录</p>
            <p className="text-slate-400 text-sm mt-2">提交领养申请后，可以在这里查看申请状态</p>
          </div>
        ) : (
          <div className="space-y-4">
            {applications.map((app) => (
              <motion.div
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-primary/5"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{app.name}</h3>
                    <p className="text-slate-500 text-sm mt-1">
                      申请时间：{new Date(app.created_at).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(app.status)}`}>
                    {getStatusText(app.status)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={16} />
                    <span>{app.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Home size={16} />
                    <span>{app.housing === 'Apartment' ? '公寓' : '房子'}</span>
                    {app.has_garden && '（有花园）'}
                  </div>
                  {app.experience && (
                    <div className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={16} className="mt-0.5" />
                      <span>{app.experience}</span>
                    </div>
                  )}
                  {app.reason && (
                    <div className="mt-3 pt-3 border-t border-primary/5">
                      <p className="text-sm text-slate-600">
                        <span className="font-bold">申请原因：</span>{app.reason}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

const ProfileScreen = ({ onNavigateToApplications }: { onNavigateToApplications?: () => void }) => {
  const menuItems = [
    { icon: FileText, label: '我的申请', action: onNavigateToApplications },
    { icon: Heart, label: '我的收藏' },
    { icon: BookOpen, label: '养宠技巧' },
    { icon: Settings, label: '设置' },
  ];

  return (
    <div className="pb-24">
      <header className="flex items-center bg-white p-4 sticky top-0 z-10 border-b border-primary/10 shadow-sm">
        <button className="text-primary flex size-10 items-center justify-center rounded-lg hover:bg-primary/10">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-slate-900 text-lg font-bold flex-1 text-center">个人中心</h2>
        <button className="text-primary flex size-10 items-center justify-center rounded-lg hover:bg-primary/10">
          <Settings size={24} />
        </button>
      </header>

      <main className="max-w-2xl mx-auto">
        <section className="flex p-6 flex-col items-center gap-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-lg overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrQ5TLceV5sB66yzT1lTv_AO1fRxnloV1ljja9J0XgFFlhwJGH28_C0vsyG2w2OH3vtSp8tcudMiAfsZHyd5_t6ijQIhIv0qiqJZnsAl6mCeeq0EScg8sweeyjEB58sIGNXoNg2iaDa-sDYCE9OQ60EihCH0WL-1qxQpuWMpTAYEsGtvEwBSVgPm6Juf5E7AujFcNIPV4ESWnKfLYZlwQBVQvA6JEw2Wx26nDuxXF_R8Ro1HV0dDrfD4saC5GEGRbf6luJf0nX1lPo" 
                alt="Avatar" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-1 right-1 bg-primary text-white p-1.5 rounded-full border-2 border-white">
              <Plus size={14} />
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">张伟</p>
            <div className="flex items-center justify-center gap-1 text-primary">
              <MapPin size={14} />
              <p className="text-sm font-medium">上海</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-2">
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5">
            {menuItems.map((item, idx) => (
              <React.Fragment key={item.label}>
                <button 
                  onClick={item.action}
                  className="w-full flex items-center gap-4 px-4 py-4 hover:bg-primary/5 transition-colors group"
                >
                  <div className="text-primary flex items-center justify-center rounded-lg bg-primary/10 shrink-0 size-10">
                    <item.icon size={20} />
                  </div>
                  <p className="text-slate-900 text-base font-medium flex-1 text-left">{item.label}</p>
                  <ChevronRight className="text-slate-400 group-hover:text-primary transition-colors" size={20} />
                </button>
                {idx < menuItems.length - 1 && <div className="h-px bg-primary/5 mx-4" />}
              </React.Fragment>
            ))}
          </div>
        </section>

        <RecentPetsSection />

        <section className="px-4 mt-6">
          <button className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-4 rounded-xl font-bold border border-red-100 hover:bg-red-100 transition-colors">
            <LogOut size={20} /> 退出登录
          </button>
        </section>
      </main>
    </div>
  );
};

const ExploreScreen = ({ onSelectPet }: { onSelectPet: (p: Pet) => void }) => {
  const [activeTab, setActiveTab] = useState<'Map' | 'Discovery'>('Discovery');
  
  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-primary/10 shadow-sm">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-slate-900 text-lg font-bold">探索发现</h2>
            <div className="flex bg-slate-100 p-1 rounded-full">
              <button 
                onClick={() => setActiveTab('Discovery')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'Discovery' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
              >
                发现
              </button>
              <button 
                onClick={() => setActiveTab('Map')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'Map' ? 'bg-white text-primary shadow-sm' : 'text-slate-500'}`}
              >
                地图
              </button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              className="w-full h-11 pl-11 pr-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-primary/20 text-sm" 
              placeholder="搜索附近的救助站或宠物..." 
            />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4">
        {activeTab === 'Map' ? (
          <div className="space-y-6">
            <div className="w-full h-[400px] rounded-2xl overflow-hidden relative border border-primary/10 shadow-sm">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAiWBx82ZCC1yCD0ENnggSKPZBfhMhynh5xcquy9xxpV0JQqk7EW3H1QEVryw5fwLsEnExjPCrk6pabvGPa7_Sm-DuuVFwd-YVP3G-KrW3NA6gLPhj5wloV0GidwaivOcPC0u5ac-p1-_qblAiJ4Mk9VvEcAXHZYFnmj9qP9A1xSuZRTFQP1aKAZa9ZQjgpkBMWvcbfpeCnMcFftTsg3LtDdQuzWqXh7SOfG-guXgrpPJLKB7IHSFyDPHLG0NYsdhMuYVNrJnx8XJWP" 
                alt="Map" 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-80"
              />
              {/* Mock Map Pins */}
              <div className="absolute top-1/4 left-1/3 group cursor-pointer">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg animate-bounce">
                  <PawPrint size={20} />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  西洛杉矶救助站
                </div>
              </div>
              <div className="absolute top-1/2 right-1/4 group cursor-pointer">
                <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                  <PawPrint size={20} />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white px-3 py-1 rounded-lg shadow-xl text-[10px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  圣莫尼卡中心
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-slate-900">推荐救助站</h3>
              <div className="space-y-3">
                {[
                  { name: '西洛杉矶救助站', distance: '1.2km', rating: '4.9', pets: '24' },
                  { name: '圣莫尼卡中心', distance: '3.5km', rating: '4.8', pets: '18' },
                ].map((station) => (
                  <div key={station.name} className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-primary/5 shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      <HomeIcon size={24} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{station.name}</h4>
                      <p className="text-[10px] text-slate-500">{station.distance} • {station.pets} 只宠物待领养</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-primary font-bold text-xs">
                        <span className="text-yellow-400 mr-1">★</span>
                        {station.rating}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">热门推荐</h3>
                <button className="text-primary text-xs font-bold">换一批</button>
              </div>
              <ExplorePetsGrid onSelectPet={onSelectPet} />
            </section>

            <section>
              <h3 className="font-bold text-slate-900 mb-4">新成员加入</h3>
              <ExploreNewPets onSelectPet={onSelectPet} />
            </section>

            <section className="bg-primary/5 p-6 rounded-3xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-primary font-bold text-lg mb-2">养宠百科</h3>
                <p className="text-slate-600 text-xs mb-4 leading-relaxed">了解如何更好地照顾你的新朋友，从饮食到训练，我们为你准备了全方位的指南。</p>
                <button className="bg-primary text-white px-6 py-2 rounded-full text-xs font-bold shadow-lg shadow-primary/20">
                  立即阅读
                </button>
              </div>
              <Compass className="absolute -right-4 -bottom-4 text-primary/10" size={120} />
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

const MessagesScreen = ({ onMarkRead }: { onMarkRead: () => void }) => {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    messageApi.getAll().then(setMessages).catch(console.error);
    onMarkRead();
  }, []);

  return (
    <div className="pb-24">
      <header className="sticky top-0 z-40 bg-white p-4 border-b border-primary/10 shadow-sm">
        <h2 className="text-slate-900 text-lg font-bold text-center">消息中心</h2>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p>暂无消息</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-primary/5">
              <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-primary/10">
                <img src={msg.avatar} alt={msg.sender} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-slate-900 truncate">{msg.sender}</h4>
                  <span className="text-[10px] text-slate-400">{msg.time}</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{msg.content}</p>
              </div>
              {msg.unread && (
                <div className="w-2 h-2 bg-primary rounded-full self-center" />
              )}
            </div>
          ))
        )}
      </main>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding');
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  // NOTE: 定期检查是否有未读消息
  useEffect(() => {
    const checkUnread = () => {
      messageApi.getAll()
        .then(msgs => setHasUnread(msgs.some(m => m.unread)))
        .catch(console.error);
    };
    checkUnread();
    const timer = setInterval(checkUnread, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleMarkRead = useCallback(() => {
    messageApi.markAllRead()
      .then(() => setHasUnread(false))
      .catch(console.error);
  }, []);

  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setScreen('details');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'onboarding':
        return <OnboardingScreen onStart={() => setScreen('home')} />;
      case 'home':
        return <HomeScreen onSelectPet={handleSelectPet} />;
      case 'details':
        return selectedPet ? (
          <PetDetailsScreen 
            pet={selectedPet} 
            onBack={() => setScreen('home')} 
            onAdopt={() => setScreen('application')} 
          />
        ) : null;
      case 'application':
        return <ApplicationScreen 
          onBack={() => setScreen('details')} 
          onSubmitted={() => setHasUnread(true)}
          petName={selectedPet?.name || ''}
          petId={selectedPet?.id || ''}
        />;
      case 'profile':
        return <ProfileScreen onNavigateToApplications={() => setScreen('myApplications')} />;
      case 'myApplications':
        return <MyApplicationsScreen onBack={() => setScreen('profile')} />;
      case 'explore':
        return <ExploreScreen onSelectPet={handleSelectPet} />;
      case 'messages':
        return <MessagesScreen onMarkRead={handleMarkRead} />;
      default:
        return <HomeScreen onSelectPet={handleSelectPet} />;
    }
  };

  return (
    <div className="min-h-screen bg-background-light font-sans">
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
      
      {screen !== 'onboarding' && screen !== 'details' && screen !== 'application' && (
        <BottomNav currentScreen={screen} setScreen={setScreen} hasUnread={hasUnread} />
      )}
    </div>
  );
}
