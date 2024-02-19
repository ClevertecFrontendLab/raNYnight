import Login from '@pages/auth-page/login/login';
import Registration from '@pages/auth-page/registration/registration';
import { AuthPage, MainPage } from '@pages/index';
import { Paths } from './paths';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthResult from '@pages/auth-page/auth-result/auth-result';
import { ResultActions, ResultImages, ResultMessages, ResultTitles } from '@constants/results';
import PrivateRoutes from './private-routes';
import AuthChangePassword from '@pages/auth-page/change-password/change-password';
import ForgotPassword from '@pages/auth-page/forgot-password/forgot-password';

export const routes = (
    <Routes>
        <Route element={<PrivateRoutes />}>
            <Route path={Paths.MAIN} element={<MainPage />} />
            <Route path={Paths.DEFAULT} element={<Navigate to={Paths.MAIN} />} />
        </Route>

        <Route path={Paths.AUTH} element={<AuthPage />}>
            <Route path={Paths.LOGIN} element={<Login />} />
            <Route path={Paths.REGISTRATION} element={<Registration />} />
            <Route path={Paths.FORGOT_PASSWORD} element={<ForgotPassword />} />
            <Route path={Paths.CHANGE_PASSWORD} element={<AuthChangePassword />} />
        </Route>
        <Route path={Paths.RESULT} element={<AuthPage />}>
            <Route
                path={Paths.SUCCESS}
                element={
                    <AuthResult
                        title={ResultTitles.SUCCESS_REGISTER}
                        message={ResultMessages.SUCCESS_REGISTER}
                        action={ResultActions.LOGIN}
                        image={ResultImages.SUCCESS}
                        href={Paths.LOGIN}
                    />
                }
            />
            <Route
                path={Paths.ERROR}
                element={
                    <AuthResult
                        title={ResultTitles.ERROR_DATA_NOT_SAVED}
                        message={ResultMessages.ERROR_NO_SUCCESS}
                        action={ResultActions.REPEAT}
                        image={ResultImages.ERROR}
                        href={Paths.REGISTRATION}
                    />
                }
            />
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
            <Route
                path={Paths.ERROR_USER_EXIST}
                element={
                    <AuthResult
                        title={ResultTitles.ERROR_USER_EXIST}
                        message={ResultMessages.ERROR_USER_EXIST}
                        action={ResultActions.TO_REGISTER}
                        image={ResultImages.ERROR}
                        href={Paths.REGISTRATION}
                    />
                }
            />
            <Route
                path={Paths.ERROR_CHECK_EMAIL}
                element={
                    <AuthResult
                        title={ResultTitles.ERROR_SOMETHING_WRONG}
                        message={ResultMessages.ERROR_500}
                        action={ResultActions.BACK}
                        image={ResultImages.SOMETHING_WRONG}
                        href={Paths.LOGIN}
                    />
                }
            />
            <Route
                path={Paths.ERROR_CHECK_EMAIL_NO_EXIST}
                element={
                    <AuthResult
                        title={ResultTitles.ERROR_CHECK_EMAIL_NO_EXIST}
                        message={ResultMessages.ERROR_CHECK_EMAIL_NO_EXIST}
                        action={ResultActions.TRY_AGAIN}
                        image={ResultImages.ERROR}
                        href={Paths.LOGIN}
                    />
                }
            />
        </Route>
    </Routes>
);
