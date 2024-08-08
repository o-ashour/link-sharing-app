import { LinkShareSupportedPlatforms } from "./config";

export interface ProfileInfo {
  firstName: { value: string, errors: string[] },
  lastName: { value: string, errors: string[] },
  email: { value?: string, errors: string[] },
  profilePicUrl: { value?: string, errors: string[] },
};

export interface Link {
  id: number,
  platform: LinkShareSupportedPlatforms,
  url: string,
  status: { isError: boolean, message: string },
};