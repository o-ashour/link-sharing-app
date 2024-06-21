import UploadImageIcon from '../../components/icons/UploadImageIcon';

const Component: React.FC<{isImgUploaded: boolean, imgUrl: string}> = ({ isImgUploaded = true, imgUrl = '/prototyping-imgs/1024px-Malcolm-x.jpg' }) => {
  return(
    <button className='relative w-48 h-48 font-semibold rounded-lg px-9 py-14 text-white bg-purple-100 bg-cover' style={{ backgroundImage: `${isImgUploaded ? `url(${imgUrl})` : 'none'}` }}>
      {isImgUploaded &&
        <div id='overlay' className="bg-black opacity-50 absolute inset-0 rounded-lg" />
      }
      <div className='flex flex-col justify-center items-center gap-y-2.5'>
        <UploadImageIcon isImgUploaded={isImgUploaded} />
        {/* heading below but not sure which level */}
        {isImgUploaded ?
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