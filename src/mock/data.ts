// src/mock/data.ts
import type { Patient } from '../api/types';

// 使用在线占位图，确保 GitHub Pages 能显示
const DEMO_IMG = 'https://placehold.co/600x400/409EFF/ffffff?text=Treatment+Image';

export const MOCK_PATIENTS: Patient[] = [
  {
    id: 1,
    documentId: 'demo_001',
    // ✅ 修复 1: 属性名首字母大写，严格匹配 Patient 接口
    Name: '演示账号', 
    // ✅ 修复 2: 值必须是 'male' 或 'female' (小写)，匹配 interface 定义
    Gender: 'male', 
    Birthday: '1995-05-20',
    
    // 其他字段保持不变
    past_treatments: ['laser'], // 确保这些值在你的 PAST_TREATMENT_MAP 中存在
    treatments: [
      {
        id: 101,
        documentId: 't_001',
        treatmentNo: '第1次',
        sequence_number: 1,
        target: 'face', // 确保这个值在 TREATMENT_TARGET_MAP 中存在
        createdAt: '2025-01-01',
        duration: 1.5,
        Images: [
          { 
            id: 1, 
            documentId: 'img_001',
            name: 'demo.jpg',
            url: DEMO_IMG, 
            width: 600,
            height: 400,
            formats: { 
              thumbnail: { url: DEMO_IMG, width: 300, height: 200 },
              small: { url: DEMO_IMG, width: 300, height: 200 },
              medium: { url: DEMO_IMG, width: 300, height: 200 },
              large: { url: DEMO_IMG, width: 300, height: 200 }
            } 
          }
        ] 
      }
    ]
  },
  {
    id: 2,
    documentId: 'demo_002',
    Name: '张三 (示例)',
    Gender: 'female', // ✅ 修复: 使用 'female'
    Birthday: '2000-10-01',
    past_treatments: ['none'],
    treatments: []
  }
];