import { FC } from "react";
import { addToFavorites, removeFromFavorites } from "redux/favoriteSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

interface FavoriteButtonProps {
  id: number;
  children?: never;
}
export const FavoriteButton: FC<FavoriteButtonProps> = ({ id }) => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((state) => state.favorite.list);

  return ids.includes(id) ? (
    <button
      onClick={() => dispatch(removeFromFavorites(id))}
      className={"rounded bg-red-100 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-200"}
    >
      Remove
    </button>
  ) : (
    <button
      onClick={() => dispatch(addToFavorites(id))}
      className={"rounded bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200"}
    >
      Favorite
    </button>
  );
};
