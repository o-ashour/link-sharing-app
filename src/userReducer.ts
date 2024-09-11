// TODO:
// 1. Move types to /types.ts ?

import { LinkShareSupportedPlatforms } from "./config";
import { linkSharePlatformsConfigs } from "./config";
import { ProfileInfo, Data } from "./types";

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

export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'added_link': {
      const now = Date.now();
      const link = {
        id: now,
        platform: LinkShareSupportedPlatforms['GitHub'],
        url: '',
        status: { isError: false, message: '' },
      };
      return { ...state, links: [...state.links, link] }
    }
    case 'removed_link': {
      const foundLink = state.links.find(link => link.id === action.linkId);
      return { ...state, links: state.links.filter(link => link !== foundLink) };
    }
    case 'selected_platform': {
      const foundIdx = state.links.findIndex(link => link?.id == action.linkId);
      const arr = state.links.map((link, idx) => {
        if (idx === foundIdx) {
          return { ...link, platform: action.selectedPlatformId }
        } else {
          return link;
        }
      })
      return { ...state, links: arr };
    }
    case 'moved_link': {
      const draggedLink = state.links.find(link => link.id === parseInt(action.draggedLinkId));
      if (!draggedLink) {
        return state;
      } else {
        if (action.dropzoneLinkId === 'top-dropzone') {
          const arr = [
            draggedLink,
            ...state.links,
          ]
          const filteredArr = arr.filter((link, idx) => (link !== draggedLink) || (idx === 0));
          return { ...state, links: filteredArr };
        } else {
          const dropzoneLinkIdx = state.links.findIndex(link => link.id === action.dropzoneLinkId);
          const arr = [
            ...state.links.slice(0, dropzoneLinkIdx + 1),
            draggedLink,
            ...state.links.slice(dropzoneLinkIdx + 1),
          ]
          const filteredArr = arr.filter((link, idx) => (link !== draggedLink) || (idx === dropzoneLinkIdx + 1));
          return { ...state, links: filteredArr };
        };
      }
    }
    case 'edited_url': {
      const foundIdx = state.links.findIndex(link => link.id === action.linkId)
      const arr = state.links.map((link, idx) => {
        if (idx === foundIdx) {
          return { ...link, url: action.url, status: { isError: false, message: '' } }
        } else {
          return link;
        }
      })
      return { ...state, links: arr };
    }
    case 'saved_links': {
      const arr = state.links.map(link => {
        const isUrlValid = linkSharePlatformsConfigs[link.platform].urlRegex.test(link.url);

        if (!link.url) {
          return { ...link, status: { isError: true, message: 'Empty Url' } };
        } else if (!isUrlValid) {
          return { ...link, status: { isError: true, message: 'Invalid Url' } };
        } else {
          return link;
        }
      })
      return { ...state, links: arr };
    }
    case 'reset_errors': {
      const nextLinksState = state.links.map(link => {
        return { ...link, status: { isError: false, message: '' } };
      });

      const nextProfileInfo = { ...state.profileInfo };
      Object.entries(nextProfileInfo).map(([k, v]) => {
        nextProfileInfo[k as keyof ProfileInfo] = { value: v.value || '', errors: [''] }
      })
      return { ...state, links: nextLinksState, profileInfo: nextProfileInfo };
    }
    case 'saved_profile': {
      let userInfo = { ...state.profileInfo };
      if (!userInfo.firstName.value || !userInfo.lastName.value || !userInfo.email.value) {
        if (!userInfo.firstName.value) {
          userInfo = { ...userInfo, firstName: { ...userInfo.firstName, errors: ['First name field is required'] } }
        }
        if (!userInfo.lastName.value) {
          userInfo = { ...userInfo, lastName: { ...userInfo.lastName, errors: ['Last name field is required'] } }
        }
        if (!userInfo.email.value) {
          userInfo = { ...userInfo, email: { ...userInfo.email, errors: ['Email field is required'] } }
        }
      }
      return { ...state, profileInfo: userInfo };
    }
    case 'edited_profile': {
      const nextState = { ...state.profileInfo, [action.fieldName]: { value: action.fieldValue, errors: [''] } }
      return { ...state, profileInfo: nextState }
    }
    case 'changed_avatar': {
      const errors = [];
      const MAX_FILE_SIZE = 3000 * 1000; // max nMegabytes = max nBytes * nKilobytes
      const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
      const isFileTypeValid = ACCEPTED_IMAGE_TYPES.some(fileType => fileType === action.blob.type);
      if (action.blob.size > 0 && !isFileTypeValid) {
        errors.push('Invalid file type.')
      }
      if (action.blob.size >= MAX_FILE_SIZE) {
        errors.push('Max file size exceeded.')
      }
      if (errors[0]) {
        return { ...state, profileInfo: { ...state.profileInfo, profilePicUrl: { ...state.profileInfo.profilePicUrl, errors } } };
      }
      return { ...state, profileInfo: { ...state.profileInfo, profilePicUrl: { ...state.profileInfo.profilePicUrl, errors: [''] } } };
    }
    case 'uploaded_avatar': {
      return { ...state, profileInfo: { ...state.profileInfo, profilePicUrl: action.data }}
    }
    case 'loaded_dashboard': {
      const nextState = {
        links: action.data.links,
        profileInfo: {
          firstName: { ...state.profileInfo.firstName, value: Boolean(action.data.profileInfo.firstName.value) ? action.data.profileInfo.firstName.value : '' },
          lastName: { ...state.profileInfo.lastName, value: Boolean(action.data.profileInfo.lastName.value) ? action.data.profileInfo.lastName.value : '' },
          email: { ...state.profileInfo.email, value: Boolean(action.data.profileInfo.email.value) ? action.data.profileInfo.email.value : '' },
          profilePicUrl: { ...state.profileInfo.profilePicUrl, value: Boolean(action.data.profileInfo.profilePicUrl.value) ? action.data.profileInfo.profilePicUrl.value : '' },
        }
      }
      return nextState;
    }
    case 'failed_server_validation': {
      return action.nextState;
    }
    default:
      return state;
  }
}