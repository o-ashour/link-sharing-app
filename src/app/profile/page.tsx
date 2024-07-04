'use client'

import Button from '../../components/UI/Button';
import { useState } from 'react';
import LinksInitial from '../../components/content/LinksInitial';
import Links from '../../components/content/Links';
import Header from '../../components/layout/Header';
import ProfileDetails from '../../components/content/ProfileDetails';
import Toast from '../../components/UI/Toast';
import { icons } from '../../config/index';
import PhoneMockup from '../../components/content/PhoneMockup';

export default function Page() {
  const [isFirstLinkAdded, setIsFirstLinkAdded] = useState(false);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);

  const [linksArr, setLinksArr] = useState<Array<any>>([]);

  const handleClick = () => {
    if (!isFirstLinkAdded) {
      setIsFirstLinkAdded(true);
    }
    setLinksArr(prevVal => {
      const arr: Array<Number> = [].concat(...prevVal);
      const linkId = arr.length + 1;
      arr.push(linkId);
      return arr;
    });
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

  const isSuccessful = false;
  const isAnimate = false;

  return (
    <section className='max-w-screen-xl mx-auto'>
      <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} isProfileDetailsOpen={isProfileDetailsOpen}  />
      <main className='lg:flex relative overflow-hidden'>
        <PhoneMockup />
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
                <Button variant='secondary' handleClick={handleClick}>
                  + Add new link
                </Button>
                {!isFirstLinkAdded ? 
                  <LinksInitial /> 
                  : <Links linksArr={linksArr} setLinksArr={setLinksArr} setIsFirstLinkAdded={setIsFirstLinkAdded} />}
              </div> :
              <ProfileDetails />
            }
          </article>
          <div className="p-4 md:px-10 md:py-6 md:flex md:justify-end">
            <Button className='md:w-24' disabled={!isFirstLinkAdded && !isProfileDetailsOpen}>Save</Button>
          </div>
        </div>
        {isSuccessful && 
          (
            <div className={`fixed -bottom-14 w-full transition-transform duration-200 ease-in ${isAnimate && '-translate-y-24'}`}>
              <div className='w-fit mx-auto'>
                <Toast iconComponent={icons.changesSaved} message={toastMsg} />
              </div>
            </div>
          )
        }
      </main>
    </section>
  )
}
