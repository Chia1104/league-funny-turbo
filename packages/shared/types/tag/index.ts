export type Tag = {
  id?: number | null;
  name: string;
  slug: string;
};

export interface TagDTO {
  pid: string | null;
  p_name: string;
  p_fbname: string;
}
