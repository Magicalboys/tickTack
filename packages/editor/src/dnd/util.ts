import {useConfigState} from '@/store/features/configSlice';
import {useSelector} from 'react-redux';

export const getAcceptDrop = (componentName: string) => {
    const {componentConfig} = useSelector(state => useConfigState(state)); 
    return (
        Object
            .values(componentConfig)
            .filter ((component:any )=> component.allowDrag?.includes(componentName))
            .map((component: any) => component.name)
    );
};