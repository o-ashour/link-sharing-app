'use client'

import Button from '../../components/UI/Button';
import { useState } from 'react';
import NoLink from '../../components/content/NoLink';
import AddedLink from '../../components/content/AddedLink';
import Header from '../../components/layout/Header';
import ProfileDetails from '../../components/content/ProfileDetails';
import IllustrationPhoneMockup from '../../components/illustrations/IllustrationPhoneMockup';
import GitHubIcon from '../../components/icons/platforms/GitHubIcon';
// import PlatformBtn from '../../components/UI/Platform-Btn';
import PlatformBtnPreview from '../../components/UI/PlatformBtnPreview';
import { linkSharePlatformsConfigs } from '../../config/index';
import Avatar from '../../components/Avatar';
import Toast from '../../components/UI/Toast';
import { icons } from '../../config/index';

export default function Page() {
  const [isFirstLinkAdded, setIsFirstLinkAdded] = useState(false);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);

  const handleClick = () => {
    if (!isFirstLinkAdded) {
      setIsFirstLinkAdded(true);
    }
  }

  const content = {
    addLinks: {
      title: 'Customize your links',
      subtitle: 'Add/edit/remove links below and then share all your profiles with the world!'
    },
    profileDetails: {
      title: 'Profile Details',
      subtitle: 'Add your details to create a personal touch to your profile.'
    }
  }

  const toastMsg = 'Your changes have been successfully saved!';

  const isText = true;
  const isSuccessful = false;
  const isAnimate = false;

  return (
    <section>
      <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} isProfileDetailsOpen={isProfileDetailsOpen}  />
      <div className='lg:flex relative overflow-hidden'>
        <figure className='hidden lg:flex lg:mt-20 lg:justify-center lg:w-2/5 lg:p-6'>
          <div className='h-fit relative flex items-center justify-center'>
            <div id='phone-mockup-outer-wrapper' className='absolute flex items-center justify-center'>
              <div id='phone-mockup-inner-wrapper' className='relative space-y-10'>
                <div id='phone-mockup-content-top' className='w-full space-y-6'>
                  <div className="relative h-24 w-24 mx-auto">
                    <Avatar />
                  </div>
                  <div className={`space-y-2 w-full min-h-[3.6rem] mx-auto text-center ${isText && 'bg-white'}`}>
                    <h1 className='text-lg font-semibold'>
                      Ali el-Shorbagy
                    </h1>
                    <p className='text-[14px] text-grey-300'>
                      ali_s@example.com
                    </p>
                  </div>
                </div>
                <div id='phone-mockup-content-bottom' className='w-full'>
                  <ul className='space-y-[22px]'>
                  <li>
                    <PlatformBtnPreview iconComponent={linkSharePlatformsConfigs['GitHub'].iconComponentForPreviewBtn} themeColor={linkSharePlatformsConfigs['GitHub'].themeColor} name={linkSharePlatformsConfigs['GitHub'].readableName} themeType={linkSharePlatformsConfigs['GitHub'].previewBtnThemeType} />
                  </li>
                  <li>
                    <PlatformBtnPreview iconComponent={linkSharePlatformsConfigs['YouTube'].iconComponentForPreviewBtn} themeColor={linkSharePlatformsConfigs['YouTube'].themeColor} name={linkSharePlatformsConfigs['YouTube'].readableName} themeType={linkSharePlatformsConfigs['YouTube'].previewBtnThemeType} />
                  </li>
                  <li>
                    <PlatformBtnPreview iconComponent={linkSharePlatformsConfigs['LinkedIn'].iconComponentForPreviewBtn} themeColor={linkSharePlatformsConfigs['LinkedIn'].themeColor} name={linkSharePlatformsConfigs['LinkedIn'].readableName} themeType={linkSharePlatformsConfigs['LinkedIn'].previewBtnThemeType} />
                  </li>
                </ul>
                </div>
              </div>
            </div>
            <IllustrationPhoneMockup />
          </div>
        </figure>
        <div className="p-4 md:p-6 md:pt-0 lg:w-3/5">
          <article className="p-6 space-y-10 border-b border-grey-200 md:p-10 md:pb-14">
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-grey-400 text-2xl font-bold md:text-3xl">
                {!isProfileDetailsOpen ? content.addLinks.title : content.profileDetails.title}
              </h1>
              <p className="text-grey-300">
                {!isProfileDetailsOpen ? content.addLinks.subtitle : content.profileDetails.subtitle}
              </p>
            </div>

            {!isProfileDetailsOpen ?
              <div>
                <Button variant='secondary' handleClick={handleClick}>
                  + Add new link
                </Button>
                {!isFirstLinkAdded ? <NoLink /> : <AddedLink />}
              </div> :
              <ProfileDetails />
            }

          </article>
          <div className="p-4 md:px-10 md:py-6 md:flex md:justify-end">
            <Button className='md:w-24' disabled={!isFirstLinkAdded && !isProfileDetailsOpen}>Save</Button>
          </div>
        </div>
        {
          isSuccessful && (
            <div className={`fixed -bottom-14 w-full transition-transform duration-200 ease-in ${isAnimate && '-translate-y-24'}`}>
              <div className='w-fit mx-auto'>
                <Toast iconComponent={icons.changesSaved} message={toastMsg} />
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}
