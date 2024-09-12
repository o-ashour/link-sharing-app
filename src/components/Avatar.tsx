import Image from "next/image";
import profilePicDefault from '/public/logo/logo-devlinks-small.svg';

const Component: React.FC<{ profilePic?: string }> = ({ profilePic = profilePicDefault }) => {
  return (
    <Image
      className="rounded-full object-cover ring-4 ring-purple-300"
      src={profilePic}
      alt="Profile picture"
      fill
      sizes="150px"
      priority
    />
  )
}

export default Component;