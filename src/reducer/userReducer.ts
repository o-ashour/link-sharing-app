import { State, Action } from "@/lib/definitions";
import {
  reOrderAndGetLinks,
  validateLinks,
  validateFile,
  validateProfileInfo,
  updateLinkUrl,
  getInitialState,
  createLink,
  updateLinkPlatform,
  reset,
} from "./functions";

export const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "added_link": {
      const newLink = createLink();
      return { ...state, links: [...state.links, newLink] };
    }
    case "removed_link": {
      const foundLink = state.links.find((link) => link.id === action.linkId);
      return {
        ...state,
        links: state.links.filter((link) => link !== foundLink),
      };
    }
    case "selected_platform": {
      const updatedLinks = updateLinkPlatform(state, action);
      return { ...state, links: updatedLinks };
    }
    case "moved_link": {
      const draggedLink = state.links.find(
        (link) => link.id === parseInt(action.draggedLinkId)
      );
      if (!draggedLink) {
        return state;
      } else {
        if (action.dropzoneLinkId === "top-dropzone") {
          const arr = [draggedLink, ...state.links];
          const filteredArr = arr.filter(
            (link, idx) => link !== draggedLink || idx === 0
          );
          return { ...state, links: filteredArr };
        } else {
          const reOrderedLinks = reOrderAndGetLinks(state, action, draggedLink);
          return { ...state, links: reOrderedLinks };
        }
      }
    }
    case "edited_url": {
      const updatedLinks = updateLinkUrl(state, action);
      return { ...state, links: updatedLinks };
    }
    case "saved_links": {
      const validatedLinks = validateLinks(state);
      return { ...state, links: validatedLinks };
    }
    case "reset_errors": {
      const nextState = reset(state);
      return nextState;
    }
    case "saved_profile": {
      const validatedProfileInfo = validateProfileInfo(state);
      return { ...state, profileInfo: validatedProfileInfo };
    }
    case "edited_profile": {
      const nextState = {
        ...state.profileInfo,
        [action.fieldName]: { value: action.fieldValue, errors: [""] },
      };
      return { ...state, profileInfo: nextState };
    }
    case "changed_avatar": {
      const errors = validateFile(action);
      if (errors[0]) {
        return {
          ...state,
          profileInfo: {
            ...state.profileInfo,
            profilePicUrl: { ...state.profileInfo.profilePicUrl, errors },
          },
        };
      }
      return {
        ...state,
        profileInfo: {
          ...state.profileInfo,
          profilePicUrl: { ...state.profileInfo.profilePicUrl, errors: [""] },
        },
      };
    }
    case "uploaded_avatar": {
      return {
        ...state,
        profileInfo: { ...state.profileInfo, profilePicUrl: action.data },
      };
    }
    case "loaded_dashboard": {
      const initialState = getInitialState(action, state);
      return initialState;
    }
    case "failed_server_validation": {
      return action.nextState;
    }
    default:
      return state;
  }
};