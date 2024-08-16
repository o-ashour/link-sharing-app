import Avatar from '@/components/Avatar';
import PlatformBtnPreview from '@/components/UI/PlatformBtnPreview';
import { linkSharePlatformsConfigs, LinkShareSupportedPlatforms } from '@/config/index';
import IllustrationPhoneMockup from '@/components/illustrations/IllustrationPhoneMockup';
import { ProfileInfo } from '@/types';
import { State } from '@/userReducer';

const Component: React.FC<{ savedProfileInfo: ProfileInfo, state: State }>
  = ({ state, savedProfileInfo }) => {
    const isText = savedProfileInfo.firstName.value || savedProfileInfo.lastName.value;
    const isEmail = savedProfileInfo.email.value;

    return (
      <figure className='hidden lg:flex lg:mt-20 lg:justify-center lg:w-2/5 lg:p-6'>
        <div className='h-fit relative flex items-center justify-center'>
          <div id='phone-mockup-outer-wrapper' className='absolute flex items-center justify-center'>
            <div id='phone-mockup-inner-wrapper' className='relative space-y-10'>
              <div id='phone-mockup-content-top' className='w-full space-y-6'>
                <div className="relative flex items-center justify-center h-24 w-24 mx-auto">
                  {savedProfileInfo.profilePicUrl.value ?
                    <Avatar profilePic={savedProfileInfo.profilePicUrl.value} /> :
                    (savedProfileInfo.firstName.value && savedProfileInfo.lastName.value) ?
                      <span id='initials-placeholder' className='text-4xl text-grey-300 mt-0.5'>
                        {savedProfileInfo.firstName.value[0] + savedProfileInfo.lastName.value[0]}
                      </span> :
                      null
                  }
                </div>

                <div className={`space-y-2 w-full min-h-[3.6rem] mx-auto text-center ${(isText || isEmail) && 'bg-white'}`}>
                  <h1 className='text-lg font-semibold min-h-5'>
                    {savedProfileInfo.firstName.value + ' ' + savedProfileInfo.lastName.value}
                  </h1>
                  <p className='text-[14px] text-grey-300'>
                    {savedProfileInfo.email.value}
                  </p>
                </div>
              </div>
              <div id='phone-mockup-content-bottom' className='w-full'>
                <ul className='space-y-[22px]'>
                  {state.links.map((link, idx) => {
                    const { platform, id } = link;
                    if (idx < 5) {
                      return (
                        <li key={id}>
                          <PlatformBtnPreview iconComponent={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].iconComponentForPreviewBtn} themeColor={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].themeColor} name={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].readableName} themeType={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].previewBtnThemeType} />
                        </li>
                      )
                    }
                  })}
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

