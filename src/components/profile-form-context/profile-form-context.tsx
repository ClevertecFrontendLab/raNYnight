import { createContext } from 'react';
import { FormInstance } from 'antd';

export const ProfileFormContext = createContext<FormInstance | null>(null);

export const ProfileFormContextProvider: React.FC<{
    form: FormInstance;
    children: React.ReactNode;
}> = ({ form, children }) => {
    return <ProfileFormContext.Provider value={form}>{children}</ProfileFormContext.Provider>;
};
