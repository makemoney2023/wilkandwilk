import { describe, expect, it } from "vitest";
import { getMediaSyncJobs } from "./media-sync";

describe("media sync", () => {
  it("copies interiors, smiles, and clips with Node instead of rsync", () => {
    expect(getMediaSyncJobs().map((job) => job.to)).toEqual([
      "public/media/interiors",
      "public/media/smiles",
      "public/media/animated",
      "public/media/logo.svg",
    ]);
  });
});
