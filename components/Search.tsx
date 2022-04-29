import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { clearSearch, loadPage, setPagination, setSearch } from "redux/artworkSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

interface SearchProps {
  children?: never;
}
export const Search: FC<SearchProps> = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.artwork.search);

  const [q, setQ] = useState(search);

  useEffect(() => {
    setQ(search);
  }, [search]);

  return (
    <nav className="flex items-center justify-center gap-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(setSearch(q));
          dispatch(loadPage());
          if (router.route !== "/") {
            router.push("/");
          }
        }}
        className="flex items-center gap-4"
      >
        <input
          value={q}
          onChange={(event) => setQ(event.target.value)}
          className="rounded border border-purple-400 p-1"
          type="text"
        />
        <button className="rounded bg-purple-100 px-2.5 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-200">
          Search
        </button>
        {search && (
          <button
            onClick={() => {
              dispatch(clearSearch());
              dispatch(loadPage());
            }}
            type="button"
            className="rounded border border-purple-700 bg-white px-2.5 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-200"
          >
            Clear
          </button>
        )}
      </form>
    </nav>
  );
};
