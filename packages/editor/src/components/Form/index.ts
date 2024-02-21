import {ItemType, Register} from '@/types/schema';
import Dev from './dev';
import Prod from './prod';

export default (register: Register) => {
    register.registerComponent('Form', {
        name: 'Form',
        desc: '表单',
        defaultProps: {},
        dev: Dev,
        prod: Prod,
        setter: [
            {
                name: 'url',
                label: 'URL',
                type: 'input',
            },
        ],
        events: [
            {
                name: 'onSaveSuccess',
                desc: '保存成功',
            },
            {
                name: 'onSaveFail',
                desc: '保存失败',
            },
        ],
        methods: [
            {
                name: 'submit',
                desc: '提交',
            },
        ],
        order: 11,
        allowDrag: [ItemType.Page, ItemType.Space, ItemType.Modal],
    });
};