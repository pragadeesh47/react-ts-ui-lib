import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useLanguage } from "./context/LanguageContext";

type DocSeoProps = {
  title: string;
  description: string;
};

const DocSeo = ({ title, description }: DocSeoProps) => {
  const location = useLocation();
  const { language } = useLanguage();

  const canonicalPath = location.pathname.toLowerCase();
  const htmlLang = language === "cz" ? "cs" : "en";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url:
      typeof window !== "undefined"
        ? `${window.location.origin}${canonicalPath}`
        : canonicalPath,
    inLanguage: htmlLang,
  };

  return (
    <Helmet>
      <title>{`React TS Kit – ${title}`}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalPath} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </Helmet>
  );
};

export { DocSeo };
export default DocSeo;

