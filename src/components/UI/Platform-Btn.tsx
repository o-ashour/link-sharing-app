import ArrowRightIcon from '../../components/icons/ArrowRightIcon';

const Component: React.FC<{iconComponent: any, themeColor: string, name: string, themeType: string}> = ({ iconComponent, themeColor, name, themeType }) => {
  return(
    <button id='platform-btn' className={`flex w-60 h-14 p-4 gap-x-2 ${themeType === 'light' ? 'text-grey-400' : 'text-white'} ${themeColor === '#FFFFFF' ? 'border border-grey-200' : 'border-none'} rounded-lg items-center`} style={{background: `${themeColor}`}}>
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