import Image from "next/image";
import profilePic from '/Users/Protomar/Desktop/link-sharing-app/public/prototyping-imgs/1024px-Malcolm-x.jpg';
import { linkSharePlatformsConfigs } from '../../config/index';
import PlatformBtn from '../UI/Platform-Btn';

const Component: React.FC = () => {
  return (
    <div className='px-16 py-14 space-y-14 md:relative md:bg-white md:w-[21.75rem] md:mx-auto md:rounded-2xl md:px-14 md:py-12 md:mt-24 md:drop-shadow-2xl'>
      <div className='text-center space-y-6 md:space-y-8'>
        {/* overflow-hidden */}
        <div className="relative h-24 w-24 mx-auto">
          <Image
            className="rounded-full object-cover ring-4 ring-purple-300"
            src={profilePic}
            alt="Profile picture"
            placeholder='blur'
            fill
            priority
          // width={500} automatically provided
          // height={500} automatically provided
          // blurDataURL="data:..." automatically provided
          // placeholder="blur" // Optional blur-up while loading
          />
        </div>

        <div className='space-y-2 md:space-y-4'>
          <h1 className='text-3xl font-bold'>
            Ali el-Shorbagy
          </h1>
          <p className='text-grey-300'>ali_s@example.com</p>
        </div>

      </div>

      <div>
        <ul className='space-y-5' id='links'>
          {Object.entries(linkSharePlatformsConfigs).map(([k, v]) => {
            return (
              <li key={k}>
                <PlatformBtn iconComponent={v.iconComponentForPreviewBtn} themeColor={v.themeColor} name={v.readableName} themeType={v.previewBtnThemeType} />
              </li>
            )
          })
          }
        </ul>
      </div>
    </div>
  )
}

export default Component;