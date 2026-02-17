//@@viewOn:imports
import React from "react";
//@@viewOff:imports

//@@viewOn:propTypes
export type BreadcrumbProps = {
  /**
   * Jednoduchý textový breadcrumb, pokud nechceš číst URL.
   */
  label?: string;
  /**
   * Pokud je true, breadcrumb se složí automaticky z aktuální URL.
   */
  fromUrl?: boolean;
  /**
   * Základ URL, která se odřízne z začátku path
   * a zároveň se použije jako prefix pro odkazy, např. "/".
   */
  basePath?: string;
  /**
   * Oddělovač mezi položkami.
   */
  separator?: React.ReactNode;
};

export const BREADCRUMB_PROP_NAMES = [
  "label",
  "fromUrl",
  "basePath",
  "separator",
] as const;
//@@viewOff:propTypes

//@@viewOn:component
const Breadcrumb = ({
  label = "Breadcrumb placeholder",
  fromUrl = false,
  basePath = "",
  separator = " / ",
}: BreadcrumbProps) => {
  //@@viewOn:private
  const [segments, setSegments] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!fromUrl) return;
    if (typeof window === "undefined") return;

    const fullPath = window.location.pathname;
    let path = fullPath;

    if (basePath && path.startsWith(basePath)) {
      path = path.slice(basePath.length) || "/";
    }

    const parts = path.split("/").filter(Boolean);
    setSegments(parts);
  }, [fromUrl, basePath]);

  const renderDocsBreadcrumb = () => {
    const isDocPath = basePath === "/" || basePath === "/docs";
    if (!isDocPath || segments.length === 0) {
      return null;
    }

    const [category, ...rest] = segments;
    if (!category) return null;

    const pathPrefix = basePath === "/" ? "" : basePath;

    type Crumb = { label: string; href: string; isLast: boolean };
    const crumbs: Crumb[] = [];

    const categoryLabel = decodeURIComponent(category).replace(/-/g, " ");
    const categoryHref = `${pathPrefix}/${category}/${category}`;

    if (rest.length === 0) {
      crumbs.push({
        label: categoryLabel,
        href: categoryHref,
        isLast: true,
      });
    } else {
      crumbs.push({
        label: categoryLabel,
        href: categoryHref,
        isLast: false,
      });

      rest.forEach((segment, idx) => {
        const label = decodeURIComponent(segment).replace(/-/g, " ");
        const isLast = idx === rest.length - 1;
        const href = `${pathPrefix}/${category}/${segment}`;

        crumbs.push({
          label,
          href,
          isLast,
        });
      });
    }

    return (
      <nav aria-label="Breadcrumb">
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {crumbs.map((crumb, index) => {
            const content = crumb.isLast ? (
              <span
                aria-current="page"
                style={{ fontWeight: 500 }}
              >
                {crumb.label}
              </span>
            ) : (
              <a
                href={crumb.href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {crumb.label}
              </a>
            );

            return (
              <li
                key={`${crumb.href}-${index}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                {index > 0 && (
                  <span style={{ margin: "0 0.25rem" }}>{separator}</span>
                )}
                {content}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };

  const renderDefaultBreadcrumb = () => {
    if (segments.length === 0) {
      return null;
    }

    let accumulatedPath = basePath || "";

    if (accumulatedPath && !accumulatedPath.endsWith("/")) {
      accumulatedPath += "/";
    }

    return (
      <nav aria-label="Breadcrumb">
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;
            const currentPath = (accumulatedPath + segment) || "/";
            const href = currentPath;

            accumulatedPath = currentPath;

            const labelText = decodeURIComponent(segment).replace(/-/g, " ");

            const content = isLast ? (
              <span
                aria-current="page"
                style={{ fontWeight: 500 }}
              >
                {labelText}
              </span>
            ) : (
              <a
                href={href}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {labelText}
              </a>
            );

            if (!accumulatedPath.endsWith("/")) {
              accumulatedPath += "/";
            }

            return (
              <li
                key={`${href}-${index}`}
                style={{ display: "flex", alignItems: "center" }}
              >
                {index > 0 && (
                  <span style={{ margin: "0 0.25rem" }}>{separator}</span>
                )}
                {content}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  };
  //@@viewOff:private

  //@@viewOn:render
  if (fromUrl) {
    if (basePath === "/" || basePath === "/docs") {
      const docsCrumb = renderDocsBreadcrumb();
      if (docsCrumb) return docsCrumb;
    }
    const urlCrumb = renderDefaultBreadcrumb();
    if (urlCrumb) return urlCrumb;
  }

  return <span>{label}</span>;
  //@@viewOff:render
};
//@@viewOff:component

//@@viewOn:exports
export { Breadcrumb };
export default Breadcrumb;
//@@viewOff:exports

