import { create } from 'zustand';
import certificatesData from '../data/certificates.json';

const useCertificatesStore = create(() => ({
  certificates: certificatesData,
}));

export default useCertificatesStore; 