import { useContext } from 'react';
import { ProfileFormContext } from '@components/profile-form-context/profile-form-context';

export const useProfileFormContext = () => useContext(ProfileFormContext);
