import { create } from 'zustand';
import { AuthState, AuthActions } from '@/types/auth';

const STORAGE_KEYS = {
    username: 'username',
    studentId: 'studentId',
    institution: 'institution',
    accessToken: 'access_token',
    encryptedPassword: 'encrypted_password',
    rememberMe: 'remember_me'
} as const;

const getInitialState = (): AuthState => {
    // Check localStorage first (for "remember me" users)
    const storage = localStorage.getItem(STORAGE_KEYS.rememberMe) === 'true' ? localStorage : sessionStorage;

    return {
        username: storage.getItem(STORAGE_KEYS.username) || '',
        studentId: storage.getItem(STORAGE_KEYS.studentId) || '',
        institution: storage.getItem(STORAGE_KEYS.institution) || '',
        accessToken: storage.getItem(STORAGE_KEYS.accessToken) || '',
        encryptedPassword: storage.getItem(STORAGE_KEYS.encryptedPassword) || undefined,
        rememberMe: storage.getItem(STORAGE_KEYS.rememberMe) === 'true'
    };
};

const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
    ...getInitialState(),

    setAuth: (payload: Partial<AuthState>) => {
        set((state) => {
            const newState = { ...state, ...payload };
            const storage = newState.rememberMe ? localStorage : sessionStorage;

            // Update storage
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== undefined) {
                    storage.setItem(STORAGE_KEYS[key as keyof typeof STORAGE_KEYS], String(value));
                }
            });

            // If rememberMe changed, migrate data between storages
            if ('rememberMe' in payload) {
                const oldStorage = !newState.rememberMe ? localStorage : sessionStorage;
                const newStorage = newState.rememberMe ? localStorage : sessionStorage;

                // Clear the new storage first
                newStorage.clear();

                // Copy all auth data to the new storage
                Object.values(STORAGE_KEYS).forEach((key) => {
                    const value = oldStorage.getItem(key);
                    if (value) {
                        newStorage.setItem(key, value);
                    }
                });

                // Clear the old storage
                oldStorage.clear();
            }

            return newState;
        });
    },

    clearAuth: () => {
        // Clear both storages
        localStorage.clear();
        sessionStorage.clear();

        // Reset state
        set({
            username: '',
            studentId: '',
            institution: '',
            accessToken: '',
            encryptedPassword: undefined,
            rememberMe: false
        });
    },

    storageType: () => {
        return get().rememberMe ? localStorage : sessionStorage;
    }
}));

export default useAuthStore; 