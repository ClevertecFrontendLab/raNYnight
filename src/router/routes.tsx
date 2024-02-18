import ForgotPassword from '@pages/auth-page/forgot-password/forgot-password';
import Login from '@pages/auth-page/login/login';
import Registration from '@pages/auth-page/registration/registration';
import { AuthPage, MainPage } from '@pages/index';
import { Paths } from './paths';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthResult from '@pages/auth-page/auth-result/auth-result';
import { ResultActions, ResultImages, ResultMessages, ResultTitles } from '@constants/results';

export const routes = (
    <Routes>
        <Route path={Paths.MAIN} element={<MainPage />} />
        <Route path={Paths.DEFAULT} element={<Navigate to={Paths.MAIN} />} />
        <Route path={Paths.AUTH} element={<AuthPage />}>
            <Route path={Paths.LOGIN} element={<Login />} />
            <Route path={Paths.REGISTRATION} element={<Registration />} />
            <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
        </Route>
        <Route path={Paths.RESULT} element={<AuthPage />}>
            <Route
                path={Paths.ERROR_LOGIN}
                element={
                    <AuthResult
                        title={ResultTitles.ERROR_LOGIN}
                        message={ResultMessages.ERROR_SOMETHING_WRONG}
                        action={ResultActions.REPEAT}
                        image={ResultImages.WARN}
                        href={Paths.LOGIN}
                    />
                }
            />
        </Route>
    </Routes>
);
