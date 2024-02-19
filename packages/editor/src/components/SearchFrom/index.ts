import {ItemType, Register} from '@/types/schema';
import Dev from './dev';
import Prod from './prod';

export default (register: Register) => {
    register.registerComponent('SearchForm',{
        name: 'SearchForm',
        desc:'搜索',
        defaultProps: {},
        dev:Dev,
        prod:Prod,
        events:[
            {
                name:'onSearch',
                desc:'搜索',
            }
        ],
        order:9,
        allowDrag: [ItemType.Page],
    });
};