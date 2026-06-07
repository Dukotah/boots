// Project detail layout — indexable by search engines (robots default: index,
// follow). Each project slug gets its own canonical URL for SEO.
export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
