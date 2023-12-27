import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import DndComponent from "./component/dndComponent";
import { render } from "@ticktack/library/src/utils/factory";
import { addComponent, updateFocus } from "@/store/features/counterSlice";
import { CounterSliceType } from "@/store";
import { DragProp } from "@tickTack/types/src/drop-drag";
import { UIInstance } from "@tickTack/types/src/library-component";
import "./style.scss";

const Content: React.FC = () => {
  const contentData = useSelector(
    (state: CounterSliceType) => state.tickTack.contentData
  );
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: DragProp.SORT,
    drop: (item: [UIInstance, number]) => {
      const [json] = item;
      const _json = {
        component: {
          ...json.component,
          uuid: uuidv4(),
        }
      };
      console.log(_json, "json");
      dispatch(addComponent({ json: _json }));
    },
  });

  const handleFocus = (uuid: string) => {
    console.log(uuid);
    dispatch(updateFocus({uuid}));
  }

  useEffect(() => {
    drop(ref);
  }, []);

  return (
    <>
      <div className="container-content" ref={ref}>
        {contentData && contentData.length ? (
          contentData.map((item) => {
            const uuid = item.component.uuid;
            return (
              <div key={`${uuid}`} onClick={() => handleFocus(uuid!)}>
                <DndComponent>{render(item)}</DndComponent>
              </div>
            );
          })
        ) : (
          <div>请拖动左侧的组件并放置在此处</div>
        )}
        {}
      </div>
    </>
  );
};

export default Content;
