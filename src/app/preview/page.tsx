'use client'

import PreviewHeader from '@/components/layout/PreviewHeader';
import Preview from '@/components/content/Preview';
import Toast from '@/components/UI/Toast';
import { icons } from '@/config/index';
import { useEffect, useState } from 'react';
import { getUserData } from '@/lib/actions';
import { Data, ToastMessages } from '@/lib/definitions';
import { toast, ToastContainer } from 'react-toastify';
import copy from 'copy-to-clipboard';

export default function Page() {
  const toastLinkCopiedMsg = 'The link has been copied to your clipboard!'

  const [data, setData] = useState({});
  const [isError, setIsError] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (showSuccessToast) {
      setTimeout(() => setShowSuccessToast(false), 2000)
    }
  }, [showSuccessToast]);

  const showErrorToast = (message: string) => {
    toast.error(message, {
      hideProgressBar: true,
      toastId: 'server-error',
    });
  }

  const copyToClipboard = async (text: string) => {
    if ('clipboard' in navigator) {
      try {
        await navigator.clipboard.writeText(text);
        setShowSuccessToast(true);
      } catch (error) {
        showErrorToast('Error copying to clipboard');
      }
    } else {
      copy(text);
      setShowSuccessToast(true);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data: Data = await getUserData();
        setData(data);
      } catch (error) {
        console.error(error);
        showErrorToast(ToastMessages.error)
        setIsError(true);
      }
      return;
    }
    getData();
  }, [])

  return (
    <section>
      <div id='background-section' className='hidden md:block md:bg-purple-300 md:absolute md:w-full md:h-[22rem] lg:h-[22.25rem] md:rounded-b-3xl' />
      <PreviewHeader copyToClipboard={copyToClipboard} />
      <main className='pb-8 space-y-20 overflow-hidden relative'>
        {/* error state display, TODO: refactor into component */}
        {isError ?
          <div className='px-16 py-14 space-y-14 md:relative md:bg-white md:w-[21.75rem] md:mx-auto md:rounded-2xl md:px-14 md:py-12 md:mt-24 md:drop-shadow-2xl'>
            <div className='text-center space-y-6 md:space-y-8'>
              <div className='space-y-2 md:space-y-4'>
                <h1 className='text-3xl font-bold'>
                  Something went wrong
                </h1>
                <p className='text-grey-300'>
                  <em>working hard on fixing it</em>
                </p>
                <br />
                <small>
                  &quot;If you had a school for professional fireworks people, I don&apos;t think you could cover fuses in just one class. It&apos;s just too rich a subject.&quot;
                </small>
              </div>
            </div>
          </div> :
          <Preview data={data} isError={isError} />
        }
        <div className={`fixed -bottom-20 w-full transition-transform duration-200 ease-in ${showSuccessToast && '-translate-y-40 lg:-translate-y-24'}`}>
          <div className='w-fit mx-auto'>
            <Toast iconComponent={icons.linkCopiedToClipboard} message={toastLinkCopiedMsg} />
          </div>
        </div>
        <ToastContainer />
      </main>
    </section>
  )
}
