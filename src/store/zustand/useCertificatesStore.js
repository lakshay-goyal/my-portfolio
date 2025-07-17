import { create } from 'zustand';
import certificatesData from '../data/certificates.json';

const useCertificatesStore = create((set) => ({
  certificates: certificatesData,
}));

export default useCertificatesStore; 