'use client'

import Button from '@/components/UI/Button';
import { useEffect, useState, useRef, useReducer, FormEvent } from 'react';
import LinksInitial from '@/components/content/LinksInitial';
import Links from '@/components/content/Links';
import Header from '@/components/layout/Header';
import ProfileDetails from '@/components/content/ProfileDetails';
import Toast from '@/components/UI/Toast';
import { icons } from '@/config/index';
import PhoneMockup from '@/components/content/PhoneMockup';
import { userReducer, Action } from '@/userReducer';
import { ProfileInfo } from '@/types';

export default function Page() {
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const initialProfileInfo = {
    firstName: { value: '', errors: [''] },
    lastName: { value: '', errors: [''] },
    email: { value: '', errors: [''] },
    profilePicUrl: { value: '', errors: [''] },
  }

  const [savedProfileInfo, setSavedProfileInfo] = useState<ProfileInfo>(initialProfileInfo);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const submitBtn = useRef<HTMLButtonElement>(null);

  const initialState = {
    links: [],
    profileInfo: initialProfileInfo,
  }
  const [state, dispatch] = useReducer(userReducer, initialState);

  // temp log
  console.log(state);

  useEffect(() => {
    if (showToast) {
      setTimeout(() => setShowToast(false), 2000)
    }
  }, [showToast]);

  useEffect(() => {
    dispatch({ type: 'reset_errors' })
  }, [isProfileDetailsOpen]);

  const handleFileUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFileUploading(true);
    if (e.target.files) {
      const blob = e.target.files[0];
      const action: Action = { type: 'changed_avatar', blob };
      dispatch(action);
      const nextState = userReducer(state, action);
      const isError = nextState.profileInfo.profilePicUrl.errors[0];

      if (!isError) {
        try {
          const response = await fetch('/api/upload-image', {
            method: 'POST',
            // not sure what appropriate headers are here, if any
            body: blob
          });
          const data = await response.json();
          dispatch({ type: 'uploaded_avatar', data })
        } catch (err) {
          console.error(err)
        }
      }    
    }
    setIsFileUploading(false);
  }

  const handleAddLink = () => {
    dispatch({ type: 'added_link' });
  }

  const handleSave = () => {
    if (submitBtn.current) {
      submitBtn.current.click();
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isProfileDetailsOpen) {
      const action: Action = { type: 'saved_links' };
      dispatch(action);
      const nextState = userReducer(state, action);
      const isError = nextState.links.some(link => link.status.isError === true);
      if (!isError) {
        setShowToast(true);
      } else {
        // should handle error and notify user
      }
    } else {
      const action: Action = { type: 'saved_profile' };
      dispatch(action);
      const nextState = userReducer(state, action);
      const isError = Object.values(nextState.profileInfo).some(value => value.errors[0])
      if (!isError) {
        // this should update from data from backend/db
        setSavedProfileInfo(state.profileInfo);

        const formData = new FormData(e.target as HTMLFormElement);

        // try {
        //   const response = await fetch('/api/user-info', {
        //     method: 'POST',
        //     // not sure what appropriate headers are here, if any
        //     body: formData,
        //   });
        //   const data = await response.json();
        //   console.log(data) // temp log
        // } catch (err) {
        //   console.error(err)
        // }
        setShowToast(true);
      } else {
        // should handle error and notify user
      }
    }
  }

  const content = {
    addLinks: {
      title: 'Customize your links',
      subtitle: 'Add/edit/remove links below and then share all your profiles with the world!'
    },
    profileDetails: {
      title: 'Profile Details',
      subtitle: 'Add your details to create a personal touch to your profile.'
    }
  }

  const toastMsg = 'Your changes have been successfully saved!';

  return (
    <section className='max-w-screen-xl mx-auto'>
      <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} isProfileDetailsOpen={isProfileDetailsOpen} />
      <main className='lg:flex relative overflow-hidden'>
        <PhoneMockup state={state} savedProfileInfo={savedProfileInfo} />
        <div className="p-4 md:p-6 md:pt-0 lg:w-3/5">
          <article className="p-6 space-y-10 border-b border-grey-200 md:p-10 md:pb-14">
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-grey-400 text-2xl font-bold md:text-3xl">
                {!isProfileDetailsOpen ? content.addLinks.title : content.profileDetails.title}
              </h1>
              <p className="text-grey-300">
                {!isProfileDetailsOpen ? content.addLinks.subtitle : content.profileDetails.subtitle}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              {!isProfileDetailsOpen ?
                <div id='links'>
                  <Button type='button' variant='secondary' handleClick={handleAddLink}>
                    + Add new link
                  </Button>
                  {state.links.length < 1 ?
                    <LinksInitial />
                    : <Links state={state} dispatch={dispatch} />}
                </div> :
                <ProfileDetails state={state} dispatch={dispatch} handleFileUploadChange={handleFileUploadChange} isFileUploading={isFileUploading} />
              }
              <button aria-label='hidden-submit-button-for-design' type='submit' className='hidden' ref={submitBtn}>Submit</button>
            </form>

          </article>
          <div className="p-4 md:px-10 md:py-6 md:flex md:justify-end">
            <Button className='md:w-24' disabled={(state.links.length < 1) && !isProfileDetailsOpen} handleClick={handleSave}>Save</Button>
          </div>
        </div>
        <div className={`fixed -bottom-20 w-full transition-transform duration-200 ease-in ${showToast && '-translate-y-40 lg:-translate-y-24'}`}>
          <div className='w-fit mx-auto'>
            <Toast iconComponent={icons.changesSaved} message={toastMsg} />
          </div>
        </div>
      </main>
    </section>
  )
}
