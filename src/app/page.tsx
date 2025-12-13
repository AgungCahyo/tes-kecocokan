import { Metadata } from 'next';
import HomeClient from './components/HomeClient';

export const metadata: Metadata = {
  title: 'Tes Kecocokan Kepribadian - Analisis Hubungan AI',
  description: 'Temukan seberapa cocok kepribadian Anda dan pasangan dengan tes MBTI lengkap. Dapatkan analisis mendalam dari AI tentang komunikasi, nilai, dan strategi membangun hubungan harmonis.',
  alternates: {
    canonical: 'https://personalitytest.id',
  },
};

export default function HomePage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa itu tes kecocokan kepribadian?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tes kecocokan kepribadian adalah alat untuk mengukur kompatibilitas antara dua orang berdasarkan tipe MBTI, gaya komunikasi, nilai, dan preferensi hidup mereka."
        }
      },
      {
        "@type": "Question",
        "name": "Berapa lama tes ini memakan waktu?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tes memakan waktu sekitar 10-15 menit per orang untuk menjawab 40 pertanyaan."
        }
      },
      {
        "@type": "Question",
        "name": "Apakah hasil tes akurat?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hasil tes didasarkan pada teori kepribadian MBTI yang telah teruji secara ilmiah dan dikombinasikan dengan analisis AI untuk memberikan insight yang mendalam."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://personalitytest.id"
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HomeClient />
    </>
  );
}