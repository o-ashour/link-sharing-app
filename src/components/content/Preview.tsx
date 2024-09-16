import { linkSharePlatformsConfigs } from '@/config/index';
import PlatformBtn from '@/components/UI/PlatformBtn';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import { ShareLink } from '@/lib/definitions';
import { LinkShareSupportedPlatforms } from '@/config/index';
import { Skeleton } from '@mui/material';

const Component: React.FC<{ data: any, isError: boolean }> = ({ data, isError }) => {
  return (
    <div className='px-16 py-14 space-y-14 md:relative md:bg-white md:w-[21.75rem] md:mx-auto md:rounded-2xl md:px-14 md:py-12 md:mt-24 md:drop-shadow-2xl'>
      <div className='text-center space-y-6 md:space-y-8'>
        <div className="relative h-24 w-24 mx-auto">
          {Object.keys(data).length < 1 ? 
            <Skeleton width={100} height={100} variant='circular' sx={{ marginLeft: 'auto', marginRight: 'auto' }} /> : 
          data.profileInfo.profilePicUrl.value &&
            <Avatar profilePic={data.profileInfo.profilePicUrl.value} />
          }
        </div>

        {Object.keys(data).length < 1 ? 
          <div>
            <Skeleton width={220} height={80} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
            <Skeleton width={200} height={40} sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
          </div> :
          <div className='space-y-2 md:space-y-4'>           
            <h1 className='text-3xl font-bold'>
              {data.profileInfo.firstName.value + ' ' + data.profileInfo.lastName.value}
            </h1>
            <p className='text-grey-300'>
              {data.profileInfo.email.value}
            </p>
          </div>
        }
      </div>

      <div>
        {Object.keys(data).length < 1 ? 
          <Skeleton height={60} variant='rectangular' /> :
        <ul className='space-y-5' id='links'>          
          {data.links.map((link: ShareLink) => {
            const { platform, id, url } = link;
            return (
              <li key={id}>
                <Link href={url}>
                  <PlatformBtn 
                    iconComponent={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].iconComponentForPreviewBtn} 
                    themeColor={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].themeColor} 
                    name={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].readableName} 
                    themeType={linkSharePlatformsConfigs[platform as LinkShareSupportedPlatforms].previewBtnThemeType} 
                  />
                </Link>
              </li>
            )
          })}
        </ul>
        }
      </div>
    </div>
  )
}

export default Component;