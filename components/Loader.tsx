import { FC } from "react";

interface LoaderProps {
  children?: never;
}
export const Loader: FC<LoaderProps> = () => {
  return (
    <div className="flex flex-1 items-center justify-center">
      <p>Loading...</p>
    </div>
  );
};
