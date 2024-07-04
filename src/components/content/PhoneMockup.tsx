import Avatar from '../Avatar';
import PlatformBtnPreview from '../UI/PlatformBtnPreview';
import { linkSharePlatformsConfigs } from '../../config/index';
import IllustrationPhoneMockup from '../illustrations/IllustrationPhoneMockup';

const Component: React.FC = () => {
  const isText = true;

  return (
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
  )
}

export default Component;

