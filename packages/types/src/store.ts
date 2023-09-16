import {
  LibraryComponent,
  LibraryComponentInstanceData,
  contentJsonProp,
} from "./library-component";

export interface storeData {
  contentData: LibraryComponentInstanceData[];
  count: number;
  contentJson: contentJsonProp[];
}

export interface actions {
  showContent: (state: LibraryComponent) => void;
  addComponent: (state: LibraryComponentInstanceData) => void;
  deleteComponent: (state: LibraryComponent) => void;
}
