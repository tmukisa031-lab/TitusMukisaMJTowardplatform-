// Media item type definition
export interface MediaItem {
  id: number;
  title: string;
  url: string;
  free: boolean;
  category: "tv" | "radio" | "audio" | "video";
}