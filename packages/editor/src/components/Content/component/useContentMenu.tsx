import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
// import styles from "./index.less";

interface MenuData {}

type PositionType = { left: number; top: number };

export interface MenuProps {
  targetElementClassName?: string;
  isAutoListenEvent?: boolean;
  menu?: React.ReactNode;
  menuData?: MenuData[];
  position?: PositionType;
  style?: { [propsName: string]: number | string };
  visibleWithClass?: string[]; // 元素的class name，点击当前元素时，菜单不隐藏
  menuVisible?: boolean;
  [propsName: string]: unknown;
}

const ContextMenu: React.FC<MenuProps> = forwardRef((props, ref) => {
  const menuRef = useRef<any>(null);

  const {
    targetElementClassName,
    isAutoListenEvent = true,
    menuVisible,
    style,
    visibleWithClass = [],
  } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

  useImperativeHandle(ref, () => ({
    menuRef,
    visible,
    event: currentEvent,
    handleContextMenu,
    closeMenu,
    openMenu,
  }));

  useEffect(() => {
    if (isAutoListenEvent) {
      document.addEventListener("contextmenu", handleContextMenu);
      document.addEventListener("click", (e) => handleClick(e));
      document.addEventListener("scroll", handleScroll);
    }

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", handleScroll);
    };
  }, [menuVisible]);

  const handleContextMenu = (event: MouseEvent, position?: PositionType) => {
    setCurrentEvent(event);

    // const nodeName = event.target.nodeName
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const className = (event.target as any)?.className;
    // const id = event.target.id;

    if (
      !(
        targetElementClassName &&
        className &&
        targetElementClassName === className
      )
    ) {
      return;
    }

    event.preventDefault();

    // event.target.nodeName 获取事件触发元素标签名（li，p，div，img，button…）
    // event.target.id 获取事件触发元素id
    // event.target.className 获取事件触发元素classname
    // event.target.innerHTML 获取事件触发元素的内容（li）

    setVisible(true);

    //获取可视区宽度
    const winWidth = function () {
      return document.documentElement.clientWidth || document.body.clientWidth;
    };
    //获取可视区高度
    const winHeight = function () {
      return (
        document.documentElement.clientHeight || document.body.clientHeight
      );
    };

    const menu = menuRef.current;
    let l = event.clientX;
    let t = event.clientY;

    if (position) {
      l = position.left;
      t = position.top;
    }

    if (l >= winWidth() - menu?.offsetWidth) {
      l = winWidth() - menu?.offsetWidth;
    } 
    if (t > winHeight() - menu?.offsetHeight) {
      t = winHeight() - menu?.offsetHeight;
    } 

    if (menu) {
      menu.style.left = l + "px";
      menu.style.top = t + "px";
    }

    return false;
  };

  const closeMenu = () => {
    setVisible(false);
  };
  const openMenu = () => {
    setVisible(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleClick = (event: any) => {
    const className = event.target?.className;
    const parentNode = event.target?.parentNode;

    for (let i = 0; i < visibleWithClass.length; i++) {
      const name = visibleWithClass[i];

      if (
        (className && className?.startsWith(name)) ||
        parentNode?.className?.startsWith(name)
      ) {
        return;
      }
    }

    setVisible(false);
  };
  const handleScroll = () => {
    setVisible(false);
  };

  return visible ? (
    <div
      // className={styles.menu}
      id="context-menu"
      ref={menuRef}
      style={style ? style : {}}
    >
      {/* {props.children || menu} */}
      123
    </div>
  ) : (
    <></>
  );
});

export default ContextMenu;
