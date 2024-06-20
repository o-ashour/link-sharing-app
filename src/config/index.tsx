import CodepenIcon from '../components/icons/platforms/CodepenIcon';
import GitHubIcon from '../components/icons/platforms/GitHubIcon';
import FrontendMentorIcon from '../components/icons/platforms/FrontendMentorIcon';
import TwitterIcon from '../components/icons/platforms/TwitterIcon';
import LinkedInIcon from '../components/icons/platforms/LinkedInIcon';
import YouTubeIcon from '../components/icons/platforms/YouTubeIcon';
import FacebookIcon from '../components/icons/platforms/FacebookIcon';
import TwitchIcon from '../components/icons/platforms/TwitchIcon';
import DevToIcon from '../components/icons/platforms/DevToIcon';
import CodewarsIcon from '../components/icons/platforms/CodewarsIcon';
import FreeCodeCampIcon from '../components/icons/platforms/FreeCodeCampIcon';
import GitLabIcon from '../components/icons/platforms/GitLabIcon';
import HashnodeIcon from '../components/icons/platforms/HashnodeIcon';
import StackOverflowIcon from '../components/icons/platforms/StackOverflowIcon';

import { ReactElement } from 'react';

export enum LinkShareSupportedPlatforms {
  GitHub = 'GitHub',
  FrontendMentor = 'FrontendMentor',
  Twitter = 'Twitter',
  LinkedIn = 'LinkedIn',
  YouTube = 'YouTube',
  Facebook = 'Facebook',
  Twitch = 'Twitch',
  DevTo = 'DevTo',
  Codewars = 'Codewars',
  Codepen = 'Codepen',
  FreeCodeCamp = 'FreeCodeCamp',
  GitLab = 'GitLab',
  Hashnode = 'Hashnode',
  StackOverflow = 'StackOverflow',
}
  

export const linkSharePlatformsConfigs: { [key in LinkShareSupportedPlatforms]: {
  iconComponent: ReactElement<any, any>,
  iconPath: string;
  iconDescription: string;
  readableName: string;
} } = {
  GitHub: {
    iconComponent: <GitHubIcon />,
    iconPath: '/icons/platforms/icon-github.svg',
    iconDescription: 'GitHub icon',
    readableName: 'GitHub',
  },
  FrontendMentor: {
    iconComponent: <FrontendMentorIcon />,
    iconPath: '/icons/platforms/icon-frontend-mentor.svg',
    iconDescription: 'Frontend Mentor icon',
    readableName: 'Frontend Mentor',
  },
  Twitter: {
    iconComponent: <TwitterIcon />,
    iconPath: '/icons/platforms/icon-twitter.svg',
    iconDescription: 'Twitter icon',
    readableName: 'Twitter',
  },
  LinkedIn: {
    iconComponent: <LinkedInIcon />,
    iconPath: '/icons/platforms/icon-linkedin.svg',
    iconDescription: 'LinkedIn icon',
    readableName: 'LinkedIn',
  },
  YouTube: {
    iconComponent: <YouTubeIcon />,
    iconPath: '/icons/platforms/icon-youtube.svg',
    iconDescription: 'YouTube icon',
    readableName: 'YouTube',
  },
  Facebook: {
    iconComponent: <FacebookIcon />,
    iconPath: '/icons/platforms/icon-facebook.svg',
    iconDescription: 'Facebook icon',
    readableName: 'Facebook',
  },
  Twitch: {
    iconComponent: <TwitchIcon />,
    iconPath: '/icons/platforms/icon-twitch.svg',
    iconDescription: 'Twitch icon',
    readableName: 'Twitch',
  },
  DevTo: {
    iconComponent: <DevToIcon />,
    iconPath: '/icons/platforms/icon-devto.svg',
    iconDescription: 'Dev.to icon',
    readableName: 'Dev.to',
  },
  Codewars: {
    iconComponent: <CodewarsIcon />,
    iconPath: '/icons/platforms/icon-codewars.svg',
    iconDescription: 'Codewars icon',
    readableName: 'Codewars',
  },
  Codepen: {
    iconComponent: <CodepenIcon />,
    iconPath: '/icons/platforms/icon-codepen.svg',
    iconDescription: 'Codepen icon',
    readableName: 'Codepen',
  },
  FreeCodeCamp: {
    iconComponent: <FreeCodeCampIcon />,
    iconPath: '/icons/platforms/icon-freecodecamp.svg',
    iconDescription: 'freeCodeCamp icon',
    readableName: 'freeCodeCamp',
  },
  GitLab: {
    iconComponent: <GitLabIcon />,
    iconPath: '/icons/platforms/icon-gitlab.svg',
    iconDescription: 'GitLab icon',
    readableName: 'GitLab',
  },
  Hashnode: {
    iconComponent: <HashnodeIcon />,
    iconPath: '/icons/platforms/icon-hashnode.svg',
    iconDescription: 'Hashnode icon',
    readableName: 'Hashnode',
  },
  StackOverflow: {
    iconComponent: <StackOverflowIcon />,
    iconPath: '/icons/platforms/icon-stack-overflow.svg',
    iconDescription: 'Stack Overflow icon',
    readableName: 'Stack Overflow',
  },
}