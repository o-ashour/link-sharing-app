'use client'

import Button from '../../components/UI/Button';
import { useEffect, useState } from 'react';
import LinksInitial from '../../components/content/LinksInitial';
import Links from '../../components/content/Links';
import Header from '../../components/layout/Header';
import ProfileDetails from '../../components/content/ProfileDetails';
import Toast from '../../components/UI/Toast';
import { icons, linkSharePlatformsConfigs, LinkShareSupportedPlatforms } from '../../config/index';
import PhoneMockup from '../../components/content/PhoneMockup';

export default function Page() {
  const [isFirstLinkAdded, setIsFirstLinkAdded] = useState(false);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [isSuccessfullySaved, setIsSuccessfullySaved] = useState(false);
  const [linksArr, setLinksArr] = useState<{id: number, platform: LinkShareSupportedPlatforms, url: string, status: {isError: boolean, message: string}}[] | []>([]);
  const [profileInfo, setProfileInfo] = useState<{ firstName: { value: string, isError: boolean }, lastName: { value: string, isError: boolean }, email: { value: string, isError: boolean }, profilePicUrl: { value: string, isError: boolean } }>({ firstName: { value: '', isError: false }, lastName: { value: '', isError: false }, email: { value: '', isError: false }, profilePicUrl: { value: '', isError: false } });
  const [savedProfileInfo, setSavedProfileInfo] = useState<{ firstName: { value: string, isError: boolean }, lastName: { value: string, isError: boolean }, email: { value: string, isError: boolean }, profilePicUrl: { value: string, isError: boolean } }>({ firstName: { value: '', isError: false }, lastName: { value: '', isError: false }, email: { value: '', isError: false }, profilePicUrl: { value: '', isError: false } });

  useEffect(() => {
    if (isSuccessfullySaved) {
      setTimeout(() => setIsSuccessfullySaved(false), 2000)
    }
  }, [isSuccessfullySaved]);

  useEffect(() => {
    if (!isProfileDetailsOpen) {
      setLinksArr(prevVal => {
        const arr = [...prevVal];
        arr.forEach(link => {
          link.status.isError = false;
        });
        return arr;
      })
    } else {

      setProfileInfo(prevVal => {
        const userInfo: any = { ...prevVal };
        Object.keys(userInfo).forEach(field => {
          userInfo[field].isError = false;
        })
        return userInfo;
      })
    }
  }, [isProfileDetailsOpen])

  const handleProfileInfoChange = (e: any) => {
    const getChangedProperty = () => {
      if (e.target.id === 'first-name') {
        return { firstName: { value: e.target.value, isError: false } }
      } else if (e.target.id === 'last-name') {
        return { lastName: { value: e.target.value, isError: false } }
      } else if (e.target.id === 'email') {
        return { email: { value: e.target.value, isError: false } }
      } else {
        return;
      }
    }
    const changedProperty = getChangedProperty();

    setProfileInfo(prevVal => {
      const userInfo = {
        ...prevVal,
        ...changedProperty,
      }
      return userInfo;
    })
  }

  const handleAddLinkBtnClick = () => {
    if (!isFirstLinkAdded) {
      setIsFirstLinkAdded(true);
    }
    const now = Date.now();

    setLinksArr(prevVal => {
      const link = {
        id: now,
        platform: LinkShareSupportedPlatforms['GitHub'],
        url: '',
        status: { isError: false, message: '' },
      }
      const arr: any = [...prevVal];
      arr.push(link);
      return arr;
    })
  }

  const handleSaveBtnClick = () => {
    if (!isProfileDetailsOpen) {
      setLinksArr(prevVal => {
        const arr = [...prevVal];
        arr.forEach(link => {
          const isUrlValid = linkSharePlatformsConfigs[link.platform].urlRegex.test(link.url);

          if (!link.url || !isUrlValid) {
            link.status.isError = true;
            if (!link.url) {
              link.status.message = 'Empty Url';
            } else if (!isUrlValid) {
              link.status.message = 'Invalid Url'
            }
          } else {
            link.status.isError = false;
            link.status.message = '';
          }
        })
        const isError = arr.some(link => link.status.isError === true);
        if (!isError) {
          setIsSuccessfullySaved(true);
        }
        return arr;
      })
    } else {
      setProfileInfo(prevVal => {
        const userInfo = {
          ...prevVal,
        }
        const emailRegex = /.+@.+\..+/;
        const isEmailValid = emailRegex.test(userInfo.email.value) || !userInfo.email.value;

        if (!userInfo.firstName.value || !userInfo.lastName.value || !isEmailValid) {
          if (!userInfo.firstName.value) {
            userInfo.firstName.isError = true;
          }
          if (!userInfo.lastName.value) {
            userInfo.lastName.isError = true;
          }
          if (!isEmailValid) {
            console.log(isEmailValid)
            userInfo.email.isError = true;
          }
        } else {
          setIsSuccessfullySaved(true);
          setSavedProfileInfo(userInfo);
        }
        return userInfo;
      })
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
      <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} isProfileDetailsOpen={isProfileDetailsOpen}  />
      <main className='lg:flex relative overflow-hidden'>
        <PhoneMockup linksArr={linksArr} profileInfo={profileInfo} savedProfileInfo={savedProfileInfo} />
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
            {!isProfileDetailsOpen ?
              <div id='links'>
                <Button variant='secondary' handleClick={handleAddLinkBtnClick}>
                  + Add new link
                </Button>
                {!isFirstLinkAdded ? 
                  <LinksInitial /> 
                  : <Links linksArr={linksArr} setLinksArr={setLinksArr} setIsFirstLinkAdded={setIsFirstLinkAdded} />}
              </div> :
              <ProfileDetails handleProfileInfoChange={handleProfileInfoChange} profileInfo={profileInfo} />
            }
          </article>
          <div className="p-4 md:px-10 md:py-6 md:flex md:justify-end">
            <Button className='md:w-24' disabled={!isFirstLinkAdded && !isProfileDetailsOpen} handleClick={handleSaveBtnClick}>Save</Button>
          </div>
        </div>
        <div className={`fixed -bottom-20 w-full transition-transform duration-200 ease-in ${isSuccessfullySaved && '-translate-y-40 lg:-translate-y-24'}`}>
          <div className='w-fit mx-auto'>
            <Toast iconComponent={icons.changesSaved} message={toastMsg} />
          </div>
        </div>
      </main>
    </section>
  )
}
