const resizeConfig = {
  f_cover: {
    width: 1200,
    height: 630,
    quality: 100,
    format: "png",
  },
  comment: {
    width: 150,
  },
  froala: {
    width: 640,
  },
  timeline_cover: {
    width: 1900,
    height: 331,
    format: "jpg",
  },
} as const;

export { resizeConfig };
