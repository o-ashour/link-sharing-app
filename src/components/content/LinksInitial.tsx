import IllustrationEmpty from '@/components/illustrations/IllustrationEmpty';

const Component: React.FC = () => {
  return (
    <div className="relative mt-6 px-5 py-14 space-y-6 lg:space-y-4">
      <figure className="w-32 mx-auto md:hidden">
        <IllustrationEmpty width='125' height='80' />
      </figure>
      <figure className='w-64 mx-auto hidden md:block'>
        <IllustrationEmpty />
      </figure>

      <div className='space-y-6 md:space-y-7'>
        <h2 className="text-2xl font-bold text-center text-grey-400 md:text-3xl md:mt-11">
          Let&apos;s get you started
        </h2>
        <p className="text-grey-300 text-center md:px-14 lg:px-18 2xl:px-28">
          Use the &ldquo;Add new link&rdquo; button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
        </p>
      </div>
    </div>
  )
}

export default Component;