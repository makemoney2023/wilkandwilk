#!/usr/bin/env node

import { spawn, spawnSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OPENMONTAGE =
  process.env.OPENMONTAGE_ROOT ||
  "/Users/cbsuperpatch/Desktop/ClaudeSkills/skills/community/openmontage";
const PYTHON = process.env.OMNI_PYTHON || join(ROOT, ".venv/bin/python");
const PROMPTS_PATH = join(ROOT, "assets/animated/prompts.json");
const MANIFEST_PATH = join(ROOT, "assets/animated/manifest.json");

function loadLocalEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) {
    throw new Error("Missing .env.local. Add GEMINI_API_KEY or GOOGLE_API_KEY.");
  }

  return Object.fromEntries(
    readFileSync(envPath, "utf8")
      .split("\n")
      .filter((line) => line && !line.trim().startsWith("#") && line.includes("="))
      .map((line) => {
        const splitAt = line.indexOf("=");
        return [
          line.slice(0, splitAt).trim(),
          line
            .slice(splitAt + 1)
            .trim()
            .replace(/^["']|["']$/g, ""),
        ];
      }),
  );
}

function runSelector({ apiKey, clip, sourcePath, outputPath }) {
  const code = `
import json, os, sys
sys.path.insert(0, ${JSON.stringify(OPENMONTAGE)})
os.environ["GEMINI_API_KEY"] = ${JSON.stringify(apiKey)}
os.environ["GOOGLE_API_KEY"] = ${JSON.stringify(apiKey)}
from tools.video.video_selector import VideoSelector

result = VideoSelector().execute({
    "prompt": ${JSON.stringify(clip.prompt)},
    "operation": "image_to_video",
    "preferred_provider": "gemini_omni",
    "allowed_providers": ["gemini_omni"],
    "aspect_ratio": ${JSON.stringify(clip.aspect)},
    "duration": ${JSON.stringify(String(clip.duration || "4"))},
    "reference_image_path": ${JSON.stringify(sourcePath)},
    "reference_image_paths": [${JSON.stringify(sourcePath)}],
    "output_path": ${JSON.stringify(outputPath)},
})
print(json.dumps({
    "success": result.success,
    "error": result.error,
    "data": result.data,
    "cost_usd": result.cost_usd,
    "duration_seconds": result.duration_seconds,
}))
if not result.success:
    sys.exit(1)
`;

  return new Promise((resolvePromise, reject) => {
    const child = spawn(PYTHON, ["-"], {
      env: {
        ...process.env,
        GEMINI_API_KEY: apiKey,
        GOOGLE_API_KEY: apiKey,
      },
      stdio: ["pipe", "pipe", "pipe"],
    });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });
    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });
    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr || stdout || `Python exited with ${code}`));
        return;
      }
      try {
        resolvePromise(JSON.parse(stdout.trim().split("\n").at(-1)));
      } catch {
        reject(new Error(`Could not parse Omni response: ${stdout.slice(-500)}`));
      }
    });
    child.stdin.end(code);
  });
}

function optimizeForWeb(outputPath) {
  const temporaryPath = outputPath.replace(/\.mp4$/, ".web.mp4");
  const result = spawnSync(
    "ffmpeg",
    [
      "-y",
      "-i",
      outputPath,
      "-an",
      "-c:v",
      "libx264",
      "-preset",
      "medium",
      "-crf",
      "24",
      "-movflags",
      "+faststart",
      "-pix_fmt",
      "yuv420p",
      temporaryPath,
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(`ffmpeg failed: ${result.stderr.slice(-500)}`);
  }
  renameSync(temporaryPath, outputPath);
}

async function main() {
  const env = loadLocalEnv();
  const apiKey = env.GEMINI_API_KEY || env.GOOGLE_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY or GOOGLE_API_KEY is empty.");
  if (!existsSync(PYTHON)) throw new Error(`Python environment missing: ${PYTHON}`);
  if (!existsSync(OPENMONTAGE)) {
    throw new Error(`OpenMontage missing: ${OPENMONTAGE}`);
  }

  const pack = JSON.parse(readFileSync(PROMPTS_PATH, "utf8"));
  const requested = new Set(process.argv.slice(2));
  const clips = requested.size
    ? pack.clips.filter((clip) => requested.has(clip.id))
    : pack.clips;
  const outputDirectory = join(ROOT, "assets/animated");
  mkdirSync(outputDirectory, { recursive: true });
  const results = [];

  for (const clip of clips) {
    const sourcePath = join(ROOT, "assets/interiors", clip.source);
    const outputPath = join(outputDirectory, clip.output);
    if (existsSync(outputPath) && !process.argv.includes("--force")) {
      results.push({ id: clip.id, ok: true, skipped: true, output: clip.output });
      continue;
    }

    const result = await runSelector({
      apiKey,
      clip: { ...clip, duration: pack.duration },
      sourcePath,
      outputPath,
    });
    optimizeForWeb(outputPath);
    results.push({
      id: clip.id,
      ok: true,
      output: clip.output,
      use: clip.use,
      aspect: clip.aspect,
      selectedProvider: result.data?.selected_provider,
      interactionId: result.data?.interaction_id,
      costUsd: result.cost_usd,
      durationSeconds: result.duration_seconds,
    });
  }

  const manifest = {
    model: pack.model,
    generatedAt: new Date().toISOString(),
    results,
    costUsd: results.reduce((total, result) => total + (result.costUsd || 0), 0),
  };
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`);
  console.log(
    `Generated ${results.filter((result) => !result.skipped).length} clips. Manifest: ${MANIFEST_PATH}`,
  );
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
