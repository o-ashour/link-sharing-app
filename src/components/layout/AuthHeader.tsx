import LogoSmall from '../logo/LogoSmall';       

const Component: React.FC = () => {
  return (
    <header className="flex items-center md:justify-center gap-1.5 sm:w-full">
      <figure>
        <LogoSmall width={40} height={40} />
      </figure>
      <h1 className="text-3xl md:text-4xl font-semibold">
        devlinks
      </h1>
    </header>
  )
}

export default Component;