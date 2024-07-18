import { LinkShareSupportedPlatforms } from "./config";

export interface ProfileInfo {
  firstName: { value: string, isError: boolean }, 
  lastName: { value: string, isError: boolean }, 
  email: { value?: string, isError: boolean }, 
  profilePicUrl: { value?: string, isError: boolean },
};

export interface Link {
  id: number,
  platform: LinkShareSupportedPlatforms,
  url: string,
  status: { isError: boolean, message: string },
};