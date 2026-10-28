"use client";

import { useState } from "react";

export type Track = {
  title: string;
  artist: string;
  device: string;
  cover: string | null; // blob-URL выбранной картинки
  audioUrl: string | null; // blob-URL выбранного аудио
  duration: string; // "3:41"
  durationSec: number;
};

const fmt = (s: number) => {
  if (!isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
};

const field =
  "h-11 w-full rounded-xl bg-[#2A312C] px-4 text-sm font-medium text-white outline-none placeholder:text-[#8A918C] focus:ring-2 focus:ring-[#3DDC84]";

export default function TrackUploader({
  onAdd,
}: {
  onAdd: (track: Track) => void;
}) {
  const [cover, setCover] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioName, setAudioName] = useState("");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [device, setDevice] = useState("");
  const [durationSec, setDurationSec] = useState(0);

  function pickCover(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (cover) URL.revokeObjectURL(cover);
    setCover(URL.createObjectURL(file));
  }

  function pickAudio(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    const url = URL.createObjectURL(file);
    setAudioUrl(url);
    setAudioName(file.name);
    if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));

    const probe = new Audio();
    probe.preload = "metadata";
    probe.onloadedmetadata = () => setDurationSec(probe.duration);
    probe.src = url;
  }

  function submit() {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      artist: artist.trim(),
      device: device.trim() || "Device",
      cover,
      audioUrl,
      duration: fmt(durationSec),
      durationSec,
    });
  }

  return (
    <div className="w-[340px] rounded-[32px] bg-[#1F2521] p-3.5 font-sans text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
      {/* Обложка: клик открывает выбор картинки */}
      <label className="relative flex aspect-[4/4.3] w-full cursor-pointer items-center justify-center overflow-hidden rounded-[24px] bg-[#8E8F72] focus-within:ring-2 focus-within:ring-[#3DDC84]">
        <input
          type="file"
          accept="image/*"
          onChange={pickCover}
          className="sr-only"
        />
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover}
            alt="Обложка"
            className="absolute inset-0 size-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-[#B9BA9E]">
            <svg
              viewBox="0 0 24 24"
              className="size-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M4 7a2 2 0 0 1 2-2h2l1.5-2h5L16 5h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
            </svg>
            <span className="text-lg font-extrabold">Выбрать обложку</span>
          </div>
        )}
      </label>

      <div className="mt-4 flex flex-col gap-2.5 px-1.5">
        {/* Аудиофайл */}
        <label className="flex h-11 cursor-pointer items-center gap-3 rounded-xl bg-[#2A312C] px-4 text-sm font-medium focus-within:ring-2 focus-within:ring-[#3DDC84]">
          <input
            type="file"
            accept="audio/*"
            onChange={pickAudio}
            className="sr-only"
          />
          <svg
            viewBox="0 0 24 24"
            className="size-4 shrink-0 text-[#3DDC84]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM20 16a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          </svg>
          <span
            className={`truncate ${audioName ? "text-white" : "text-[#8A918C]"}`}
          >
            {audioName || "Выбрать аудиофайл"}
          </span>
        </label>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Название песни"
          aria-label="Название песни"
          className={field}
        />
        <input
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          placeholder="Исполнитель"
          aria-label="Исполнитель"
          className={field}
        />
        <input
          value={device}
          onChange={(e) => setDevice(e.target.value)}
          placeholder="Устройство (Device)"
          aria-label="Устройство"
          className={field}
        />

        <div className="flex h-11 items-center justify-between rounded-xl bg-[#2A312C] px-4 text-sm font-medium">
          <span className="text-[#8A918C]">Длительность</span>
          <span>{fmt(durationSec)}</span>
        </div>

        <button
          type="button"
          onClick={submit}
          disabled={!title.trim()}
          className="mb-1 mt-1 h-12 rounded-full bg-[#3DDC84] text-sm font-extrabold text-[#0F1A13] disabled:opacity-40"
        >
          Добавить в плеер
        </button>
      </div>
    </div>
  );
}
