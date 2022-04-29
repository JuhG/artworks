import { ArtworkCard } from "components/ArtworkCard";
import type { NextPage } from "next";
import { loadItem } from "redux/artworkSlice";
import { useAppSelector, useAppDispatch } from "redux/store";

const Favorites: NextPage = () => {
  const dispatch = useAppDispatch();
  const ids = useAppSelector((state) => state.favorite.list);
  const list = useAppSelector((state) => state.artwork.cache);

  const favorites = ids.map((id) => {
    const found = list.find((artwork) => artwork.id === id);
    if (!found) {
      dispatch(loadItem(id));
    }
    return found;
  });

  if (!ids.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>No favorites yet!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <ul className="flex flex-wrap justify-center gap-8">
        {favorites.map((artwork) => {
          if (!artwork) {
            return null;
          }
          return <ArtworkCard key={artwork.id} artwork={artwork} />;
        })}
      </ul>
    </div>
  );
};

export default Favorites;
