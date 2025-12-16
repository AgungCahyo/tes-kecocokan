# Update n8n Workflow

Agar website bisa menyimpan pesan yang dikirim bot, workflow n8n Anda harus **mengirimkan kembali** teks pesan tersebut ke website sebagai respon dari Webhook.

## Langkah-langkah

1.  Buka workflow n8n Anda (flow `/personality-test`).
2.  Cari node yang menghasilkan teks pesan (misalnya node **Code** yang membuat variabel `summaryMessage` atau `detailedMessage`).
3.  Tambahkan node **Respond to Webhook** setelah node tersebut (sebelum node Split in Batches atau WhatsApp).
4.  Konfigurasi node **Respond to Webhook** seperti di bawah ini.

## Konfigurasi Node "Respond to Webhook"

Copy-paste JSON ini ke canvas n8n Anda untuk membuat nodenya otomatis, lalu sambungkan output dari node **Code** (yang berisi `message` atau `body`) ke node ini.

```json
{
  "nodes": [
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={\n  \"success\": true,\n  \"message\": \"{{ $json.body }}\" \n}",
        "options": {}
      },
      "name": "Return Message to API",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [
        200, 
        0
      ]
    }
  ]
}
```

**Penting:**
Pastikan field `message` di `responseBody` mengambil data teks yang benar.
-   Jika pesan ada di `$json.body`, gunakan `{{ $json.body }}`.
-   Jika pesan ada di `$json.detailedMessage`, gunakan `{{ $json.detailedMessage }}`.

## Alur Data
1.  Website (`api/payment/create`) memanggil n8n Webhook.
2.  n8n generate pesan analisis.
3.  n8n **merespon** (Respond to Webhook) dengan JSON: `{ "message": "Halo Agung..." }`.
4.  Website menerima respon ini dan menyimpannya ke database.
5.  n8n melanjutkan proses mengirim pesan ke WhatsApp user (node WhatsApp).
