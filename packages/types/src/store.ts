import { UIInstance } from "./library-component";

export interface storeData {
  contentData: UIInstance[];
  windowEvent: {[eventName: string]: string};
  ref: HTMLDivElement | null;
}

// export interface actions {
//   showContent: (state: LibraryComponent) => void;
//   addComponent: (state: LibraryComponentInstanceData) => void;
//   deleteComponent: (state: LibraryComponent) => void;
// }
