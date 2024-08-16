import { linkSharePlatformsConfigs } from '@/config/index';
import PlatformBtn from '@/components/UI/PlatformBtn';
import Avatar from '@/components/Avatar';
import Link from 'next/link';
import profilePicDefault from '/public/logo/logo-devlinks-small.svg';

const Component: React.FC = ({ data }) => {
  return (
    <div className='px-16 py-14 space-y-14 md:relative md:bg-white md:w-[21.75rem] md:mx-auto md:rounded-2xl md:px-14 md:py-12 md:mt-24 md:drop-shadow-2xl'>
      <div className='text-center space-y-6 md:space-y-8'>
        <div className="relative h-24 w-24 mx-auto">
          <Avatar profilePic={data.profileInfo.profilePicUrl.value || profilePicDefault}/>
        </div>
        <div className='space-y-2 md:space-y-4'>
          <h1 className='text-3xl font-bold'>
            {data.profileInfo.firstName.value + ' ' + data.profileInfo.lastName.value}
          </h1>
          <p className='text-grey-300'>
            {data.profileInfo.email.value}
          </p>
        </div>
      </div>

      <div>
        <ul className='space-y-5' id='links'>
          {data.links.map(link => {
            return (
              <li key={link.id}>
                {/* <Link href={link.url}> */}
                  <PlatformBtn iconComponent={linkSharePlatformsConfigs[link.platform].iconComponentForPreviewBtn} themeColor={linkSharePlatformsConfigs[link.platform].themeColor} name={linkSharePlatformsConfigs[link.platform].readableName} themeType={linkSharePlatformsConfigs[link.platform].previewBtnThemeType} />
                {/* </Link> */}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default Component;