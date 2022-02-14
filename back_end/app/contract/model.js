'use strict';

module.exports = {
  Student: {
    id: { type: 'number', description: '学生ID' },
    name: { type: 'string', description: '学生姓名' },
    age: { type: 'number', description: '学生年龄' },
    class_id: { type: 'number', description: '班级ID' },
    created_at: { type: 'string', description: '创建时间' },
    updated_at: { type: 'string', description: '更新时间' },
  },
};
