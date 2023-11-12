import React, {useRef} from 'react';
import './index.less';
import {useSelector} from 'react-redux';
import {useComponentState} from '@/store/features/editorSlice';
import {useVariableState} from '@/store/features/variableSlice';
import {renderComponents} from './until';
import {useConfigState} from '@/store/features/configSlice';

const Preview = () => {
    const componentRefs = useRef<any>({});
    const {componentConfig} = useSelector(state => useConfigState(state));
    const {componentTree} = useSelector((state) => useComponentState(state));
    const {variables, variableData} = useSelector(state => useVariableState(state));

    return (
        <div className='preview'>
            <React.Suspense fallback="loading...">
                {renderComponents(componentTree,componentConfig,variables, variableData,componentRefs)}
            </React.Suspense>
        </div>
    );
};

export default Preview;