// src/api/auth.ts
import request from '../utils/request'

// 检测是否为演示/Mock模式
// const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.MODE === 'ghpages';
const IS_MOCK = true
// 登录接口
export const login = (data: any) => {
  // 🚀 Mock 拦截：如果是演示模式，直接返回登录成功
  if (IS_MOCK) {
    console.log('🚀 [Demo Mode] 拦截登录请求，返回模拟 Token');
    return Promise.resolve({
      data: {
        jwt: 'demo-mock-token-123456', // 伪造一个 Token
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

  // 真实环境：发送请求给 Strapi
  return request.post('/auth/local', data);
}

// 获取当前用户信息 (可选，为了防止进入首页后报错)
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