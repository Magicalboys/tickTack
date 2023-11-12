import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import Header from './modules/Header';
import Content from './modules/Content';
import Library from './modules/Library';
import Control from './modules/Control';
import {useSelector} from 'react-redux';
import {useComponentState} from '@/store/features/editorSlice';
import Preview from './preview';
import {ComponentConfig} from './types/schema';
import {setComponentConfig} from './store/features/configSlice';
import {Spin} from 'antd';
import {useDispatch} from 'react-redux';

function App() {
    const componentConfigRef = useRef<any>({});
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const {mode} = useSelector(state => useComponentState(state));

    const registerComponent = (name: string, componentConfig: ComponentConfig) => {
        componentConfigRef.current[name] = componentConfig;
    };

    const loadComponentConfig = async () => {
        // 匹配components文件夹下的index.ts文件，加载组件配置模块代码
        const modules = import.meta.glob('./components/*/index.ts', {eager: true});
        const tasks = Object.values(modules).map((modules:any)=>{
            if (modules?.default) {
                return modules.default({registerComponent});
            }
        });

        // 等待所有组件配置 加载完成
        await Promise.all(tasks);
        dispatch(setComponentConfig(componentConfigRef.current));
        setLoading(false);
    };

    useEffect(() => {
        loadComponentConfig();
    }, []);

    if (loading) {
        return (
            <div className='loading'>
                <Spin />
            </div>
        );
    }
      
    return (
        <div className='container'> 
            <Header/>
            {
                mode === 'edit' ? (
                    <div className='box'>
                        <Library/>
                        <Content/>
                        <Control/>
                    </div>

                ) : <Preview/>
            }
              
        </div>
    );
}

export default App;

