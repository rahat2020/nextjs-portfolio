"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Play, BookOpen, Youtube, FileText } from "react-feather";
import { blogContent, YOUTUBE_CHANNEL_URL } from "./blogData";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "video", label: "Videos" },
  { key: "article", label: "Articles" },
];

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// ── Video Card ───────────────────────────────────────────────
function VideoCard({ item }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group relative bg-[#06080B] rounded-3xl border border-gray-700/50 hover:border-lime-400/50 transition-all duration-500 overflow-hidden flex flex-col">
      {/* Thumbnail / Player */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${item.youtubeId}?autoplay=1&rel=0`}
            title={item.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        ) : (
          <>
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={640}
              height={360}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
            {/* Play button */}
            <button
              onClick={() => setPlaying(true)}
              aria-label="Play video"
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full bg-lime-400/90 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-lime-400/25 transition-transform duration-300 group-hover:scale-110">
                <Play className="w-7 h-7 text-black fill-black ml-1" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-lime-400 bg-lime-400/10 rounded-full px-3 py-1 border border-lime-400/20">
            <Youtube className="w-3 h-3" />
            Video
          </span>
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-400 bg-gray-800/80 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-lime-300 transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-gray-500 text-xs mt-auto pt-3 border-t border-gray-800/80">
          {formatDate(item.date)}
        </p>
      </div>
    </div>
  );
}

// ── Article Card ─────────────────────────────────────────────
function ArticleCard({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative bg-[#06080B] rounded-3xl border border-gray-700/50 hover:border-lime-400/50 transition-all duration-500 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-video overflow-hidden rounded-t-3xl">
        <Image
          src={item.thumbnail}
          alt={item.title}
          width={640}
          height={360}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080B] via-transparent to-transparent opacity-80" />
        {/* Read time badge */}
        {item.readTime && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700/50">
            {item.readTime}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-400/10 rounded-full px-3 py-1 border border-emerald-400/20">
            <FileText className="w-3 h-3" />
            Article
          </span>
          {item.tags?.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-400 bg-gray-800/80 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-lg font-bold text-white mb-2 leading-snug line-clamp-2 group-hover:text-lime-300 transition-colors duration-300">
          {item.title}
        </h3>

        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {item.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-800/80">
          <p className="text-gray-500 text-xs">{formatDate(item.date)}</p>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-lime-400 group-hover:gap-2 transition-all duration-300">
            Read more
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </a>
  );
}

// ── Main Blog Section ────────────────────────────────────────
export default function Blog() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredContent =
    activeFilter === "all"
      ? blogContent
      : blogContent.filter((item) => item.type === activeFilter);

  return (
    <div
      id="blog"
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white py-20 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section Header ─────────────────────────────── */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-lime-500" />
            <span className="text-lime-400 text-sm tracking-widest uppercase font-medium">
              Blog & Content
            </span>
            <div className="h-px w-12 bg-lime-500" />
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Insights, Tutorials &{" "}
                <span className="text-lime-400">Creative Ideas.</span>
              </h2>
              <p className="text-gray-300 text-sm md:text-md tracking-wider font-medium mt-4 max-w-2xl">
                I share what I learn — from in-depth tutorials on YouTube to
                articles about frontend architecture, career growth, and modern
                web development.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-6">
              {/* Filter Tabs */}
              <div className="flex items-center gap-2 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-full p-1.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      activeFilter === f.key
                        ? "bg-lime-400 text-black shadow-md shadow-lime-400/20"
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime-400 hover:bg-lime-500 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 group"
              >
                <Youtube className="w-5 h-5" />
                Visit Channel
              </a>
            </div>
          </div>
        </div>

        {/* ── Content Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredContent.map((item) =>
            item.type === "video" ? (
              <VideoCard key={item.id} item={item} />
            ) : (
              <ArticleCard key={item.id} item={item} />
            )
          )}
        </div>

        {/* ── Empty State ────────────────────────────────── */}
        {filteredContent.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-12 h-12 text-gray-700 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No content here yet — stay tuned!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
