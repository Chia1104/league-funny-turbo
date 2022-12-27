const ssgConfig = {
  "/b": {
    revalidate: 60,
  },
  "/b/[b_type]": {
    revalidate: 60,
    fallback: "blocking",
  },
};

export default ssgConfig;
