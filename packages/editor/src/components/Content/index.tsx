import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import DndComponent from "./component/dndComponent";
import { render } from "@ticktack/library/src/utils/factory";
import { updateFocus } from "@/store/features/counterSlice";
import { CounterSliceType } from "@/store";
import { DragProp } from "@tickTack/types/src/drop-drag";
import "./style.scss";

const Content: React.FC = () => {
  const contentData = useSelector(
    (state: CounterSliceType) => state.tickTack.contentData
  );
  const dispatch = useDispatch();
  const ref = useRef(null);
  const clickRef = useRef(null);

  const [, drop] = useDrop({
    accept: DragProp.SORT,
  });

  const handleFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    let uuid;
    const clickElement = event.target as HTMLDivElement;
    if (!clickElement.getAttribute("uuid")) {
      uuid = (clickElement.parentNode as HTMLDivElement)?.getAttribute("uuid") as string;
    } else {
      uuid = clickElement.getAttribute("uuid") as string;
    }
    dispatch(updateFocus({ uuid }));
  };

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <>
      <div className="container-content" ref={ref}>
        {contentData && contentData.length ? (
          contentData.map((item, index) => {
            const uuid = item.component.uuid;
            return (
              <div
                key={`${uuid}`}
                onClick={handleFocus}
                ref={clickRef}
              >
                <DndComponent index={index}>{render(item)}</DndComponent>
              </div>
            );
          })
        ) : (
          <div>请拖动左侧的组件并放置在此处</div>
        )}
      </div>
    </>
  );
};

export default Content;
