/**
 * 前端 API 服务层
 * 直接连接 Supabase，便于 Vercel 部署
 */
import { Pet, Message } from './types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// NOTE: Vercel 部署后直接连接 Supabase
// 从环境变量获取配置（Vercel 中设置）
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://lexmsuaouaozpyqiehbn.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_aWeT_cUtDmq6XywSv4V0Fg_SA0JsO_S';

// 创建 Supabase 客户端
const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/** 领养申请表单数据 */
export interface ApplicationForm {
  pet_id: string;
  name: string;
  address: string;
  phone: string;
  housing: string;
  has_garden: boolean;
  has_other_pets: boolean;
  experience: string;
  reason: string;
}

/** 领养申请响应数据 */
export interface ApplicationResponse {
  id: string;
  pet_id: string;
  name: string;
  address: string;
  phone: string;
  housing: string;
  has_garden: boolean;
  has_other_pets: boolean;
  experience: string;
  reason: string;
  status: string;
  created_at: string;
}

/**
 * 宠物相关 API
 */
export const petApi = {
  /** 获取宠物列表，支持按分类筛选 */
  getAll: async (category?: string): Promise<Pet[]> => {
    let query = supabase.from('pets').select('*');
    
    if (category && category !== 'All') {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Failed to load pets:', error);
      return [];
    }
    
    return data as Pet[];
  },

  /** 根据 ID 获取宠物详情 */
  getById: async (id: string): Promise<Pet | null> => {
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !data) {
      console.error('Failed to load pet:', error);
      return null;
    }
    
    return data as Pet;
  },
};

/**
 * 领养申请 API
 */
export const applicationApi = {
  /** 获取领养申请列表 */
  getAll: async (): Promise<ApplicationResponse[]> => {
    const { data, error } = await supabase
      .from('adoption_applications')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Failed to load applications:', error);
      return [];
    }
    
    return data as ApplicationResponse[];
  },
  /** 提交领养申请 */
  submit: async (data: ApplicationForm): Promise<{ id: string }> => {
    const { data: result, error } = await supabase
      .from('adoption_applications')
      .insert({
        pet_id: data.pet_id,
        name: data.name,
        address: data.address,
        phone: data.phone,
        housing: data.housing,
        has_garden: data.has_garden,
        has_other_pets: data.has_other_pets,
        experience: data.experience,
        reason: data.reason,
        status: 'pending',
      })
      .select()
      .single();
    
    if (error) {
      console.error('Failed to submit application:', error);
      throw error;
    }
    
    return { id: (result as any).id };
  },
};

/**
 * 消息 API
 */
export const messageApi = {
  /** 获取所有消息 */
  getAll: async (): Promise<Message[]> => {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Failed to load messages:', error);
      return [];
    }
    
    return data as Message[];
  },

  /** 创建新消息 */
  create: async (data: {
    sender: string;
    avatar?: string;
    content: string;
    time?: string;
    type: string;
  }): Promise<Message> => {
    const { data: result, error } = await supabase
      .from('messages')
      .insert({
        sender: data.sender,
        avatar: data.avatar,
        content: data.content,
        time: data.time,
        type: data.type,
        unread: true,
      })
      .select()
      .single();
    
    if (error) {
      console.error('Failed to create message:', error);
      throw error;
    }
    
    return result as Message;
  },

  /** 标记所有消息为已读 */
  markAllRead: async (): Promise<{ updated: number }> => {
    const { data, error } = await supabase
      .from('messages')
      .update({ unread: false })
      .eq('unread', true);
    
    if (error) {
      console.error('Failed to mark messages as read:', error);
      return { updated: 0 };
    }
    
    return { updated: data?.length || 0 };
  },
};
