import ChatChannel from '../ChatChannel/ChatChannel';
import { LayoutProps } from 'antd';
import { Style } from "./style";
const MainLayout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <Style>
            <ChatChannel />
            {/* <Header />
            <main className="wrapper">
                <Suspense fallback={<LoadingContent />}>{children}</Suspense>
            </main>
            <Footer /> */}
        </Style>
    );
};

export default MainLayout;
