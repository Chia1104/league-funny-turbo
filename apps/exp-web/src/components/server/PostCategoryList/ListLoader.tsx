import { type FC } from "react";

const ListLoader: FC = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
        <div
          className="w-full h-10 w-bg-primary rounded-lg animate-pulse"
          key={item}
        />
      ))}
    </>
  );
};

export default ListLoader;
