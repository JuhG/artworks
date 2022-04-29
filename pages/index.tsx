import { ArtworkCard } from "components/ArtworkCard";
import { Filters } from "components/Filters";
import { Loader } from "components/Loader";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loadPage, setPagination, setSearch } from "redux/artworkSlice";
import { useAppSelector, useAppDispatch } from "redux/store";

const Home: NextPage = () => {
  const router = useRouter();
  const { current_page, limit, q } = router.query;
  const parsedCurrentPage = current_page ? parseInt(String(current_page)) : null;
  const parsedLimit = limit ? parseInt(String(limit)) : null;
  const parsedQ = q ? String(q) : "";

  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.artwork.list);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (parsedQ) {
      dispatch(setSearch(parsedQ));
    }
    if (parsedCurrentPage && parsedLimit) {
      dispatch(setPagination({ current_page: parsedCurrentPage, limit: parsedLimit }));
    }
    dispatch(loadPage());
  }, [dispatch, parsedCurrentPage, parsedLimit, parsedQ, router.isReady]);

  if (!list.length) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-8">
      <Filters />
      <ul className="flex flex-wrap justify-center gap-8">
        {list.map((artwork) => {
          return <ArtworkCard key={artwork.id} artwork={artwork} />;
        })}
      </ul>
    </div>
  );
};

export default Home;
