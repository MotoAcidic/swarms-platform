import { createClient } from '@/shared/utils/supabase/server';
import PanelLayoutSidebar from './components/sidebar/sidebar';
import PlatformNavBar from './components/navbar/navbar';
import LayoutModals from './components/modal';

const PanelLayout = async ({ children }: { children: React.ReactNode }) => {
  let user = null;

  try {
    const supabase = createClient();
    if (supabase) {
      const {
        data: { user: supabaseUser },
      } = await supabase.auth.getUser();
      user = supabaseUser;
    }
  } catch (error) {
    console.log('Supabase client is not initialized. Running in local mode.');
  }

  return (
    <>
      <PlatformNavBar user={user} />
      <div className="panel-layout-wrapper mt-16 md:mt-20 flex flex-row w-screen h-screen min-h-screen max-md:flex-col">
        {/* sidebar */}
        <PanelLayoutSidebar user={user} />
        {/* content */}
        {/* <Navbar /> */}
        <div className="main-wrapper-all flex container lg:max-w-7xl h-full mx-auto py-8 ">
          {children}
        </div>
      </div>
      <LayoutModals />
    </>
  );
};

export default PanelLayout;
