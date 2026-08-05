import { useLayoutEffect, useRef } from "react";
import { weatherIconBody, meteoconBody } from "../lib/weatherIcons";

interface WeatherIconProps {
  code?: string;
  slug?: string;
  className?: string;
  alt?: string;
}

export default function WeatherIcon({
  code,
  slug,
  className,
  alt,
}: WeatherIconProps) {
  const ref = useRef<SVGSVGElement>(null);
  const body = slug
    ? meteoconBody(slug)
    : code
      ? weatherIconBody(code)
      : undefined;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const bbox = el.getBBox();
    if (bbox.width === 0 || bbox.height === 0) return;

    const side = Math.max(bbox.width, bbox.height) + 8;
    const cx = bbox.x + bbox.width / 2;
    const cy = bbox.y + bbox.height / 2;
    el.setAttribute(
      "viewBox",
      `${cx - side / 2} ${cy - side / 2} ${side} ${side}`,
    );
  }, [body]);

  if (!body) return null;

  return (
    <svg
      ref={ref}
      viewBox="0 0 128 128"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={alt}
      className={className}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}
