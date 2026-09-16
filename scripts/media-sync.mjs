import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { dirname, extname, join } from "node:path";

const smileFiles = [
  "3.jpg",
  "5.jpg",
  "Aaron.jpg",
  "Brandon.jpg",
  "Cassie.jpg",
  "dana.jpg",
  "Heather.jpg",
  "Jordana.jpg",
  "Katelyn.jpg",
  "Luke.jpg",
  "Mel.jpg",
  "Michelle.jpg",
  "Olivia.jpg",
  "smile071.jpg",
  "smile-gallery08.jpg",
  "smile-gallery10.jpg",
  "2x3.jpg",
  "Alida_F.jpg",
  "April_F.jpg",
  "Claudia_V.jpg",
  "Desiree_G.jpg",
  "DSC_2741.jpg",
  "DSC_3301.jpg",
  "DSC_3558.jpg",
  "DSC_3817.jpg",
  "DSC_3862.jpg",
  "smile-gallery11.jpg",
  "smile-gallery12.jpg",
  "2.jpg",
  "smile-gallery13.jpg",
  "4.jpg",
  "1.jpg",
];

const jobs = [
  { from: "assets/interiors", to: "public/media/interiors" },
  { from: "assets/other", to: "public/media/smiles", files: smileFiles },
  { from: "assets/animated", to: "public/media/animated", extension: ".mp4" },
  { from: "assets/brand/logo.svg", to: "public/media/logo.svg" },
];

function copyJob(job) {
  if (extname(job.to)) {
    mkdirSync(dirname(job.to), { recursive: true });
    if (existsSync(job.from)) cpSync(job.from, job.to);
    return;
  }

  rmSync(job.to, { recursive: true, force: true });
  mkdirSync(job.to, { recursive: true });
  if (!existsSync(job.from)) return;

  const names = job.files ?? readdirSync(job.from);
  for (const name of names) {
    if (job.extension && extname(name) !== job.extension) continue;
    const source = join(job.from, name);
    if (!existsSync(source)) continue;
    cpSync(source, join(job.to, name));
  }
}

for (const job of jobs) {
  copyJob(job);
}
