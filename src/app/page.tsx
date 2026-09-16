import { ScrollWorld } from "@/components/scroll-world";
import { site } from "@/content/site";

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Dentist",
      "@id": "https://www.wilkandwilk.com/#practice",
      name: site.name,
      url: "https://www.wilkandwilk.com/",
      telephone: "+1-519-624-9455",
      address: {
        "@type": "PostalAddress",
        streetAddress: "350 Conestoga Blvd., Unit A",
        addressLocality: "Cambridge",
        addressRegion: "ON",
        postalCode: "N1R 7L7",
        addressCountry: "CA",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.wilkandwilk.com/#website",
      url: "https://www.wilkandwilk.com/",
      name: site.name,
      publisher: { "@id": "https://www.wilkandwilk.com/#practice" },
    },
  ],
};

export default function Home() {
  return (
    <>
      <ScrollWorld />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
