import IllustrationEmpty from '../../components/illustrations/IllustrationEmpty';

const Component: React.FC = () => {
  return (
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
  )
}

export default Component;