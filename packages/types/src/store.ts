import { LibraryComponent } from "./library-component";
import { LibraryComponentInstanceData } from "./library-component";

export interface storeData {
  contentData: LibraryComponentInstanceData[];
  focus: boolean;
}

export interface actions {
  showContent: (state: LibraryComponent) => void;
  addComponent: (state: LibraryComponentInstanceData) => void;
  deleteComponent: (state: LibraryComponent) => void;
}
