import { LinkShareSupportedPlatforms } from "./config";
import { linkSharePlatformsConfigs } from "./config";
import { ProfileInfo } from "./types";

export type State = {
  links: {
    id: number,
    platform: LinkShareSupportedPlatforms,
    url: string,
    status: { isError: boolean, message: string },
  }[] | [],
  profileInfo: {
    firstName: { value: string, isError: boolean },
    lastName: { value: string, isError: boolean },
    email: { value: string, isError: boolean },
    profilePicUrl: { value: string, isError: boolean },
  }
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
type ChangedAvatar = { type: 'changed_avatar', imgUrl: string };

export type Action = AddedLink | RemovedLink | SelectedPlatform | MovedLink | EditedUrl | SavedLinks | ResetErrors | SavedProfile | EditedProfile | ChangedAvatar;

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
          return { ...link, status: { isError: false, message: '' } };
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
        nextProfileInfo[k as keyof ProfileInfo] = { value: v.value, isError: false }
      })
      return { ...state, links: nextLinksState, profileInfo: nextProfileInfo };
    }
    case 'saved_profile': {
      let userInfo = { ...state.profileInfo };
      if (!userInfo.firstName.value || !userInfo.lastName.value) {
        if (!userInfo.firstName.value) {
          userInfo = { ...userInfo, firstName: { ...userInfo.firstName, isError: true } }
        }
        if (!userInfo.lastName.value) {
          userInfo = { ...userInfo, lastName: { ...userInfo.lastName, isError: true } }
        }
      }
      return { ...state, profileInfo: userInfo };
    }
    case 'edited_profile': {
      const nextState = { ...state.profileInfo, [action.fieldName]: { value: action.fieldValue, isError: false } }
      return { ...state, profileInfo: nextState }
    }
    case 'changed_avatar': {
      return { ...state, profileInfo: { ...state.profileInfo, profilePicUrl: { value: action.imgUrl, isError: false } } };
    }
    default:
      return state;
  }
}