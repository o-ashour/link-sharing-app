'use client'

import Button from '@/components/UI/Button';
import { 
  useEffect, 
  useState, 
  useRef, 
  useReducer, 
  FormEvent } from 'react';
import LinksInitial from '@/components/content/LinksInitial';
import Links from '@/components/content/Links';
import Header from '@/components/layout/Header';
import ProfileDetails from '@/components/content/ProfileDetails';
import Toast from '@/components/UI/Toast';
import { icons } from '@/config/index';
import PhoneMockup from '@/components/content/PhoneMockup';
import { userReducer } from '@/userReducer';
import { ProfileInfo, ToastMessages, Action } from '@/lib/definitions';
import { 
  clearLinksInStore, 
  getUserData, 
  logout, 
  saveLinks, 
  saveProfileInfo
} from '@/lib/actions';
import { toast, ToastContainer } from 'react-toastify';
import { Skeleton } from '@mui/material';

export default function Page() {
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const initialProfileInfo: ProfileInfo = {
    firstName: { value: '', errors: [''] },
    lastName: { value: '', errors: [''] },
    email: { value: '', errors: [''] },
    profilePicUrl: { value: '', errors: [''] },
  }

  const [savedProfileInfo, setSavedProfileInfo] = useState<ProfileInfo>(initialProfileInfo);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const submitBtn = useRef<HTMLButtonElement>(null);

  const initialState = {
    links: [],
    profileInfo: initialProfileInfo,
  }
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    if (showSuccessToast) {
      setTimeout(() => setShowSuccessToast(false), 2000)
    }
  }, [showSuccessToast]);

  useEffect(() => {
    dispatch({ type: 'reset_errors' })
  }, [isProfileDetailsOpen]);

  useEffect(() => {
    if (isEmailChanged) {
      const message = 'You will be logged out once you change your email and save'
      toast.warn(message, {
        hideProgressBar: true,
      });
    }
  }, [isEmailChanged]);

  useEffect(() => {
    const loadInitialUserProfileData = async () => {
      try {
        setIsLoading(true);
        const data = await getUserData();
        setData(data);
        dispatch({ type: 'loaded_dashboard', data })
          const nextProfileInfo = {
            firstName: { value: data?.profileInfo.firstName.value, errors: [''] },
            lastName: { value: data?.profileInfo.lastName.value, errors: [''] },
            email: { value: data?.profileInfo.email.value, errors: [''] },
            profilePicUrl: { value: data?.profileInfo.profilePicUrl.value, errors: [''] },
          }
          setSavedProfileInfo(nextProfileInfo);
      } catch (error) {
        setShowSuccessToast(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadInitialUserProfileData();
  }, []);

  const showErrorToast = (messages: string[]) => {
    messages.forEach(message => {
      toast.error(message, {
        hideProgressBar: true,
      });
    })
  }

  const handleFileUploadChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsFileUploading(true);
    if (e.target.files && e.target.files.length > 0) {
      const blob = e.target.files[0];
      const action: Action = { type: 'changed_avatar', blob };
      dispatch(action);
      const nextState = userReducer(state, action);
      const isError = nextState.profileInfo.profilePicUrl.errors[0];

      if (!isError) {
        try {
          const response = await fetch('/api/upload-image', {
            method: 'POST',
            headers: {
              "Content-Type": blob.type,
            },
            body: blob
          });
          const data = await response.json();
          dispatch({ type: 'uploaded_avatar', data })
        } catch (err) {
          setShowSuccessToast(true);
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
    const action: Action = { type: 'removed_link', linkId };
    dispatch(action);
    const nextState = userReducer(state, action);
    if (nextState.links.length < 1) {
      try {
        await clearLinksInStore();
        setShowSuccessToast(true);
      } catch (error) {
        showErrorToast([ToastMessages.error]);
      }
    }
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
        try {
          setIsLoading(true);
          const promise = saveLinks(state.links);
          toast.promise(promise, { pending: 'Saving' });
          const res = await promise;
          if (res?.errors) {
            dispatch({ type: 'failed_server_validation', nextState: { ...state, links: res.nextLinks }});
            showErrorToast(res.errors);
          } else {
            setShowSuccessToast(true);
          }
        } catch (error) {
          showErrorToast([ToastMessages.error]);
        } finally {
          setIsLoading(false);
        }
      }
    } else {
      const action: Action = { type: 'saved_profile' };
      dispatch(action);
      const nextState = userReducer(state, action);
      const isError = Object.values(nextState.profileInfo).some(value => value.errors[0])
      if (!isError) {
        try {
          setIsLoading(true);
          const promise = saveProfileInfo(state.profileInfo);
          toast.promise(promise, { pending: 'Saving' });
          const res = await promise;
          if (res.errors) {
            dispatch({ type: 'failed_server_validation', nextState: {...state, profileInfo: res.nextProfileInfo }});
            showErrorToast(res.errors);
          } else if (res.data) {
            setSavedProfileInfo(res.data.nextProfileInfo);
            setShowSuccessToast(true);
            if (res.data.isEmailChanged) logout();
          }
        } catch (error) {
          showErrorToast([ToastMessages.error]);
        } finally {
          setIsLoading(false);
          setIsEmailChanged(false);
        }
      }
    }
  }

  const handleLogout = () => {
    logout()
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

  return (
    <section className='max-w-screen-xl mx-auto'>
      <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} isProfileDetailsOpen={isProfileDetailsOpen} />
      <main className='lg:flex relative overflow-hidden'>
        <PhoneMockup state={state} savedProfileInfo={savedProfileInfo} isLoading={isLoading} data={data} />
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
                  {
                    (Object.keys(data).length < 1) ? 
                    <Skeleton height={250} />
                    : 
                    state.links.length < 1 ?
                    <LinksInitial /> :
                     <Links state={state} dispatch={dispatch} handleRemoveLink={handleRemoveLink} />}
                </div> :
                <ProfileDetails state={state} dispatch={dispatch} handleFileUploadChange={handleFileUploadChange} isFileUploading={isFileUploading} setIsEmailChanged={setIsEmailChanged} isEmailChanged={isEmailChanged} />
              }
              <button aria-label='hidden-submit-button-for-design' type='submit' className='hidden' ref={submitBtn}>Submit</button>
            </form>

          </article>
          <div className="p-4 md:px-10 md:py-6 md:flex md:justify-end">
            <Button className='md:w-24' disabled={(state.links.length < 1) && !isProfileDetailsOpen || isFileUploading} handleClick={handleSave}>Save</Button>
          </div>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <ToastContainer />
        <div className={`fixed -bottom-20 w-full transition-transform duration-200 ease-in ${showSuccessToast && '-translate-y-40 lg:-translate-y-24'}`}>
          <div className='w-fit mx-auto'>
            <Toast iconComponent={icons.changesSaved} message={ToastMessages.success} />
          </div>
        </div>
      </main>
    </section>
  )
}
