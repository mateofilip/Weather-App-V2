import { useId, useLayoutEffect, useMemo, useRef } from "react";
import { weatherIconBody, meteoconBody } from "../lib/weatherIcons";

interface WeatherIconProps {
  code?: string;
  slug?: string;
  body?: string;
  className?: string;
  alt?: string;
}

const ID_ATTR = /id="([^"]+)"/g;
const URL_REF = /url\(#([^)]+)\)/g;

function namespace(body: string, uid: string): string {
  return body
    .replace(ID_ATTR, (_m, id: string) => `id="${uid}-${id}"`)
    .replace(URL_REF, (_m, id: string) => `url(#${uid}-${id})`);
}

export default function WeatherIcon({
  code,
  slug,
  body: bodyProp,
  className,
  alt,
}: WeatherIconProps) {
  const ref = useRef<SVGSVGElement>(null);
  const uid = useId().replace(/:/g, "");
  const body = useMemo(() => {
    const raw =
      bodyProp ??
      (slug ? meteoconBody(slug) : code ? weatherIconBody(code) : undefined);
    return raw ? namespace(raw, uid) : undefined;
  }, [slug, code, bodyProp, uid]);

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
