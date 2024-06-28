import UploadImage from '../UI/UploadImage';
import TextInput from '../UI/TextInput';

const Component: React.FC = () => {
  return (
    <div className='space-y-7 md:pb-24'>
      <div className='flex flex-col text-grey-300 p-5 md:flex-row md:items-center'>
        <label htmlFor='Profile picture' className='md:w-5/12'>
          Profile picture
        </label>
        <div className='flex flex-col md:flex-row md:items-center md:w-7/12'>
          <figure className='mt-4 md:mr-6'>
            <UploadImage />
          </figure>
          <figcaption className='text-sm mt-6 md:mb-2'>
            Image must be below 1024x1024px. Use PNG or JPG format.
          </figcaption>
        </div>
      </div>

      <div className='p-5 space-y-3'>
        <div className='space-y-1 md:flex md:flex-row md:items-center'>
          <label htmlFor='first-name' className='text-sm text-grey-400 md:text-grey-300 md:text-base md:w-5/12'>
            First name*
          </label>
          <TextInput className='md:w-7/12' type='text' name='first-name' id='first-name' autocomplete='given-name' placeholder='Shady' />
        </div>

        <div className='space-y-1 md:flex md:flex-row md:items-center'>
          <label htmlFor='last-name' className='text-sm text-grey-400 md:text-grey-300 md:w-5/12 md:text-base'>Last name*</label>
          <TextInput className='md:w-7/12' type='text' name='last-name' id='last-name' autocomplete='family-name' placeholder='Ahmed' />
        </div>

        <div className='space-y-1 md:flex md:flex-row md:items-center'>
          <label htmlFor='email' className='text-sm text-grey-400 md:text-base md:text-grey-300 md:w-5/12'>Email</label>
          <TextInput className='md:w-7/12' type='email' name='email' id='email' autocomplete='email' placeholder='e.g. shady@example.com' />
        </div>
      </div>
    </div>
  )
}

export default Component;

