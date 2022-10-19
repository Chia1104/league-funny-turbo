import type { FC, ReactElement, ReactNode } from "react";
import { useInfiniteScroll, UseInfiniteScrollOptions } from "@/hooks";

interface ItemContent<D, C> {
  (index: number, data: D, context: C): ReactNode;
}

interface Props {
  infiniteScrollOptions: UseInfiniteScrollOptions;
  isSuccess?: boolean;
  isError?: boolean;
  data: any;
  listItems: ReactElement;
  itemProps?: any;
  intersectionObserverInit?: IntersectionObserverInit;
}

/**
 * 🚧 Work in progress
 *
 *
 * @param props: Props
 * @return FC<Props>
 */
const InfiniteList: FC<Props> = (props) => {
  const {
    infiniteScrollOptions,
    data,
    isSuccess = true,
    listItems: ListItems,
    itemProps,
  } = props;
  const { ref: lastItemRef } = useInfiniteScroll(infiniteScrollOptions);

  return (
    <div>
      {isSuccess && (
        <>
          {data.map((item: any, index: number) => {
            data.length === index + 1 ? (
              <ListItems.type key={item.id} ref={lastItemRef} {...itemProps} />
            ) : (
              <ListItems.type key={item.id} {...itemProps} />
            );
          })}
        </>
      )}
    </div>
  );
};

export default InfiniteList;
