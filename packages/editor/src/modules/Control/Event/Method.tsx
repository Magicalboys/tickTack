import {useComponentState} from '@/store/features/editorSlice';
import {Select, TreeSelect} from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {componentMethodsMap} from '../utils';
import {getComponentById} from '../../Content/utils';
import {DefaultOptionType} from 'antd/es/select';
interface Props {
    value: any;
}

const MethodSetting = ({value}: Props) => {

    const {componentTree} = useSelector(state => useComponentState(state));

    const component: any = useMemo(()=>{
        if (value?.config?.componentId) {
            return getComponentById(value?.config?.componentId,componentTree);
        }
    },[value?.config?.componentId]);

    const options: DefaultOptionType[] = useMemo(() => {
        return componentMethodsMap[component?.name || ''].map(
            method => ({label: method.label, value: method.name}) 
        );
    },[component]);

    return (
        <>
            <FormItem label='组件' name={['config','componentId']}>
                <TreeSelect
                    style={{width: 240}}
                    treeData={componentTree}
                    fieldNames={{
                        label: 'name',
                        value: 'id',
                    }}/>
            </FormItem>  
            {componentMethodsMap[component?.name || ''] && (
                <FormItem>
                    <Select 
                        style={{width: 240}}
                        options={options}
                    />
                </FormItem>
            )}
        </>
    );
};

export default MethodSetting;