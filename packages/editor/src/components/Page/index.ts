import {ItemType, Register} from '@/types/schema';
import Dev from './dev';
import Prod from './prod';

export default (ctx: Register) => {
    ctx.registerComponent(ItemType.Page, {
        name: ItemType.Page,
        desc: '页面',
        defaultProps: {},
        dev: Dev,
        prod: Prod,
        order: 0,
        hiddenInMaterial: true,
        allowDrag: [],
    });
};
