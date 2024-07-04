'use client'

import PreviewHeader from '../../components/layout/PreviewHeader';
import Preview from '../../components/content/Preview';
import Toast from '../../components/UI/Toast';
import { icons } from '../../config/index';

export default function Page() {
  const toastLinkCopiedMsg = 'The link has been copied to your clipboard!'

  const isSuccessful = false;
  const isAnimate = false;

  return (
    <section>
      <div id='background-section' className='hidden md:block md:bg-purple-300 md:absolute md:w-full md:h-[22rem] lg:h-[22.25rem] md:rounded-b-3xl' />
      <PreviewHeader />
      <main className='pb-8 space-y-20 overflow-hidden relative'>
        <Preview />
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
