// src/api/auth.ts
import request from '../utils/request'

// 🔴 第一处修改：强制写死为 true！不要用 import.meta.env
const IS_MOCK = true; 

export const login = (data: any) => {
  // 🔴 第二处检查：确保这里有 if 判断
  if (IS_MOCK) {
    console.log('🚀 [Demo Mode] 拦截登录请求，返回模拟 Token');
    return Promise.resolve({
      data: {
        jwt: 'demo-mock-token-123456',
        user: {
          id: 1,
          username: 'demo_user',
          email: 'demo@hospital.com',
          provider: 'local',
          confirmed: true,
          blocked: false
        }
      }
    });
  }

  // 如果上面没拦截住，才会走到这里（导致报错）
  return request.post('/auth/local', data);
}

export const getMe = () => {
  if (IS_MOCK) {
    return Promise.resolve({
      data: {
        id: 1,
        username: 'demo_user',
        email: 'demo@hospital.com'
      }
    });
  }
  return request.get('/users/me');
}