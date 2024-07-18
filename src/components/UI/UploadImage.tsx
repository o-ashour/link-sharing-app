import UploadImageIcon from '@/components/icons/UploadImageIcon';

const Component: React.FC<{
  imgUrl?: string,
  fileInputRef: any,
  isFileUploaded: boolean
}> = ({
  imgUrl = '/prototyping-imgs/1024px-Malcolm-x.jpg',
  fileInputRef,
  isFileUploaded }) => {
    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }

    return (
      <button className='relative w-48 h-48 font-semibold rounded-lg px-9 py-14 text-white bg-purple-100 bg-cover bg-center' style={{ backgroundImage: `${isFileUploaded ? `url(${imgUrl})` : 'none'}` }} type='button' onClick={handleClick}>
        {isFileUploaded &&
          <div id='overlay' className="bg-black opacity-50 absolute inset-0 rounded-lg" />
        }
        <div className='flex flex-col justify-center items-center gap-y-2.5'>
          <UploadImageIcon isFileUploaded={isFileUploaded} />
          {/* heading below but not sure which level */}
          {isFileUploaded ?
            <span className='z-50 text-white'>
              Change Image
            </span> :
            <span className='text-purple-300'>
              + Upload Image
            </span>
          }
        </div>
      </button>
    )
  }

export default Component;