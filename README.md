# Tes Kecocokan Kepribadian (AI Relationship Analysis)

Aplikasi web untuk menganalisis kecocokan hubungan (*Relationship Compatibility*) berbasis MBTI dan AI. Aplikasi ini memberikan insight mendalam tentang dinamika hubungan, gaya komunikasi, dan tips harmonis antara dua individu.

## Fitur Utama

-   **Tes Kepribadian MBTI**: Kuis interaktif untuk menentukan tipe kepribadian.
-   **Analisis AI**: Menggunakan AI (via n8n) untuk menghasilkan laporan kecocokan yang personal dan mendalam.
-   **Integrasi Pembayaran**: Sistem pembayaran aman menggunakan Midtrans untuk mengakses hasil premium.
-   **WhatsApp Delivery**: Hasil analisis dikirimkan langsung ke WhatsApp pengguna.
-   **Responsive Design**: Tampilan optimal untuk mobile dan desktop.

## Teknologi

-   **Frontend**: [Next.js 16](https://nextjs.org/) (App Router), React 19, TailwindCSS 4.
-   **Backend**: Next.js API Routes.
-   **Database**: [Prisma](https://www.prisma.io/) (ORM) dengan PostgreSQL.
-   **Payment Gateway**: [Midtrans](https://midtrans.com/).
-   **AI & Workflow**: [n8n](https://n8n.io/) (untuk flow AI dan pengiriman WhatsApp).
-   **State Management**: Zustand.

## Prasyarat

Sebelum memulai, pastikan Anda telah memiliki:

-   Node.js (v20 atau lebih baru disarankan)
-   PostgreSQL Database
-   Akun Midtrans (Client Key & Server Key)
-   Instance n8n aktif dengan workflow yang sesuai

## Instalasi

1.  **Clone repository:**
    ```bash
    git clone https://github.com/Start-Up-Glitch/tes-kecocokan.git
    cd tes-kecocokan
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # atau
    yarn install
    ```

3.  **Setup Environment Variables:**
    Buat file `.env` di root direktori dan sesuaikan dengan konfigurasi berikut:

    ```env
    # Database
    DATABASE_URL="postgresql://user:password@localhost:5432/tes_kecocokan?schema=public"

    # Midtrans (Client side config)
    NEXT_PUBLIC_MIDTRANS_CLIENT_KEY="your-midtrans-client-key"
    NEXT_PUBLIC_MIDTRANS_SNAP_URL="https://app.sandbox.midtrans.com/snap/snap.js" # Ganti URL jika production
    NEXT_PUBLIC_MIDTRANS_ENABLED="true"

    # Webhook & API Config
    # Tambahkan env var lain yang diperlukan oleh n8n atau logic internal
    ```

4.  **Database Migration:**
    Generate Prisma client dan push schema ke database:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Jalankan Development Server:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Alur Kerja (Workflow)

1.  **User Input**: Pengguna mengisi kuis dan data diri.
2.  **Pembayaran**: Pengguna menyelesaikan pembayaran via Midtrans.
3.  **Proses**:
    -   Backend memanggil webhook n8n setelah konfirmasi pembayaran.
    -   n8n memproses data menggunakan AI prompts.
    -   Hasil dikirim balik ke database dan ke WhatsApp pengguna.
4.  **Pelajari n8n**: Lihat panduan konfigurasi n8n di [n8n_guide.md](./n8n_guide.md).

## Struktur Project

-   `/src/app`: Halaman-halaman Next.js (App Router).
-   `/src/components`: Komponen React reusable.
-   `/src/services`: Logic untuk eksternal service (Midtrans, dll).
-   `/prisma`: Schema database.
-   `/public`: Aset statis.
