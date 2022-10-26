export interface SetSearchParamsOptions {
  searchParams: Record<string, string>;
}

const setSearchParams = (searchParamsOptions: SetSearchParamsOptions) => {
  const { searchParams } = searchParamsOptions;
  return Object.entries({
    ...searchParams,
  })
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join("&");
};

export default setSearchParams;
