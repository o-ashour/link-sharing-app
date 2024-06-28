import Button from '../UI/Button';

const Component: React.FC<{handleClick: () => void}> = ({ handleClick }) => {
  return (
    <header className='p-4 md:p-6'>
      <nav className='md:p-4 md:bg-white md:relative md:rounded-xl'>
        <ul className='flex flex-col space-y-3 xs:flex-row xs:space-x-4 xs:space-y-0 md:justify-between'>
          <li className='flex-1 md:flex-none'>
            <Button handleClick={handleClick} variant='secondary'>
              Back to Editor
            </Button>
          </li>
          <li className='flex-1 md:flex-none'>
            <Button>
              Share Link
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Component;