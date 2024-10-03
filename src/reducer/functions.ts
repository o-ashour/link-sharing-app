import {
  linkSharePlatformsConfigs,
  LinkShareSupportedPlatforms,
} from "@/config";
import { Data, ProfileInfo, State } from "@/lib/definitions";

export function reOrderAndGetLinks(
  state: State,
  action: {
    type: "moved_link";
    draggedLinkId: string;
    dropzoneLinkId: string | number;
  },
  draggedLink: {
    id: number;
    platform: LinkShareSupportedPlatforms;
    url: string;
    status: { isError: boolean; message: string };
  }
) {
  const dropzoneLinkIdx = state.links.findIndex(
    (link) => link.id === action.dropzoneLinkId
  );
  const arr = [
    ...state.links.slice(0, dropzoneLinkIdx + 1),
    draggedLink,
    ...state.links.slice(dropzoneLinkIdx + 1),
  ];
  const filteredArr = arr.filter(
    (link, idx) => link !== draggedLink || idx === dropzoneLinkIdx + 1
  );
  return filteredArr;
}

export function validateLinks(state: State) {
  return state.links.map((link) => {
    const isUrlValid = linkSharePlatformsConfigs[link.platform].urlRegex.test(
      link.url
    );

    if (!link.url) {
      return { ...link, status: { isError: true, message: "Empty Url" } };
    } else if (!isUrlValid) {
      return { ...link, status: { isError: true, message: "Invalid Url" } };
    } else {
      return link;
    }
  });
}

export function validateFile(action: { type: "changed_avatar"; blob: Blob }) {
  const errors = [];
  const MAX_FILE_SIZE = 3000 * 1000; // max nMegabytes = max nBytes * nKilobytes
  const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
  const isFileTypeValid = ACCEPTED_IMAGE_TYPES.some(
    (fileType) => fileType === action.blob.type
  );
  if (action.blob.size > 0 && !isFileTypeValid) {
    errors.push("Invalid file type.");
  }
  if (action.blob.size >= MAX_FILE_SIZE) {
    errors.push("Max file size exceeded.");
  }
  return errors;
}

export function validateProfileInfo(state: State) {
  let userInfo = { ...state.profileInfo };

  if (
    !userInfo.firstName.value ||
    !userInfo.lastName.value ||
    !userInfo.email.value
  ) {
    if (!userInfo.firstName.value) {
      userInfo = {
        ...userInfo,
        firstName: {
          ...userInfo.firstName,
          errors: ["First name field is required"],
        },
      };
    }
    if (!userInfo.lastName.value) {
      userInfo = {
        ...userInfo,
        lastName: {
          ...userInfo.lastName,
          errors: ["Last name field is required"],
        },
      };
    }
    if (!userInfo.email.value) {
      userInfo = {
        ...userInfo,
        email: { ...userInfo.email, errors: ["Email field is required"] },
      };
    }
  }
  return userInfo;
}

export function updateLinkUrl(state: State, action: { type: "edited_url"; url: string; linkId: number; }) {
  const foundIdx = state.links.findIndex(
    (link) => link.id === action.linkId
  );
  const arr = state.links.map((link, idx) => {
    if (idx === foundIdx) {
      return {
        ...link,
        url: action.url,
        status: { isError: false, message: "" },
      };
    } else {
      return link;
    }
  });
  return arr;
}

export function getInitialState(action: { type: "loaded_dashboard"; data: Data; }, state: State) {
  return {
    links: action.data.links,
    profileInfo: {
      firstName: {
        ...state.profileInfo.firstName,
        value: Boolean(action.data.profileInfo.firstName.value)
          ? action.data.profileInfo.firstName.value
          : "",
      },
      lastName: {
        ...state.profileInfo.lastName,
        value: Boolean(action.data.profileInfo.lastName.value)
          ? action.data.profileInfo.lastName.value
          : "",
      },
      email: {
        ...state.profileInfo.email,
        value: Boolean(action.data.profileInfo.email.value)
          ? action.data.profileInfo.email.value
          : "",
      },
      profilePicUrl: {
        ...state.profileInfo.profilePicUrl,
        value: Boolean(action.data.profileInfo.profilePicUrl.value)
          ? action.data.profileInfo.profilePicUrl.value
          : "",
      },
    },
  };
}

export function createLink() {
  const now = Date.now();
  const newLink = {
    id: now,
    platform: LinkShareSupportedPlatforms["GitHub"],
    url: "",
    status: { isError: false, message: "" },
  };
  return newLink;
}

export function updateLinkPlatform(state: State, action: { type: "selected_platform"; linkId: number; selectedPlatformId: LinkShareSupportedPlatforms; }) {
  const foundIdx = state.links.findIndex(
    (link) => link?.id == action.linkId
  );
  const arr = state.links.map((link, idx) => {
    if (idx === foundIdx) {
      return { ...link, platform: action.selectedPlatformId };
    } else {
      return link;
    }
  });
  return arr;
}

export function reset(state: State) {
  const nextLinks = state.links.map((link) => {
    return { ...link, status: { isError: false, message: "" } };
  });

  const nextProfileInfo = { ...state.profileInfo };
  Object.entries(nextProfileInfo).map(([k, v]) => {
    nextProfileInfo[k as keyof ProfileInfo] = {
      value: v.value || "",
      errors: [""],
    };
  });

  const nextState = {
    links: nextLinks,
    profileInfo: nextProfileInfo
  }
  return nextState;
}
