import UploadImage from '../UI/UploadImage';
import TextInput from '../UI/TextInput';

const Component: React.FC = () => {
  return (
    <div className='space-y-7'>
      <div className='flex flex-col text-grey-300 p-5'>
        <label htmlFor='Profile picture'>
          Profile picture
        </label>
        <figure className='mt-4'>
          <UploadImage />
        </figure>
        <figcaption className='text-sm mt-6'>
          Image must be below 1024x1024px. Use PNG or JPG format.
        </figcaption>
      </div>

      <div className='p-5 space-y-3'>
        <div className='space-y-1'>
          <label htmlFor='first-name' className='text-sm text-grey-400'>
            First name*
          </label>
          <TextInput type='text' name='first-name' id='first-name' autocomplete='given-name' placeholder='Shady' />
        </div>

        <div className='space-y-1'>
          <label htmlFor='last-name' className='text-sm text-grey-400'>Last name*</label>
          <TextInput type='text' name='last-name' id='last-name' autocomplete='family-name' placeholder='Ahmed' />
        </div>

        <div className='space-y-1'>
          <label htmlFor='email' className='text-sm text-grey-400'>Email</label>
          <TextInput type='email' name='email' id='email' autocomplete='email' placeholder='e.g. shady@example.com' />
        </div>
      </div>
    </div>
  )
}

export default Component;

