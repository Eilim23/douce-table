import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

type Photo = { src: string; alt: string; position?: string };

const MIN_ZOOM = 1;
const MAX_ZOOM = 4;

export function PhotoGallery({ photos, className = "" }: { photos: Photo[]; className?: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className={className}>
      <div className="relative group">
        <div className="overflow-hidden rounded-lg" ref={emblaRef}>
          <div className="flex">
            {photos.map((p, i) => (
              <div key={p.src} className="min-w-0 shrink-0 grow-0 basis-full">
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="block w-full cursor-zoom-in"
                  aria-label={`Agrandir la photo ${i + 1}`}
                >
                  <img
                    src={p.src}
                    alt={p.alt}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="w-full aspect-[4/3] object-cover"
                    style={p.position ? { objectPosition: p.position } : undefined}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Photo précédente"
          className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/85 text-foreground shadow flex items-center justify-center hover:bg-background transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Photo suivante"
          className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-background/85 text-foreground shadow flex items-center justify-center hover:bg-background transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Plein écran"
          className="absolute right-3 top-3 h-10 w-10 rounded-full bg-background/85 text-foreground shadow flex items-center justify-center hover:bg-background transition"
        >
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {photos.map((p, i) => (
          <button
            key={p.src}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Aller à la photo ${i + 1}`}
            className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-foreground" : "w-2 bg-foreground/30"}`}
          />
        ))}
      </div>

      <Lightbox
        photos={photos}
        open={open}
        index={index}
        onOpenChange={setOpen}
        onIndexChange={(i) => emblaApi?.scrollTo(i, true)}
      />
    </div>
  );
}

export function Lightbox({
  photos,
  open,
  index,
  onOpenChange,
  onIndexChange,
}: {
  photos: Photo[];
  open: boolean;
  index: number;
  onOpenChange: (o: boolean) => void;
  onIndexChange: (i: number) => void;
}) {
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const drag = useRef<{ x: number; y: number; ox: number; oy: number; moved: boolean } | null>(null);
  const swipe = useRef<number | null>(null);

  const reset = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    reset();
  }, [index, open, reset]);

  const go = useCallback(
    (dir: 1 | -1) => onIndexChange((index + dir + photos.length) % photos.length),
    [index, onIndexChange, photos.length],
  );

  const changeZoom = useCallback((z: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, z));
    setZoom(clamped);
    if (clamped === 1) setOffset({ x: 0, y: 0 });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
      else if (e.key === "+" || e.key === "=") changeZoom(zoom + 0.5);
      else if (e.key === "-") changeZoom(zoom - 0.5);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, changeZoom, zoom]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (zoom > 1) {
      drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y, moved: false };
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } else {
      swipe.current = e.clientX;
    }
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true;
    setOffset({ x: d.ox + dx, y: d.oy + dy });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (drag.current) {
      drag.current = null;
      return;
    }
    if (swipe.current !== null) {
      const dx = e.clientX - swipe.current;
      swipe.current = null;
      if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1);
    }
  };
  const onWheel = (e: React.WheelEvent) => {
    changeZoom(zoom + (e.deltaY < 0 ? 0.25 : -0.25));
  };
  const onDoubleClick = () => (zoom > 1 ? reset() : changeZoom(2.5));

  const btn =
    "h-11 w-11 rounded-full bg-white/15 text-white backdrop-blur flex items-center justify-center hover:bg-white/30 transition disabled:opacity-40";

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/95" />
        <DialogPrimitive.Content
          className="fixed inset-0 z-50 flex flex-col outline-none"
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">Galerie photos</DialogPrimitive.Title>

          <div className="flex items-center justify-between px-4 py-3 text-white">
            <span className="text-sm tabular-nums">
              {photos.length > 1 ? `${index + 1} / ${photos.length}` : ""}
            </span>
            <div className="flex items-center gap-2">
              <button type="button" className={btn} onClick={() => changeZoom(zoom - 0.5)} disabled={zoom <= MIN_ZOOM} aria-label="Dézoomer">
                <ZoomOut className="h-5 w-5" />
              </button>
              <button type="button" className={btn} onClick={() => changeZoom(zoom + 0.5)} disabled={zoom >= MAX_ZOOM} aria-label="Agrandir">
                <ZoomIn className="h-5 w-5" />
              </button>
              <DialogPrimitive.Close className={btn} aria-label="Fermer">
                <X className="h-5 w-5" />
              </DialogPrimitive.Close>
            </div>
          </div>

          <div
            className="relative flex-1 min-h-0 flex items-center justify-center overflow-hidden touch-none select-none"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onWheel={onWheel}
            onDoubleClick={onDoubleClick}
          >
            <img
              src={photos[index].src}
              alt={photos[index].alt}
              draggable={false}
              className={`max-h-full max-w-full object-contain ${zoom > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"}`}
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transition: drag.current ? "none" : "transform 0.15s ease-out",
              }}
            />
            {photos.length > 1 && (
              <>
            <button
              type="button"
              onClick={() => go(-1)}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              aria-label="Photo précédente"
              className={`${btn} absolute left-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              aria-label="Photo suivante"
              className={`${btn} absolute right-3 top-1/2 -translate-y-1/2`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
              </>
            )}
          </div>

          {photos.length > 1 && (
          <div className="flex justify-center gap-2 px-4 py-3 overflow-x-auto">
            {photos.map((p, i) => (
              <button
                key={p.src}
                type="button"
                onClick={() => onIndexChange(i)}
                aria-label={`Photo ${i + 1}`}
                className={`h-14 w-20 shrink-0 overflow-hidden rounded border-2 transition ${i === index ? "border-white" : "border-transparent opacity-60 hover:opacity-100"}`}
              >
                <img src={p.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
