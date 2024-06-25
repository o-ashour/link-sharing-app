'use client'

import Tab from '../../components/UI/Tab';
import PreviewIconHeader from '../../components/icons/PreviewIconHeader';
import Button from '../../components/UI/Button';
import IllustrationEmpty from '../../components/illustrations/IllustrationEmpty';
import LogoSmall from '../../components/logo/LogoSmall';
import { icons } from '../../config/index'

export default function Page() {
  // to be integrated into logic
  const isError = false;

  return (
    <section>
      <header className="flex justify-between items-center p-4 pl-6">
        <div className="flex-none">
          <LogoSmall />
        </div>
        <nav className="flex-2">
          <ul className='flex'>
            <li>
              <Tab icon={icons.links}/>
            </li>
            <li>
              <Tab icon={icons.profile} />
            </li>
          </ul>
        </nav>
        <Button id='nav-preview-btn' variant='secondary'>
          <PreviewIconHeader />
        </Button>
      </header>

      <form>
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
              <Button variant='secondary'>+ Add new link</Button>
              <div className="relative mt-6 px-5 py-14 space-y-6">
                <figure className="w-32 mx-auto">
                  <IllustrationEmpty width='125' height='80' />
                </figure>
                <h2 className="text-2xl font-bold text-center text-grey-400">
                  Let&apos;s get you started
                </h2>
                <p className="text-grey-300 text-center">
                  Use the &ldquo;Add new link&rdquo; button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          </article>
          <div className="border-t border-grey-200 p-4">
            <Button type='submit' disabled>Save</Button>
          </div>
        </div>
      </form>
    </section>
  )
}
