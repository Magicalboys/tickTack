// src/app/components/DataFetcher.tsx
import React from 'react';

export default async function DataFetcher<T extends () => Promise<any>>({
    handle,
    children,
    errorMessage,
}: {
  handle: T,
  children: (data: Awaited<ReturnType<T>>) => Exclude<React.ReactNode, any>,
  errorMessage?: (error: any) => Exclude<React.ReactNode,any>,
}) {
    try {
    // 执行传进来的方法
        const data = await handle();
        // 判断如果children为方法则执行，并且把上一步得到的数据作为参数传入，如果为组件则直接渲染
        return typeof children === 'function' ? children(data) : children;
    } catch (error: any) {
    // 如果有错误信息就返回错误信息，没有就返回默认的
        return errorMessage?.(error) || '数据加载失败';
    }
}
