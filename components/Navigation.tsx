import { FC, useEffect } from "react";
import { Search } from "components/Search";
import Link from "next/link";
import Image from "next/image";
import { useAppDispatch } from "redux/store";
import { setFavorites } from "redux/favoriteSlice";

interface NavigationProps {
  children?: never;
}
export const Navigation: FC<NavigationProps> = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorite") || "[]");
    dispatch(setFavorites(favs));
  }, [dispatch]);

  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
      <div className="flex items-center gap-4">
        <Image src="https://api.artic.edu/docs/assets/logo.svg" width="50" height="50" alt="Art Institute of Chicago" />
        <Link href="/">
          <a className="rounded px-2.5 py-1.5 font-medium text-yellow-900 hover:bg-yellow-50">Artworks</a>
        </Link>
        <Link href="/favorites">
          <a className="rounded px-2.5 py-1.5 font-medium text-yellow-900 hover:bg-yellow-50">Favorites</a>
        </Link>
      </div>
      <Search />
    </div>
  );
};
