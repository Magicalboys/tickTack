import {ItemType, Register} from '@/types/schema';
import Dev from './dev';
import Prod from './prod';

export default (register: Register) => {
    register.registerComponent('SearchFormItem', {
        name: 'SearchFormItem',
        desc: '搜索项',
        defaultProps: () => {
            return {
                name: {type: 'static', value: new Date().getTime()},
                label: {type: 'static', value: '标题'},
                type: 'input',
            };
        },
        dev: Dev,
        prod: Prod,
        setter: [
            {
                name: 'type',
                label: '类型',
                type: 'select',
                options: [
                    {
                        label: '输入框',
                        value: 'input',
                    },
                ],
            },
            {
                name: 'label',
                label: '标题',
                type: 'input',
            },
            {
                name: 'name',
                label: '字段',
                type: 'input',
            },
        ],
        order: 8,
        allowDrag: [ItemType.SearchForm],
    });
};
