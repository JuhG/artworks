import { Artwork } from "api";
import { FavoriteButton } from "components/FavoriteButton";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ArtworkCardProps {
  artwork: Artwork;
  children?: never;
}
export const ArtworkCard: FC<ArtworkCardProps> = ({ artwork }) => {
  return (
    <div className="flex w-40 flex-col rounded-md border bg-white">
      <Image
        className="object-cover"
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt={artwork.thumbnail?.alt_text ?? artwork.title}
        height={160}
        width={160}
        blurDataURL={artwork.thumbnail?.lqip}
        placeholder={artwork.thumbnail?.lqip ? "blur" : "empty"}
      />
      <p className="p-2 text-center text-sm">{artwork.title}</p>
      <div className="flex flex-1 items-end justify-between p-2">
        <FavoriteButton id={artwork.id} />
        <Link href={`/${artwork.id}`}>
          <a className="rounded bg-green-100 px-2.5 py-1.5 text-xs font-medium text-green-700 hover:bg-green-200">
            Open
          </a>
        </Link>
      </div>
    </div>
  );
};
