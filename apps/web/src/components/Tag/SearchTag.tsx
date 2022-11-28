import { type FC } from "react";
import { Input } from "@/components";
import { z } from "zod";

const searchSchema = z.string().min(1).max(10);

const SearchTag: FC = () => {
  return (
    <Input
      placeholder="新增標籤"
      className="max-w-[200px] p-1"
      schema={searchSchema}
    />
  );
};

export default SearchTag;
