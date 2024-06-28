'use client'

import Button from '../../components/UI/Button';
import { useState } from 'react';
import NoLink from '../../components/content/NoLink';
import AddedLink from '../../components/content/AddedLink';
import Header from '../../components/layout/Header';
import ProfileDetails from '../../components/content/ProfileDetails';
import PreviewHeader from '../../components/layout/PreviewHeader';
import Preview from '../../components/content/Preview';

export default function Page() {
  const [isFirstLinkAdded, setIsFirstLinkAdded] = useState(false);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleClick = () => {
    if (!isFirstLinkAdded) {
      setIsFirstLinkAdded(true);
    }
  }

  const handleBackToEditorClick = () => {
    setIsPreviewOpen(false);
  }

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
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
    <section>
      { !isPreviewOpen ?
        ( <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} handlePreviewClick={handlePreviewClick} isProfileDetailsOpen={isProfileDetailsOpen} /> )
        : 
        ( 
          <>
            <div className='hidden md:block md:bg-purple-300 md:absolute md:w-full md:h-[22rem] md:rounded-b-3xl'/>
            <div>
              <PreviewHeader handleClick={handleBackToEditorClick} />
            </div>
          </>

        )
      }
      {
        !isPreviewOpen ?
        (
          <div className="p-4 md:p-6 md:pt-0">
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
              <div>
                <Button variant='secondary' handleClick={handleClick}>
                  + Add new link
                </Button>
                {!isFirstLinkAdded ? <NoLink /> : <AddedLink />}
              </div> : 
              <ProfileDetails />
            }

            </article>
            <div className="p-4 md:px-10 md:py-6 md:flex md:justify-end">
                <Button className='md:w-24' disabled={!isFirstLinkAdded && !isProfileDetailsOpen }>Save</Button>
            </div>
          </div>
        ) : ( <Preview /> )
      }  
    </section>
  )
}
