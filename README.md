# 🔐 solana-tool: Konversi Private Key Base58 ke Secret Key (Uint8Array)

Tool ini digunakan untuk mengkonversi private key Solana dari format Base58 (seperti hasil export dari Phantom) menjadi format `Uint8Array` `[xx, xx, ...]` yang dapat digunakan langsung oleh `@solana/web3.js`.

---

## 📦 Prasyarat

Pastikan kamu sudah meng-install **Node.js versi 18+**  
Jika belum, download dari: [https://nodejs.org/](https://nodejs.org/)

---

## 🚀 Cara Penggunaan

### 1. Clone / Masuk ke Folder

```bash
cd solana-tool
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Buat File `.env`

Tambahkan isi seperti berikut:

```env
SOLANA_BASE58_PRIVATE_KEY=xxx
```

> ⚠️ Gantilah value di atas dengan private key Base58 milik kamu. Jangan bagikan file ini ke publik.

### 4. Jalankan Konversi

```bash
node convert.js
```

Output:

```
✅ Konversi selesai dan disimpan ke .env
✅ Public Key (alamat wallet): xxx
```

### 5. Cek Isi `.env`

Sekarang `.env` kamu akan otomatis memiliki:

```env
SOLANA_PRIVATE_KEY=[22,91,200,45,...]
```

Field ini langsung bisa digunakan dengan:

```js
const secret = Uint8Array.from(JSON.parse(process.env.SOLANA_PRIVATE_KEY));
const keypair = Keypair.fromSecretKey(secret);
```

---

## 📁 Struktur File

```
solana-tool/
├── .env
├── convert.js          # File utama untuk konversi dan verifikasi
├── package.json
├── README.md
```

---

## 🧪 Contoh Kode untuk Verifikasi Alamat Wallet

```js
import 'dotenv/config';
import { Keypair } from '@solana/web3.js';

const raw = process.env.SOLANA_PRIVATE_KEY;
const secret = Uint8Array.from(JSON.parse(raw));
const wallet = Keypair.fromSecretKey(secret);

console.log("✅ Public Key (alamat wallet):", wallet.publicKey.toBase58());
```

---

## 🛡️ Catatan Keamanan

- Jangan commit `.env` ke Git!
- Jangan pernah membagikan `SOLANA_BASE58_PRIVATE_KEY` atau `SOLANA_PRIVATE_KEY`.
- Gunakan hanya untuk pengembangan internal dan wallet khusus backend.

---
