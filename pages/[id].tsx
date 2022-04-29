import { FavoriteButton } from "components/FavoriteButton";
import { Loader } from "components/Loader";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { loadItem } from "redux/artworkSlice";
import { useAppSelector, useAppDispatch } from "redux/store";

const Detail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const parsedId = parseInt(String(id));

  const dispatch = useAppDispatch();
  const list = useAppSelector((state) => state.artwork.cache);
  const artwork = list.find((item) => item.id === parsedId);

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (!artwork) {
      dispatch(loadItem(parsedId));
    }
  }, [id, artwork, router.isReady, dispatch, parsedId]);

  if (!artwork) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full max-w-3xl items-center justify-between gap-4 p-3">
        <Link href="/">
          <a className="rounded bg-yellow-100 px-2.5 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-200">
            Back
          </a>
        </Link>
        <h1 className="text-center text-2xl">{artwork.title}</h1>
        <FavoriteButton id={parsedId} />
      </div>
      <Image
        className="object-cover"
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt={artwork.thumbnail?.alt_text ?? artwork.title}
        height={500}
        width={500}
        blurDataURL={artwork.thumbnail?.lqip}
        placeholder={artwork.thumbnail?.lqip ? "blur" : "empty"}
      />
    </div>
  );
};

export default Detail;
