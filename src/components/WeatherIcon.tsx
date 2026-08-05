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

    const pad = 4;
    el.setAttribute(
      "viewBox",
      `${bbox.x - pad} ${bbox.y - pad} ${bbox.width + pad * 2} ${bbox.height + pad * 2}`,
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
