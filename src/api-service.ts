/**
 * 前端 API 服务层
 * 统一封装所有后端 API 调用，便于维护和类型安全
 */
import { Pet, Message } from './types';

// NOTE: 开发环境通过 Vite 代理转发到后端，无需指定完整 URL
const API_BASE = '/api';

/**
 * 通用请求封装
 * 统一处理错误和 JSON 解析
 */
async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error ${response.status}: ${errorText}`);
  }

  return response.json();
}

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
  getAll: (category?: string): Promise<Pet[]> => {
    const params = category && category !== 'All' ? `?category=${category}` : '';
    return request<Pet[]>(`/pets${params}`);
  },

  /** 根据 ID 获取宠物详情 */
  getById: (id: string): Promise<Pet> => {
    return request<Pet>(`/pets/${id}`);
  },
};

/**
 * 领养申请 API
 */
export const applicationApi = {
  /** 获取领养申请列表 */
  getAll: (): Promise<ApplicationResponse[]> => {
    return request('/applications');
  },
  /** 提交领养申请 */
  submit: (data: ApplicationForm): Promise<{ id: string }> => {
    return request('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

/**
 * 消息 API
 */
export const messageApi = {
  /** 获取所有消息 */
  getAll: (): Promise<Message[]> => {
    return request<Message[]>('/messages');
  },

  /** 创建新消息 */
  create: (data: {
    sender: string;
    avatar?: string;
    content: string;
    time?: string;
    type: string;
  }): Promise<Message> => {
    return request<Message>('/messages', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  /** 标记所有消息为已读 */
  markAllRead: (): Promise<{ updated: number }> => {
    return request('/messages/read-all', {
      method: 'PUT',
    });
  },
};
