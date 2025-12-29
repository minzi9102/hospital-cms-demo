<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
// 引入封装好的 API，它会自动根据 api/auth.ts 里的 IS_MOCK 决定是否拦截
import { login } from '../../api/auth'

const router = useRouter()
const loading = ref(false)

// 表单数据
const form = reactive({
  identifier: '',
  password: ''
})

// 表单验证规则
const rules = {
  identifier: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const loginFormRef = ref()

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  await loginFormRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        // 调用封装的登录接口 (如果是演示模式，这里会直接返回假数据，不会发网络请求)
        const res: any = await login(form)
        
        // 登录成功逻辑
        ElMessage.success('登录成功')
        
        // 1. 存储 Token
        localStorage.setItem('jwt', res.data.jwt)
        // 2. 存储用户信息
        localStorage.setItem('user', JSON.stringify(res.data.user))
        
        // 3. 跳转到首页
        router.push('/') 
        
      } catch (error: any) {
        console.error('Login Failed:', error)
        // 如果 API 返回了错误信息，显示出来；否则显示默认错误
        const errorMsg = error.response?.data?.error?.message || '登录失败，请检查网络或账号'
        ElMessage.error(errorMsg)
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
        <h2 class="login-title">🏥 治疗记录管理平台</h2>
      </template>
      
      <el-form 
        ref="loginFormRef"
        :model="form" 
        :rules="rules" 
        label-position="top"
        @keyup.enter="handleLogin"
      >
        <el-form-item label="账号 / 邮箱" prop="identifier">
          <el-input v-model="form.identifier" placeholder="请输入用户名" />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input 
            v-model="form.password" 
            type="password" 
            placeholder="请输入密码" 
            show-password
          />
        </el-form-item>
        
        <el-button 
          type="primary" 
          class="login-btn" 
          :loading="loading" 
          @click="handleLogin"
        >
          立即登录
        </el-button>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.login-container {
  /* 确保高度占满视口 */
  height: 100vh;
  /* 强制宽度 100% */
  width: 100%;
  /* 防止溢出滚动条 */
  overflow: hidden; 
  
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5;
  background-image: radial-gradient(#e1e1e1 1px, transparent 1px);
  background-size: 20px 20px;
}

.login-card {
  width: 400px;
  border-radius: 8px;
}

.login-title {
  text-align: center;
  margin: 0;
  color: #303133;
}

.login-btn {
  width: 100%;
  margin-top: 20px;
  padding: 20px 0;
  font-size: 16px;
}
</style>