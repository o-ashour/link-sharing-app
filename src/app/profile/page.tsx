'use client'

// TODO:
// 1. Loading states (i.e. skeleton loaders)
// 2. Error toast
// 3. Show server-thrown errors, validation errors in UI
// 4. Look at useTransition for wrapping server actions for error handling
// 5. Case: Upload pic - successfully previewed/uploaded 
//          - change pic - cancel - typeerror
// 6. Case: Can still open file uploader during loading state, shouldn't be allowed

import Button from '@/components/UI/Button';
import { useEffect, useState, useRef, useReducer, FormEvent, useActionState } from 'react';
import LinksInitial from '@/components/content/LinksInitial';
import Links from '@/components/content/Links';
import Header from '@/components/layout/Header';
import ProfileDetails from '@/components/content/ProfileDetails';
import Toast from '@/components/UI/Toast';
import { icons } from '@/config/index';
import PhoneMockup from '@/components/content/PhoneMockup';
import { userReducer, Action } from '@/userReducer';
import { ProfileInfo } from '@/types';
import { clearLinksInStore, getUserData, saveLinks, saveProfileInfo} from '@/components/actions';

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

  useEffect(() => {
    const userId = window.sessionStorage.getItem('id'); // temp auth flow
    const loadInitialUserProfileData = async () => {
      try {
        const data = await getUserData(userId);
        dispatch({ type: 'loaded_dashboard', data })
          const nextProfileInfo = {
            firstName: { value: data.profileInfo.firstName.value, errors: [''] },
            lastName: { value: data.profileInfo.lastName.value, errors: [''] },
            email: { value: data.profileInfo.email.value, errors: [''] },
            profilePicUrl: { value: data.profileInfo.profilePicUrl.value, errors: [''] },
          }
          setSavedProfileInfo(nextProfileInfo);
      } catch (error) {
        console.error(error);
        // show error toast
      }
    }
    // TODO: show loading state
    if (userId) {
      loadInitialUserProfileData();
    }
  }, []);

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
            headers: {
              "Content-Type": blob.type,
            },
            body: blob
          });
          const data = await response.json();
          dispatch({ type: 'uploaded_avatar', data })
        } catch (err) {
          console.error(err)
        }
      }    
    }
    // should tell user about successful upload
    setIsFileUploading(false);
  }

  const handleAddLink = () => {
    dispatch({ type: 'added_link' });
  }

  const handleRemoveLink = async (linkId: number) => {
    const userId = window.sessionStorage.getItem('id'); // temp auth flow
    const action: Action = { type: 'removed_link', linkId };
    dispatch(action);
    const nextState = userReducer(state, action);
    if (nextState.links.length < 1) {
      await clearLinksInStore(userId);
      setShowToast(true);
    }
  }

  const handleSave = () => {
    if (submitBtn.current) {
      submitBtn.current.click();
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = window.sessionStorage.getItem('id'); // temp auth flow
    if (!isProfileDetailsOpen) {
      const action: Action = { type: 'saved_links' };
      dispatch(action);
      const nextState = userReducer(state, action);
      const isError = nextState.links.some(link => link.status.isError === true);
      if (!isError) {
        const res = await saveLinks(state.links, userId);
        console.log(res);
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
        try {
          const res = await saveProfileInfo(state.profileInfo, userId);
          console.log(res.data);
          if (!res.errors && res.data) {
            setSavedProfileInfo(res.data);
            setShowToast(true); // show success toast after successful save
          } else if (res.errors) {
            // display validation errors
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // should handle error and notify user
        // errors from client-side validation
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
                    : <Links state={state} dispatch={dispatch} handleRemoveLink={handleRemoveLink} />}
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
