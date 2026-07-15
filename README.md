# 北疆十三日旅行手記

以設計師手稿風格製作的互動旅行手冊，完整收錄 13 日行程、景點介紹、餐食、住宿、航班與路線資訊，並支援桌面與手機瀏覽。

## 線上瀏覽

網站部署完成後可由以下網址開啟：

<https://ublvbmt.github.io/northern-xinjiang-13days/>

## 本機執行

需要 Node.js 22 或以上版本。

```bash
npm install
npm run dev
```

瀏覽器開啟 <http://localhost:3000>。

## GitHub Pages 部署

推送到 `main` 分支後，GitHub Actions 會自動建置並部署網站。儲存庫的 Pages 來源需設定為 **GitHub Actions**。

## 內容位置

- 每日行程：`app/data/itinerary.json`
- 頁面結構：`app/page.tsx`
- 視覺樣式：`app/globals.css`
- 手繪插圖：`public/images/`
- 自動部署：`.github/workflows/deploy-pages.yml`
