export type PostCategoryDetail = {
  id: number;
  name: string;
  slug: string;
};

export type PostCategory = {
  id: number;
  name: string;
  slug: string;
  category: PostCategoryDetail[];
};
