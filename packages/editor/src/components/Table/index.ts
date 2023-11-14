import {Register} from '@/types/schema';
import TableDev from './dev';
import TableProd from './prod';

export default (register: Register) => {
    register.registerComponent('Table', {
        name: 'Table',
        desc: '表格',
        defaultProps: {},
        dev: TableDev,
        prod: TableProd,
        setter: [
            {
                name: 'url',
                label: 'URL',
                type: 'input',
            },
        ],
        methods: [
            {
                name: 'search',
                desc: '搜索',
            },
            {
                name: 'reload',
                desc: '刷新',
            },
        ],
        order: 5,
    });
};