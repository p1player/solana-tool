import 'dotenv/config';
import bs58 from 'bs58';
import fs from 'fs';
import { Keypair } from '@solana/web3.js';

const base58PrivateKey = process.env.SOLANA_BASE58_PRIVATE_KEY;

if (!base58PrivateKey) {
  console.error("❌ ENV SOLANA_BASE58_PRIVATE_KEY belum diisi.");
  process.exit(1);
}

// 🔁 1. Konversi base58 ke array
const decoded = bs58.decode(base58PrivateKey);
const asArray = Array.from(decoded);

// 📄 2. Simpan ke .env
const envPath = '.env';
let envContent = fs.readFileSync(envPath, 'utf-8');
const newLine = `SOLANA_PRIVATE_KEY=${JSON.stringify(asArray)}`;

if (envContent.includes('SOLANA_PRIVATE_KEY=')) {
  envContent = envContent.replace(/SOLANA_PRIVATE_KEY=.*/g, newLine);
} else {
  envContent += `\n${newLine}`;
}
fs.writeFileSync(envPath, envContent, 'utf-8');

console.log("✅ Konversi selesai dan disimpan ke .env");

// 🧪 3. Load dan tampilkan public key
function showWalletAddress() {
  const secret = Uint8Array.from(asArray);
  const wallet = Keypair.fromSecretKey(secret);
  console.log("✅ Public Key (alamat wallet):", wallet.publicKey.toBase58());
}

showWalletAddress();
