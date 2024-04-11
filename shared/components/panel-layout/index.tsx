'use client';
import PanelLayoutSidebar from './components/sidebar';
import BasicOnboardingModal from '../basic-onboarding-modal';

const PanelLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="flex flex-row w-screen h-screen max-md:flex-col">
        {/* sidebar */}
        <PanelLayoutSidebar />

        {/* content */}
        <div className="flex container lg:max-w-7xl lg:px-12 h-full overflow-scroll mx-auto py-8 max-lg:z-10 max-lg:pt-16">
          {children}
        </div>
      </div>
      <BasicOnboardingModal />
    </>
  );
};

export default PanelLayout;
