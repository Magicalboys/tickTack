import { LibraryPanelTabEnum } from "./panel";

export type DefineComponent = () => JSX.Element;

export type TabName = "form" | "show" | "container";

export type tickType = "container" | "generics";

export interface LibraryComponent {
  name: string;

  libraryName: LibraryPanelTabEnum;

  tickType: string;

  tabName: string;

  order: number;

  libraryPanelShowDetail: {
    title: string;
    content: string;
  };

  tips: {
    title: string;

    content: string;

    preview?: DefineComponent;
  };
}
