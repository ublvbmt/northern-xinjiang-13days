"use client";

import { useEffect, useMemo, useState } from "react";
import itineraryData from "./data/itinerary.json";

type Attraction = { title: string; body: string[] };
type Day = {
  day: number;
  date: string;
  route: string;
  intro: string;
  region: string;
  image: "cover" | "hemu" | "yardang" | "ili";
  attractions: Attraction[];
  logistics: string[];
};

const days = itineraryData as Day[];

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const images = {
  cover: `${basePath}/images/cover-kanas.png`,
  hemu: `${basePath}/images/hemu.png`,
  yardang: `${basePath}/images/yardang.png`,
  ili: `${basePath}/images/ili.png`,
};

const imageAlt = {
  cover: "喀納斯湖與阿勒泰山手繪水彩",
  hemu: "禾木村木屋、河流與山脈手繪水彩",
  yardang: "烏爾禾雅丹與戈壁手繪水彩",
  ili: "賽里木湖、雪山與伊犁草原手繪水彩",
};

const flights = [
  {
    label: "第一天 7/16",
    rows: [
      "中國東方航空mu5008　Departure桃園國際機場15:30 → Arrival上海浦東17:30",
      "上海航空FM9223　Departure上海浦東20:15 → Arrival烏魯木齊01:25",
    ],
  },
  {
    label: "第12天 7/12",
    rows: ["上海航空FM9224　Departure烏魯木齊20:20 → Arrival上海浦東01:15+1"],
  },
  {
    label: "第13天 7/13",
    rows: ["中國東方航空MU5007　Departure上海浦東12:20 → Arrival桃園國際機場14:25"],
  },
];

function twoDigit(value: number) {
  return String(value).padStart(2, "0");
}

export default function Home() {
  const [selectedDay, setSelectedDay] = useState(1);

  useEffect(() => {
    const match = window.location.hash.match(/^#day-(\d{1,2})$/);
    const value = match ? Number(match[1]) : 1;
    if (value >= 1 && value <= 13) setSelectedDay(value);
  }, []);

  const day = useMemo(() => days[selectedDay - 1], [selectedDay]);

  function chooseDay(value: number, moveFocus = false) {
    setSelectedDay(value);
    window.history.replaceState(null, "", `#day-${value}`);
    if (moveFocus) {
      window.setTimeout(() => {
        document.getElementById("day-content")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="回到北疆旅行手記首頁">
          <span className="brand-mark">北疆</span>
          <span className="brand-sub">TRAVEL MANUSCRIPT</span>
        </a>
        <nav className="top-links" aria-label="主要導覽">
          <a href="#itinerary">每日行程</a>
          <a href="#travel-info">航班與路線</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">13 DAYS · 2026.07.16—07.28</p>
          <h1>北疆<br /><span>十三日旅行手記</span></h1>
          <p className="hero-lead">從天山北麓，到阿爾泰山深處。把每日路線、景點故事與住宿餐食，整理成可以隨身閱讀的互動手冊。</p>
          <div className="hero-actions">
            <a className="primary-action" href="#itinerary" onClick={() => chooseDay(1)}>開始閱讀 DAY 01</a>
            <a className="text-action" href="#travel-info">查看旅行資訊 <span aria-hidden="true">↘</span></a>
          </div>
          <div className="hero-meta" aria-label="旅程摘要">
            <span><strong>13</strong> 日行程</span>
            <span><strong>4</strong> 大風景帶</span>
            <span><strong>完整</strong> 原文收錄</span>
          </div>
        </div>
        <figure className="hero-art">
          <img src={`${basePath}/images/cover-kanas.png`} alt="喀納斯湖與阿勒泰山手繪水彩" />
          <figcaption>FIELD SKETCH Nº 01 · KANAS</figcaption>
        </figure>
      </section>

      <section className="itinerary-section" id="itinerary">
        <div className="section-intro">
          <p className="eyebrow">DAILY ITINERARY</p>
          <h2>選擇日期，展開當日旅程</h2>
          <p>點選任一天，即可查看完整路線、景點介紹、行車距離、餐食與住宿。</p>
        </div>

        <div className="mobile-day-nav" aria-label="選擇行程日次">
          {days.map((item) => (
            <button key={item.day} onClick={() => chooseDay(item.day)} aria-current={selectedDay === item.day ? "true" : undefined}>
              <span>DAY</span>{twoDigit(item.day)}
            </button>
          ))}
        </div>

        <div className="reader-shell">
          <aside className="day-rail" aria-label="選擇行程日次">
            <div className="rail-title">JOURNEY<br />INDEX</div>
            {days.map((item) => (
              <button key={item.day} onClick={() => chooseDay(item.day)} className={selectedDay === item.day ? "active" : ""} aria-current={selectedDay === item.day ? "true" : undefined}>
                <span className="rail-day">{twoDigit(item.day)}</span>
                <span className="rail-copy"><b>{item.region}</b><small>{item.date.replace("2026/", "")}</small></span>
              </button>
            ))}
          </aside>

          <article className="day-view" id="day-content" aria-live="polite">
            <div className="day-heading">
              <div className="day-number"><span>DAY</span>{twoDigit(day.day)}</div>
              <div>
                <p>{day.date} · {day.region}</p>
                <h2>{day.route}</h2>
              </div>
            </div>

            <figure className={`day-art ${day.image === "cover" ? "portrait-source" : ""}`}>
              <img src={images[day.image]} alt={imageAlt[day.image]} />
              <figcaption>手繪情境插畫 · {day.region}</figcaption>
            </figure>

            {day.intro && (
              <div className="today-note">
                <span>TODAY</span>
                <p>{day.intro}</p>
              </div>
            )}

            <div className="content-grid">
              <div className="attractions">
                {day.attractions.length ? day.attractions.map((place, index) => (
                  <section className="place" key={`${place.title}-${index}`}>
                    <div className="place-index">{twoDigit(index + 1)}</div>
                    <div>
                      <h3>{place.title}</h3>
                      {place.body.map((paragraph, pIndex) => <p key={pIndex}>{paragraph}</p>)}
                    </div>
                  </section>
                )) : (
                  <section className="closing-note">
                    <p>RETURN HOME</p>
                    <h3>旅程的終點，也是下一次相會的起點。</h3>
                  </section>
                )}
              </div>

              <aside className="logistics">
                <p className="eyebrow">TRAVEL NOTES</p>
                <h3>當日資訊</h3>
                <ul>
                  {day.logistics.map((item, index) => <li key={index}>{item}</li>)}
                </ul>
              </aside>
            </div>

            <div className="day-controls">
              <button disabled={selectedDay === 1} onClick={() => chooseDay(selectedDay - 1, true)}>
                <span aria-hidden="true">←</span> 上一日
              </button>
              <span>{twoDigit(selectedDay)} / 13</span>
              <button disabled={selectedDay === 13} onClick={() => chooseDay(selectedDay + 1, true)}>
                下一日 <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="travel-info" id="travel-info">
        <div className="info-heading">
          <p className="eyebrow">FLIGHTS & ROUTE</p>
          <h2>航班與行程路線</h2>
          <p>航班日期與時間依原始文件登載，請以實際機票或航空公司通知為準。</p>
        </div>
        <div className="info-layout">
          <div className="flight-list">
            {flights.map((flight) => (
              <section key={flight.label}>
                <h3>{flight.label}</h3>
                {flight.rows.map((row) => <p key={row}>{row}</p>)}
              </section>
            ))}
          </div>
          <figure className="route-map">
            <img src={`${basePath}/images/route-map.jpeg`} alt="原始北疆十三日行程路線圖" />
            <figcaption>原始行程路線圖</figcaption>
          </figure>
        </div>
      </section>

      <footer>
        <div className="footer-compass" aria-hidden="true">N</div>
        <p>一路收藏風景，也收藏時間。</p>
        <small>NORTHERN XINJIANG · TRAVEL MANUSCRIPT</small>
      </footer>
    </main>
  );
}
