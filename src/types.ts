// move to lib?

import { LinkShareSupportedPlatforms } from "./config";
import { signUpSchema } from "./lib/schema";
import { z } from "zod";
export interface ProfileInfo {
  firstName: { value: string, errors: string[] },
  lastName: { value: string, errors: string[] },
  email: { value: string, errors: string[] },
  profilePicUrl: { value: string, errors: string[] },
};

export interface Link {
  id: number,
  platform: LinkShareSupportedPlatforms,
  url: string,
  status: { isError: boolean, message: string },
};

/// naming conflict so duplicating
// TODO: Refactor
export interface LinkType {
  id: number,
  platform: LinkShareSupportedPlatforms,
  url: string,
  status: { isError: boolean, message: string },
};

export type Data = {
  links: {
    id: any;
    platform: any;
    url: any;
    status: {
      isError: boolean;
      message: string;
    };
  }[];
  profileInfo: {
    firstName: {
      value: any;
      errors: string[];
    };
    lastName: {
      value: any;
      errors: string[];
    };
    email: {
      value: any;
      errors: string[];
    };
    profilePicUrl: {
      value: any;
      errors: string[];
    };
  }
}

export enum ToastMessages {
  success = 'Your changes have been successfully saved!',
  error = 'Something went wrong.',
}

export type SignUpFormData = z.infer<typeof signUpSchema>