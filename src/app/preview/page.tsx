'use client'

// TODO:
// 1. Handle empty profile pic state
// 2. Handle loading state (i.e. skeleton loaders)
// 3. Look at useTransition for wrapping server actions for error handling
// 4. Check console for issues around label element FOR property when links are added
// 5. Wrapping platform buttons in Link component throws error about href being empty string

import PreviewHeader from '@/components/layout/PreviewHeader';
import Preview from '@/components/content/Preview';
import Toast from '@/components/UI/Toast';
import { icons } from '@/config/index';
import { useEffect, useState } from 'react';
import { getUserData } from '@/components/actions';
import { Data, ProfileInfo } from '@/types';

export default function Page() {
  const toastLinkCopiedMsg = 'The link has been copied to your clipboard!'

  const isSuccessful = false;
  const isAnimate = false;

  const initialProfileInfo: ProfileInfo = {
    firstName: { value: '', errors: [''] },
    lastName: { value: '', errors: [''] },
    email: { value: '', errors: [''] },
    profilePicUrl: { value: '', errors: [''] },
  }

  const initialState = {
    links: [],
    profileInfo: initialProfileInfo,
  }

  const [data, setData] = useState<Data>(initialState);

  useEffect(() => {
    const userId = window.sessionStorage.getItem('id');
    const getData = async () => {
      const data: Data = await getUserData(userId);
      console.log(data)
      setData(data);
      return;
    }
    getData();
  }, [])

  return (
    <section>
      <div id='background-section' className='hidden md:block md:bg-purple-300 md:absolute md:w-full md:h-[22rem] lg:h-[22.25rem] md:rounded-b-3xl' />
      <PreviewHeader />
      <main className='pb-8 space-y-20 overflow-hidden relative'>
        <Preview data={data} />
        {
          isSuccessful && (
            <div className={`fixed -bottom-20 w-full transition-transform duration-200 ease-in ${isAnimate && '-translate-y-24'}`}>
              <div className='w-fit mx-auto'>
                <Toast iconComponent={icons.linkCopiedToClipboard} message={toastLinkCopiedMsg} />
              </div>
            </div>
          )
        }
      </main>
    </section>
  )
}
