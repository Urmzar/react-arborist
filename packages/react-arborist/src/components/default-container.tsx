import { FixedSizeList } from "react-window";
import { useDataUpdates, useTreeApi } from "../context";
import { focusNextElement, focusPrevElement } from "../utils";
import { ListOuterElement } from "./list-outer-element";
import { ListInnerElement } from "./list-inner-element";
import { RowContainer } from "./row-container";

let focusSearchTerm = "";
let timeoutId: any = null;

/**
 * All these keyboard shortcuts seem like they should be configurable.
 * Each operation should be a given a name and separated from
 * the event handler. Future clean up welcome.
 */
export function DefaultContainer() {
  useDataUpdates();
  const tree = useTreeApi();
  return (
    <div
      style={{
        height: tree.height,
        width: tree.width,
        minHeight: 0,
        minWidth: 0,
      }}
    >
      <FixedSizeList
        className={tree.props.className}
        outerRef={tree.listEl}
        itemCount={tree.visibleNodes.length}
        height={tree.height}
        width={tree.width}
        itemSize={tree.rowHeight}
        overscanCount={tree.overscanCount}
        itemKey={(index) => tree.visibleNodes[index]?.id || index}
        outerElementType={ListOuterElement}
        innerElementType={ListInnerElement}
        onScroll={tree.props.onScroll}
        onItemsRendered={tree.onItemsRendered.bind(tree)}
        ref={tree.list}
      >
        {RowContainer}
      </FixedSizeList>
    </div>
  );
}
