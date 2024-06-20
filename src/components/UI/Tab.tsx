import LinkIcon from '../icons/LinkIcon';

const Component: React.FC = () => {
  return (
    <button id='nav-tab-btn' className='flex text-grey-300 font-semibold hover:text-purple-300 active:text-purple-300 active:bg-purple-100 w-32 h-11 px-7 py-3 rounded-md gap-x-3 items-center'>
      <figure>
        <LinkIcon />
      </figure>
      {/* below is a heading but unsure which level */}
      <span>
        Title
      </span>
    </button>
  )
}

export default Component;