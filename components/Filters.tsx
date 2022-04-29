import { FC } from "react";
import { loadPage, setPagination } from "redux/artworkSlice";
import { useAppDispatch, useAppSelector } from "redux/store";

interface FiltersProps {
  children?: never;
}
export const Filters: FC<FiltersProps> = () => {
  const dispatch = useAppDispatch();
  const pagination = useAppSelector((state) => state.artwork.pagination);

  return (
    <div className="flex items-center justify-center gap-4">
      <select
        className="rounded border p-1"
        value={pagination.limit}
        onChange={(event) => {
          dispatch(setPagination({ limit: Number(event.target.value) }));
          dispatch(loadPage());
        }}
      >
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <button
        onClick={() => {
          dispatch(setPagination({ current_page: pagination.current_page - 1 }));
          dispatch(loadPage());
        }}
        className="rounded bg-yellow-100 px-2.5 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
      >
        PREV
      </button>

      <p>
        <span>page </span>
        <span className="font-bold">{pagination.current_page}</span>
        <span> of {pagination.total_pages}</span>
      </p>

      <button
        onClick={() => {
          dispatch(setPagination({ current_page: pagination.current_page + 1 }));
          dispatch(loadPage());
        }}
        className="rounded bg-yellow-100 px-2.5 py-1.5 text-xs font-medium text-yellow-700 hover:bg-yellow-200"
      >
        NEXT
      </button>
    </div>
  );
};
