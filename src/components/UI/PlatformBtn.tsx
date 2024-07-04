import ArrowRightIcon from '../icons/ArrowRightIcon';
import { linkSharePlatformsConfigs } from '@/config';

// default props for button
const { iconComponentForPreviewBtn, readableName, themeColor: platformTheme, previewBtnThemeType } = linkSharePlatformsConfigs['GitHub'];

const Component: React.FC<{ iconComponent?: any, themeColor?: string, name?: string, themeType?: string }> = ({ iconComponent = iconComponentForPreviewBtn, themeColor = platformTheme, name = readableName, themeType = previewBtnThemeType }) => {
  return(
    <button id='platform-btn' className={`flex w-full p-4 gap-x-2 ${themeType === 'light' ? 'text-grey-400' : 'text-white'} ${themeColor === '#FFFFFF' ? 'border border-grey-200' : 'border-none'} rounded-lg items-center`} style={{background: `${themeColor}`}}>
      <figure id='platform-preview-icon'>
        {iconComponent}
      </figure>
      <span className='flex-1 text-left'>{name}</span>
      <figure id='right-arrow-icon'>
        <ArrowRightIcon color={themeType === 'light' ? '#737373' : '#fff'} />
      </figure>
    </button>
  )
}

export default Component;