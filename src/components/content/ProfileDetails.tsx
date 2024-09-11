import UploadImage from '@/components/UI/UploadImage';
import TextInput from '@/components/UI/TextInput';
import { useRef, Dispatch } from 'react';
import { State, Action } from '@/userReducer';

const Component: React.FC<{
  handleFileUploadChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  isFileUploading: boolean,
  state: State, 
  dispatch: Dispatch<Action>
}> = ({
  handleFileUploadChange,
  isFileUploading,
  state,
  dispatch,
 }) => {
    const fileInputRef = useRef(null);

    const handleProfileInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'edited_profile', fieldValue: e.target.value, fieldName: e.target.name });
    }

    return (
      <div className='space-y-7 md:pb-24'>
        <div className='flex flex-col text-grey-300 p-5 md:flex-row md:items-center'>
          <label htmlFor='file' className='md:w-5/12'>
            Profile picture
          </label>
          <div id='profile-picture' className='flex flex-col md:flex-row md:items-center md:w-7/12'>
            <figure className='mt-4 md:mr-6'>
              <UploadImage 
                fileInputRef={fileInputRef} 
                isFileUploading={isFileUploading}
                imgUrl={state.profileInfo.profilePicUrl.value} 
              />
            </figure>
            <figcaption className='text-sm mt-6 md:mb-2'>
              Image size must be below 3MB. Use PNG or JPG format.
              {state.profileInfo.profilePicUrl.errors[0] &&
                <div className='text-red text-sm mt-2'>
                  <span>Please check again:</span>
                  <ul>
                    {state.profileInfo.profilePicUrl.errors.map((errorMsg, idx) => {
                      return <li key={idx}>{errorMsg}</li>
                    })}
                  </ul>
                </div>
              }
            </figcaption>
          </div>
          <div className='absolute hidden'>
            <label htmlFor="file" className="sr-only">Choose File</label>
            <input ref={fileInputRef} name='file' id='file' type='file' onChange={handleFileUploadChange} accept='.png, .jpg, .jpeg' disabled={isFileUploading} />
          </div>
        </div>

        <div className='p-5 space-y-3'>
          <div className='space-y-1 md:flex md:flex-row md:items-center'>
            <label htmlFor='first-name' className='text-sm text-grey-400 md:text-grey-300 md:text-base md:w-5/12'>
              First name*
            </label>
            <TextInput className='md:w-7/12' type='text' value={state.profileInfo.firstName.value} name='firstName' id='first-name' autocomplete='given-name' placeholder='Shady' handleChange={handleProfileInfoChange} isError={Boolean(state.profileInfo.firstName.errors[0])} />
          </div>

          <div className='space-y-1 md:flex md:flex-row md:items-center'>
            <label htmlFor='last-name' className='text-sm text-grey-400 md:text-grey-300 md:w-5/12 md:text-base'>Last name*</label>
            <TextInput className='md:w-7/12' type='text' value={state.profileInfo.lastName.value} name='lastName' id='last-name' autocomplete='family-name' placeholder='Ahmed' handleChange={handleProfileInfoChange} isError={Boolean(state.profileInfo.lastName.errors[0])} />
          </div>

          <div className='space-y-1 md:flex md:flex-row md:items-center'>
            <label htmlFor='email' className='text-sm text-grey-400 md:text-base md:text-grey-300 md:w-5/12'>Email</label>
            <TextInput className='md:w-7/12' type='email' value={state.profileInfo.email.value} name='email' id='email' autocomplete='email' placeholder='e.g. shady@example.com' handleChange={handleProfileInfoChange} isError={Boolean(state.profileInfo.email.errors[0])} />
          </div>
        </div>
      </div>
    )
  }

export default Component;

