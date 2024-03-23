import { headers } from "next/headers";

export function currentURL(pathname: string): URL {
  const headersList = headers();
  const host = headersList.get("x-forwarded-host") || headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";


  console.log("pathname: ", pathname)
  console.log("host: ", host)

  return new URL(pathname, `${protocol}://${host}`);
}
