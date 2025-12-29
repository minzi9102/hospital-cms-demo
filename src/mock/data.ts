// src/mock/data.ts
import type { Patient, Treatment } from '../api/types';

// 模拟图片
const DEMO_IMG = 'https://placehold.co/600x400/409EFF/ffffff?text=Treatment+Image';

// 1. 模拟治疗记录数据 (扁平化存储，用于治疗列表页)
export const MOCK_TREATMENTS: Treatment[] = [
  {
    id: 101,
    documentId: 'mock_treat_01',
    treatmentNo: '第2次',
    sequence_number: 2,
    target: 'face', 
    createdAt: '2025-01-05',
    duration: 1.5,
    patient: { id: 1, Name: '演示账号' } as any, 
    Images: [
      { 
        id: 1, 
        documentId: 'img_01', 
        url: DEMO_IMG, 
        name: 'demo.jpg', 
        width: 600, 
        height: 400, 
        formats: { thumbnail: { url: DEMO_IMG, width: 300, height: 200 } } as any 
      }
    ]
  },
  {
    id: 102,
    documentId: 'mock_treat_02',
    treatmentNo: '第1次',
    sequence_number: 1,
    target: 'arm',
    createdAt: '2024-12-20',
    duration: 1.0,
    patient: { id: 1, Name: '演示账号' } as any,
    Images: []
  }
];

// 2. 模拟患者数据 (包含嵌套的治疗记录)
export const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    documentId: 'mock_doc_001',
    Name: '演示账号',
    Gender: 'male',
    Birthday: '1995-05-20',
    treatmentNo: '第2次', 
    past_treatments: ['laser'],
    // ✅ 修复点：在数组索引后添加 '!' 断言
    treatments: [MOCK_TREATMENTS[0]!, MOCK_TREATMENTS[1]!] 
  },
  {
    id: 2,
    documentId: 'mock_doc_002',
    Name: '林测试',
    Gender: 'female',
    Birthday: '2000-10-01',
    treatmentNo: '无',
    past_treatments: ['none'],
    treatments: []
  }
];

// 3. 辅助函数
export const generateId = () => Math.floor(Math.random() * 10000) + 1000;
export const generateDocId = () => `mock_new_${Date.now()}`;