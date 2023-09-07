import { LibraryComponentInstanceData } from "../../../../../types/src/library-component";
import { libraryMap } from "../../../../../library";

/**
 * 解析画布渲染组件的钩子
 * @returns 
 */
export default function useParaseLibrary() {
    const parseLibraryComponent = (data: LibraryComponentInstanceData) => {
        
        const component = libraryMap[data.componentName];

        if (!component) {
            throw new Error(`library component: ${data.libraryName} not found`);
        }
    }
    return {
        parseLibraryComponent
    }
}