import type { PerformanceRegisterRequestDto } from '@/apis/performance';
import { create } from 'zustand';

interface PerformanceRegisterState {
  step: number;
  formData: Partial<PerformanceRegisterRequestDto>;
  setStep: (step: number) => void;
  setFormData: (data: Partial<PerformanceRegisterRequestDto>) => void;
  reset: () => void;
}

const initialState = {
  step: 1,
  formData: {
    teamName: '',
    contactNumber: '',
    email: '',
    instagramUrl: '',
    performanceName: '',
    performanceLocation: '',
    performanceDescription: '',
    performanceDetail: '',
    checklist: [],
  },
};

export const useRegisterStore = create<PerformanceRegisterState>(set => ({
  ...initialState,
  setStep: step => set({ step }),
  setFormData: data =>
    set(state => ({
      formData: { ...state.formData, ...data },
    })),
  reset: () => set(initialState),
}));
