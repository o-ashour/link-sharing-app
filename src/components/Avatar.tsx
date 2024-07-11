import Image from "next/image";
import profilePicDefault from '/Users/Protomar/Desktop/link-sharing-app/public/prototyping-imgs/1024px-Malcolm-x.jpg';

const Component: React.FC<{ profilePic?: string }> = ({ profilePic = profilePicDefault }) => {
  return (
    <Image
      className="rounded-full object-cover ring-4 ring-purple-300"
      src={profilePic}
      alt="Profile picture"
      fill
      priority
    />
  )
}

export default Component;