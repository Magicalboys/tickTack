import {Register} from '@/types/schema';
import Dev from './dev';
import Prod from './prod';

export default (register: Register) => {
    register.registerComponent('SearchFrom',{
        name: 'SearchFrom',
        desc:'搜索',
        defaultProps: {},
        dev:Dev,
        prod:Prod,
        event:[
            {
                name:'onSearch',
                desc:'搜索',
            }
        ],
        order:9
    });
};