import { getSmileGalleryFiles } from "@/content/smiles";

export type MediaSyncJob = {
  from: string;
  to: string;
  files?: string[];
  extension?: string;
};

export function getMediaSyncJobs(): MediaSyncJob[] {
  return [
    { from: "assets/interiors", to: "public/media/interiors" },
    {
      from: "assets/other",
      to: "public/media/smiles",
      files: getSmileGalleryFiles(),
    },
    {
      from: "assets/animated",
      to: "public/media/animated",
      extension: ".mp4",
    },
    { from: "assets/brand/logo.svg", to: "public/media/logo.svg" },
  ];
}
