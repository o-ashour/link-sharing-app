import CodepenIcon from '../../components/icons/CodepenIcon';
import GitHubIcon from '../../components/icons/GitHubIcon';
import FrontendMentorIcon from '../../components/icons/FrontendMentorIcon';
import TwitterIcon from '../../components/icons/TwitterIcon';
import LinkedInIcon from '../../components/icons/LinkedInIcon';
import YouTubeIcon from '../../components/icons/YouTubeIcon';
import FacebookIcon from '../../components/icons/FacebookIcon';
import TwitchIcon from '../../components/icons/TwitchIcon';
import DevToIcon from '../../components/icons/DevToIcon';
import CodewarsIcon from '../../components/icons/CodewarsIcon';
import FreeCodeCampIcon from '../../components/icons/FreeCodeCampIcon';
import GitLabIcon from '../../components/icons/GitLabIcon';
import HashnodeIcon from '../../components/icons/HashnodeIcon';
import StackOverflowIcon from '../../components/icons/StackOverflowIcon';

import { ReactElement } from 'react';

export enum LinkShareSupportedPlatforms {
  GitHub = 'GitHub',
  FrontendMentor = 'Frontend Mentor',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  YouTube = 'YouTube',
  Facebook = 'Facebook',
  Twitch = 'Twitch',
  DevTo = 'Dev.to',
  Codewars = 'Codewars',
  Codepen = 'Codepen',
  FreeCodeCamp = 'freeCodeCamp',
  GitLab = 'GitLab',
  Hashnode = 'Hashnode',
  StackOverflow = 'Stack Overflow',
}
  

export const linkSharePlatformsConfigs: { [key in LinkShareSupportedPlatforms]: {
  iconComponent: ReactElement<any, any>,
  iconPath: string;
  iconDescription: string;
  readableName: string;
} } = {
  GitHub: {
    iconComponent: <GitHubIcon />,
    iconPath: '/icon-github.svg',
    iconDescription: 'GitHub icon',
    readableName: 'GitHub',
  },
  FrontendMentor: {
    iconComponent: <FrontendMentorIcon />,
    iconPath: '/icon-frontend-mentor.svg',
    iconDescription: 'Frontend Mentor icon',
    readableName: 'Frontend Mentor',
  },
  Twitter: {
    iconComponent: <TwitterIcon />,
    iconPath: '/icon-twitter.svg',
    iconDescription: 'Twitter icon',
    readableName: 'Twitter',
  },
  LinkedIn: {
    iconComponent: <LinkedInIcon />,
    iconPath: '/icon-linkedin.svg',
    iconDescription: 'LinkedIn icon',
    readableName: 'LinkedIn',
  },
  YouTube: {
    iconComponent: <YouTubeIcon />,
    iconPath: '/icon-youtube.svg',
    iconDescription: 'YouTube icon',
    readableName: 'YouTube',
  },
  Facebook: {
    iconComponent: <FacebookIcon />,
    iconPath: '/icon-facebook.svg',
    iconDescription: 'Facebook icon',
    readableName: 'Facebook',
  },
  Twitch: {
    iconComponent: <TwitchIcon />,
    iconPath: '/icon-twitch.svg',
    iconDescription: 'Twitch icon',
    readableName: 'Twitch',
  },
  Devto: {
    iconComponent: <DevToIcon />,
    iconPath: '/icon-devto.svg',
    iconDescription: 'Dev.to icon',
    readableName: 'Dev.to',
  },
  Codewars: {
    iconComponent: <CodewarsIcon />,
    iconPath: '/icon-codewars.svg',
    iconDescription: 'Codewars icon',
    readableName: 'Codewars',
  },
  Codepen: {
    iconComponent: <CodepenIcon />,
    iconPath: '/icon-codepen.svg',
    iconDescription: 'Codepen icon',
    readableName: 'Codepen',
  },
  FreeCodeCamp: {
    iconComponent: <FreeCodeCampIcon />,
    iconPath: '/icon-freecodecamp.svg',
    iconDescription: 'freeCodeCamp icon',
    readableName: 'freeCodeCamp',
  },
  GitLab: {
    iconComponent: <GitLabIcon />,
    iconPath: '/icon-gitlab.svg',
    iconDescription: 'GitLab icon',
    readableName: 'GitLab',
  },
  Hashnode: {
    iconComponent: <HashnodeIcon />,
    iconPath: '/icon-hashnode.svg',
    iconDescription: 'Hashnode icon',
    readableName: 'Hashnode',
  },
  StackOverflow: {
    iconComponent: <StackOverflowIcon />,
    iconPath: '/icon-stack-overflow.svg',
    iconDescription: 'Stack Overflow icon',
    readableName: 'Stack Overflow',
  },
}