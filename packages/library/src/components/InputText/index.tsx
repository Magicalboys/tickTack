export interface TextControlProps extends FormOptionsSchema {

}

export const TextControl = {

    // 组件名称
    title: '文本框',
    // 关联渲染器名字
    rendererName: 'input-text',

    description: '文本输入框，支持普通文本、密码、URL、邮箱等多种内容输入',

    tags: ['表单项'],
    
    // 组件配置
    scaffold : {
        type: 'input-text',
        label: '文本',
        name: 'text'
    },

  
};