import type { Metadata } from "next";
import Landing from "@/components/landing";
export const metadata: Metadata = {
  title: "BlockivIA — Blockchain + AI in Bolivia",
  description: "Solutions, Research and Training.",
};
export default function EnglishHome() {
  return <Landing locale="en" />;
}
