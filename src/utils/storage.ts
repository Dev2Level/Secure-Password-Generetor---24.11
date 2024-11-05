import { encrypt, decrypt, deriveKey, generateSalt } from './encryption';

export interface StoredPassword {
  id: string;
  title: string;
  username: string;
  password: string;
  url?: string;
  notes?: string;
  createdAt: number;
  updatedAt: number;
}

export interface EncryptedData {
  salt: string;
  iv: string;
  data: string;
}

export class SecureStorage {
  private static readonly STORAGE_KEY = 'secure_passwords';
  private masterKey: CryptoKey | null = null;

  async initialize(masterPassword: string): Promise<void> {
    let salt = localStorage.getItem('master_salt');
    if (!salt) {
      salt = generateSalt();
      localStorage.setItem('master_salt', salt);
    }
    this.masterKey = await deriveKey(masterPassword, salt);
  }

  async savePasswords(passwords: StoredPassword[]): Promise<void> {
    if (!this.masterKey) throw new Error('Storage not initialized');

    const encrypted = await encrypt(
      JSON.stringify(passwords),
      this.masterKey
    );

    localStorage.setItem(SecureStorage.STORAGE_KEY, JSON.stringify({
      salt: localStorage.getItem('master_salt'),
      ...encrypted
    }));
  }

  async loadPasswords(): Promise<StoredPassword[]> {
    if (!this.masterKey) throw new Error('Storage not initialized');

    const encryptedData = localStorage.getItem(SecureStorage.STORAGE_KEY);
    if (!encryptedData) return [];

    const { iv, data } = JSON.parse(encryptedData);
    const decrypted = await decrypt(data, iv, this.masterKey);
    return JSON.parse(decrypted);
  }

  async clearAll(): Promise<void> {
    localStorage.removeItem(SecureStorage.STORAGE_KEY);
    localStorage.removeItem('master_salt');
    this.masterKey = null;
  }
}