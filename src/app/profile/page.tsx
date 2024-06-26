'use client'

import Button from '../../components/UI/Button';
import { useState } from 'react';
import NoLink from '../../components/content/NoLink';
import AddedLink from '../../components/content/AddedLink';
import Header from '../../components/layout/Header';
import ProfileDetails from '../../components/content/ProfileDetails';

export default function Page() {
  const [isFirstLinkAdded, setIsFirstLinkAdded] = useState(false);
  const [isProfileDetailsOpen, setIsProfileDetailsOpen] = useState(false);

  const handleClick = () => {
    if (!isFirstLinkAdded) {
      setIsFirstLinkAdded(true);
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

  return (
    <section>
      <Header setIsProfileDetailsOpen={setIsProfileDetailsOpen} />

        <div className="p-4">
          <article className="p-6 space-y-10">
            <div className="space-y-2">
              <h1 className="text-grey-400 text-2xl font-bold">
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
          <div className="border-t border-grey-200 p-4">
            <Button disabled={!isFirstLinkAdded}>Save</Button>
          </div>
        </div>
    </section>
  )
}
