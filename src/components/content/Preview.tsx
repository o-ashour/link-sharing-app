import Image from "next/image";
import profilePic from '/Users/Protomar/Desktop/link-sharing-app/public/prototyping-imgs/1024px-Malcolm-x.jpg';
import { linkSharePlatformsConfigs } from '../../config/index';
import PlatformBtn from '../UI/Platform-Btn';
import Avatar from '../Avatar';

const Component: React.FC = () => {
  return (
    <div className='px-16 py-14 space-y-14 md:relative md:bg-white md:w-[21.75rem] md:mx-auto md:rounded-2xl md:px-14 md:py-12 md:mt-24 md:drop-shadow-2xl'>
      <div className='text-center space-y-6 md:space-y-8'>
        <div className="relative h-24 w-24 mx-auto">
          <Avatar />
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