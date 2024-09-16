import { LinkShareSupportedPlatforms } from "@/config";
import { z } from "zod";

export type SessionPayload = {
  userId: string | number;
  expiresAt: Date;
}

export type State = {
  links: {
    id: number,
    platform: LinkShareSupportedPlatforms,
    url: string,
    status: { isError: boolean, message: string },
  }[] | [],
  profileInfo: ProfileInfo,
}

type AddedLink = { type: 'added_link' };
type RemovedLink = { type: 'removed_link', linkId: number };
type SelectedPlatform = { type: 'selected_platform', linkId: number, selectedPlatformId: LinkShareSupportedPlatforms };
type MovedLink = { type: 'moved_link', draggedLinkId: string, dropzoneLinkId: string | number };
type EditedUrl = { type: 'edited_url', url: string, linkId: number };
type SavedLinks = { type: 'saved_links' };
type ResetErrors = { type: 'reset_errors' };
type SavedProfile = { type: 'saved_profile' };
type EditedProfile = { type: 'edited_profile', fieldName: string, fieldValue: string };
type ChangedAvatar = { type: 'changed_avatar', blob: Blob };
type UploadedAvatar = { type: 'uploaded_avatar', data: { value: string, errors: string[] } };
type LoadedDashboard = { type: 'loaded_dashboard', data: Data };
type FailedServerValidation = { type: 'failed_server_validation', nextState: State };

export type Action = AddedLink | RemovedLink | SelectedPlatform | MovedLink | EditedUrl | SavedLinks | ResetErrors | SavedProfile | EditedProfile | ChangedAvatar | UploadedAvatar | LoadedDashboard | FailedServerValidation;

export type ProfileInfo = {
  firstName: { value: string, errors: string[] },
  lastName: { value: string, errors: string[] },
  email: { value: string, errors: string[] },
  profilePicUrl: { value: string, errors: string[] },
};

export type ShareLink = {
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

export type SignInFormData = z.infer<typeof signInSchema>

export const signUpSchema = z
  .object({
    email: z.string().min(1, { message: 'Required' }).email(),
    password: z.string().min(1, { message: 'Required' }).min(8, { message: 'Must be at least 8 characters' }),
    confirmPassword: z.string().min(1, { message: 'Required' }).min(8, { message: 'Must be at least 8 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  })

export const signInSchema = z
  .object({
    email: z.string().min(1, { message: 'Required' }).email(),
    password: z.string().min(1, { message: 'Required' }).min(8, { message: 'Must be at least 8 characters' }),
  })