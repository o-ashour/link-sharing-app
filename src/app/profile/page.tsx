'use client'

import Button from '../../components/UI/Button';
import { useState } from 'react';
import NoLink from '../../components/content/NoLink';
import AddedLink from '../../components/content/AddedLink';
import Header from '../../components/layout/Header';

export default function Page() {
  const [isLinksOpen, setIsLinksOpen] = useState(false);

  const handleClick = () => {
    if (!isLinksOpen) {
      setIsLinksOpen(true);
    }
  }

  return (
    <section>
      <Header />

        <div className="p-4">
          <article className="p-6 space-y-10">
            <div className="space-y-2">
              <h1 className="text-grey-400 text-2xl font-bold">
                Customize your links
              </h1>
              <p className="text-grey-300">
                Add/edit/remove links below and then share all your profiles with the world!
              </p>
            </div>

            <div>
              <Button variant='secondary' handleClick={handleClick}>
                + Add new link
              </Button>
              {!isLinksOpen ? <NoLink /> : <AddedLink />}
            </div>
          </article>
          <div className="border-t border-grey-200 p-4">
            <Button disabled={!isLinksOpen}>Save</Button>
          </div>
        </div>
    </section>
  )
}
