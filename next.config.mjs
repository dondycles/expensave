import million from "million/compiler";
import withSerwistInit from "@serwist/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
const withSerwist = withSerwistInit({
  swSrc: "app/sw.ts",
  swDest: "public/sw.js",
  cacheOnFrontEndNav: true,
});
const millionConfig = {
  auto: {
    rsc: true,
  }, // if you're using RSC: auto: { rsc: true },
};
export default million.next(withSerwist(nextConfig, millionConfig));
