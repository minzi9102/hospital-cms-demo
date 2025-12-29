// src/api/patient.ts
import request from '../utils/request'
import qs from 'qs'
import type { ApiResponse, Patient, PatientQueryParams } from './types'
// 引入 mock 数据
import { MOCK_PATIENTS } from '../mock/data'

// 判断是否开启 Mock (在 .env 或构建脚本中定义)
// 注意：确保 vite.config.ts 或 .env 中配置了 VITE_USE_MOCK
// const IS_MOCK = import.meta.env.VITE_USE_MOCK === 'true' || import.meta.env.MODE === 'ghpages';
const IS_MOCK = true // 强制开启 Mock，用于演示
// 获取患者列表
export const getPatientList = (params: PatientQueryParams) => {
  // ---------------------------------------------------------
  // 🚀 Mock 拦截逻辑开始
  // ---------------------------------------------------------
  if (IS_MOCK) {
    console.log('🚀 [Demo Mode] getPatientList: 返回本地 Mock 数据');
    
    let result = [...MOCK_PATIENTS];

    // 简单的模拟搜索 (支持按 Name 搜索)
    // 你的 filters 结构通常是 filters[Name][$containsi]=xxx
    if (params?.filters?.Name?.$containsi) {
      const keyword = params.filters.Name.$containsi.toLowerCase();
      result = result.filter(p => p.Name.toLowerCase().includes(keyword));
    }

    // 模拟 Strapi 响应结构
    return Promise.resolve({
      data: {
        data: result,
        meta: {
          pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 1,
            total: result.length
          }
        }
      }
    } as any); // 使用 as any 规避 AxiosResponse 类型差异
  }
  // ---------------------------------------------------------
  // 🚀 Mock 拦截逻辑结束，以下是你原有的真实请求逻辑
  // ---------------------------------------------------------

  const { page, pageSize, ...restParams } = params

  const defaultPopulate = {
    treatments: {
      fields: ['treatmentNo', 'target', 'createdAt', 'documentId'],
      sort: ['createdAt:desc']
    }
  }

  const queryObject = {
    pagination: {
      page: page,
      pageSize: pageSize
    },
    populate: restParams.populate || defaultPopulate,
    ...restParams,
  }

  if (restParams.populate) {
      delete (queryObject as any).populate_backup
  }

  const queryString = qs.stringify(queryObject, {
    encodeValuesOnly: true
  })

  return request.get<any, ApiResponse<Patient>>(`/patients?${queryString}`)
}

// ----------------------------------------------------------------
// 下面的增删改查，在 Mock 模式下应该被拦截或禁用
// ----------------------------------------------------------------

export const deletePatient = (documentId: string) => {
  if (IS_MOCK) return Promise.reject('演示模式不支持删除操作');
  return request.delete(`/patients/${documentId}`)
}

export const createPatient = (data: any) => {
  if (IS_MOCK) return Promise.reject('演示模式不支持创建操作');
  const { documentId, treatments, id, ...dataToSubmit } = data
  return request.post('/patients', { data: dataToSubmit })
}

export const updatePatient = (documentId: string, data: any) => {
  if (IS_MOCK) return Promise.reject('演示模式不支持修改操作');
  const { documentId: _, treatments, id, ...dataToSubmit } = data
  return request.put(`/patients/${documentId}`, { data: dataToSubmit })
}