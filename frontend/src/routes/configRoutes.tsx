import { LayoutProps } from 'antd';
import MainLayout from '../layouts/MainLayout/MainLayout';
import { Navigate, RouteObject } from 'react-router';
import { AppRoutes } from './appRoutes';
import Homepage from '../pages/home/homePage';
type RouteProperties = {
    layout?: React.FC<LayoutProps>;
};

type ConfigRoute = RouteObject & RouteProperties;

export const ConfigRoutes: ConfigRoute[] = [
    {
        element: <Homepage />,
        path: AppRoutes.HOME,
        index: true,
        layout: MainLayout,
    },
    // {
    //     element: <NotFoundPage />,
    //     path: AppRoutes.NOT_FOUND,
    //     layout: MainLayout,
    // },

    // {
    //     element: <TransferLink />,
    //     path: AppRoutes.TRANSFER_LINK,
    //     layout: MainLayout,
    // },
    // {
    //     element: <ComingSoon />,
    //     path: AppRoutes.COMING_SOON,
    //     layout: MainLayout,
    // },
    // {
    //     element: <URLPage />,
    //     path: AppRoutes.URL,
    //     layout: MainLayout,
    // },
    // {
    //     element: <Certificate />,
    //     path: AppRoutes.CERTIFICATE_PAGE,
    //     layout: MainLayout,
    // },
    {
        path: '*',
        element: <Navigate to={AppRoutes.NOT_FOUND} />,
    },
];
