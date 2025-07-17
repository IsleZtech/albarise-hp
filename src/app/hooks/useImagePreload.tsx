import { StaticImageData } from "next/image";

export function preloadImages(
  sources: StaticImageData[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  let loadedCount = 0;
  const total = sources.length;

  // プリロードヒントを追加（より確実なキャッシュ）
  sources.forEach((src) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src.src;
    document.head.appendChild(link);
  });

  return Promise.all(
    sources.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new window.Image();

          img.onload = () => {
            loadedCount++;
            onProgress?.(loadedCount, total);
            resolve();
          };

          img.onerror = () => {
            loadedCount++;
            onProgress?.(loadedCount, total);
            resolve();
          };

          img.src = src.src;
        })
    )
  ).then(() => {});
}
