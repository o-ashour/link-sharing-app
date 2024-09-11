import UploadImageIcon from '@/components/icons/UploadImageIcon';

const Component: React.FC<{
  imgUrl?: string,
  fileInputRef: any,
  isFileUploading: boolean,
}> = ({
  imgUrl,
  fileInputRef,
  isFileUploading,
 }) => {
    const handleClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    }

    return (
      <button className='relative w-48 h-48 font-semibold rounded-lg px-9 py-14 text-white bg-purple-100 bg-cover bg-center' style={{ backgroundImage: `${imgUrl && !isFileUploading ? `url(${imgUrl})` : 'none' }` }} type='button' onClick={handleClick} disabled={isFileUploading}>
        {imgUrl && !isFileUploading &&
          <div id='overlay' className="bg-black opacity-50 absolute inset-0 rounded-lg" />
        }
        <div className='flex flex-col justify-center items-center gap-y-2.5'>
          <UploadImageIcon isFileUploading={isFileUploading} imgUrl={imgUrl} />
          {/* heading below but not sure which level */}
          {isFileUploading ?
            <span className='text-purple-300'>
              Loading...
            </span> :
            imgUrl ?
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