import Avatar from '@/components/Avatar';
import PlatformBtnPreview from '@/components/UI/PlatformBtnPreview';
import { linkSharePlatformsConfigs, LinkShareSupportedPlatforms } from '@/config/index';
import IllustrationPhoneMockup from '@/components/illustrations/IllustrationPhoneMockup';
import { ProfileInfo, State } from '@/lib/definitions';
import { Skeleton } from '@mui/material';

const Component: React.FC<{ savedProfileInfo: ProfileInfo, state: State, isLoading: boolean, data: any }>
  = ({ state, savedProfileInfo, isLoading, data }) => {
    const isText = savedProfileInfo.firstName.value || savedProfileInfo.lastName.value;
    const isEmail = savedProfileInfo.email.value;

    return (
      <figure className='hidden lg:flex lg:mt-20 lg:justify-center lg:w-2/5 lg:p-6'>
        <div className='h-fit relative flex items-center justify-center'>
          <div id='phone-mockup-outer-wrapper' className='absolute flex items-center justify-center'>
            <div id='phone-mockup-inner-wrapper' className={`relative space-y-10 ${isLoading || (Object.keys(data).length < 1) ? 'bg-white' : 'bg-transparent'}`}>
              <div id='phone-mockup-content-top' className='w-full space-y-6'>
                <div className="relative flex items-center justify-center h-24 w-24 mx-auto">
                  {isLoading || (Object.keys(data).length < 1) ?
                    <Skeleton height={95} width={95} variant='circular' />
                  : 
                    savedProfileInfo.profilePicUrl.value ?
                      <Avatar profilePic={savedProfileInfo.profilePicUrl.value} /> :
                      (savedProfileInfo.firstName.value && savedProfileInfo.lastName.value) ?
                        <span id='initials-placeholder' className='text-4xl text-grey-300 mt-0.5'>
                          {savedProfileInfo.firstName.value[0] + savedProfileInfo.lastName.value[0]}
                        </span> :
                        null
                    }
                </div>

                <div className={`space-y-2 w-full min-h-[3.6rem] mx-auto text-center ${(isText || isEmail) && 'bg-white'}`}>
                  {isLoading || (Object.keys(data).length < 1) ?
                  <div>
                    <Skeleton width={140} height={40} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
                    <Skeleton width={130} height={30} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
                  </div> :
                  <>
                    <h1 className='text-lg font-semibold min-h-5'>
                      {savedProfileInfo.firstName.value + ' ' + savedProfileInfo.lastName.value}
                    </h1>
                    <p className='text-[14px] text-grey-300'>
                      {savedProfileInfo.email.value}
                    </p>
                  </>
                }
                </div>
              </div>
              <div id='phone-mockup-content-bottom' className='w-full'>
                <ul className='space-y-[22px]'>
                  {isLoading || (Object.keys(data).length < 1) ?
                    <div className="bg-white">
                      <Skeleton height={60} width='auto' />
                      <Skeleton height={60} width='auto' />
                      <Skeleton height={60} width='auto' />
                      <Skeleton height={60} width='auto' />
                      <Skeleton height={60} width='auto' />
                    </div> :
                    state.links.map((link, idx) => {
                      const { platform, id } = link;
                      if (idx < 5) {
                        return (
                          <li key={id}>
                            <PlatformBtnPreview iconComponent={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].iconComponentForPreviewBtn} themeColor={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].themeColor} name={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].readableName} themeType={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].previewBtnThemeType} />
                          </li>
                        )
                      }
                    })
                  }
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

