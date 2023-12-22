import React from 'react';
import { v4 as uuidv4 } from "uuid";
import {Tantd, TantdPro} from '@/components/chooseAntd';
import DragItem from '@/components/dragItem';
import { LibraryComponentInstanceData, LibraryComponentInstanceProps } from '@ticktack/types/src/library-component';

/**
 * 组件工厂
 */

const drawShowProps = (showProps: LibraryComponentInstanceProps) => {
    const result = {};
    Object.keys(showProps).map((propKey) => {
        const prop = showProps[propKey]
        const key = prop.control
        const value = prop.defaultValue
        result[key] = value
    })
    return result
}

const generateCompoennt = (node: LibraryComponentInstanceData) => {
  const componentName = Tantd[node.componentName as TantdPro];
  let propTpl = {};
  if (node.props) {
    propTpl = drawShowProps(node.props);
  }
  return (
    <>
      <DragItem node={node}>
        {React.createElement(componentName, propTpl)}
      </DragItem>    
    </>
  )
}

export const GenerateChildenComponent = (node: LibraryComponentInstanceData) => {
  const generateContainer = (node: LibraryComponentInstanceData) => {
    const componentName = Tantd[node.componentName as TantdPro];
    let propTpl = {};
    if (node.props) {
      propTpl = drawShowProps(node.props);
    }
   return (
    <>
      <DragItem node={node}>
        {React.createElement(componentName, propTpl, node.children?.map(GenerateChildenComponent))}
      </DragItem>    
    </>
   )
  }

  if (node.libraryName === 'container') {
    return generateContainer(node)
    
  } else {
    return generateCompoennt(node)
  }
}

export const generateUuid = () => {
  const uuid = uuidv4();
  return uuid;
}

export const GenerateControlComponent = (node: LibraryComponentInstanceData) => {
  if (node.props) {
    const props = node.props;
    return Object.keys(props).map((propKey) => {
      const fakeProps: {
        defaultValue?: string;
        options?: unknown;
      } = {};
      const prop = props[propKey];
      const ComponentName = Tantd[prop.type as TantdPro]
      fakeProps['defaultValue'] = prop.defaultValue
      if (prop.options) {
        fakeProps['options'] = prop.options;
      }

      const element = React.createElement(ComponentName, fakeProps);
      console.log(element);
      return (
        <>
          <div style={{ height: 20 }}>{prop.title}</div>
          {element}
        </>
      )
    })
  }
}
