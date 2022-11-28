import { type FC } from "react";
import { CloseIcon } from "@wanin/ui";

interface Props {
  label: string;
  onSelected?: () => void;
  onDeleted?: () => void;
}

const TagItem: FC<Props> = (props) => {
  const { label, onSelected, onDeleted } = props;

  if (onSelected) {
    return (
      <button
        onClick={onSelected}
        className="flex items-center justify-center rounded-full px-5 py-1 mr-2 mb-2 w-bg-primary shadow">
        <span className="text-sm text-gray-500">{label}</span>
      </button>
    );
  }

  return (
    <div className="w-fit rounded-full px-5 pr-6 py-1 w-bg-primary shadow group relative max-w-[100px]">
      <p className="text-sm text-gray-500 line-clamp-1">{label}</p>
      {onDeleted && (
        <button
          onClick={onDeleted}
          className="opacity-0 absolute right-0 top-0 group-hover:opacity-100 transition ease-in-out w-bg-secondary rounded-full mt-[0.1rem]">
          <CloseIcon className="text-red-400" />
        </button>
      )}
    </div>
  );
};

export default TagItem;
