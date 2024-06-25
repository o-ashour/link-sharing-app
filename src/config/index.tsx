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
import EmailIcon from '../components/icons/EmailIcon';
import PasswordIcon from '../components/icons/PasswordIcon';
import LinksIconHeader from '../components/icons/LinksIconHeader';
import ProfileDetailsIconHeader from '../components/icons/ProfileDetailsIconHeader';

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
  iconComponentForPreviewBtn: ReactElement<any, any>,
  iconPath: string;
  iconDescription: string;
  readableName: string;
  themeColor: string;
  previewBtnThemeType: string;
} } = {
  GitHub: {
    iconComponent: <GitHubIcon />,
    iconComponentForPreviewBtn: <GitHubIcon id='preview-btn' />, 
    iconPath: '/icons/platforms/icon-github.svg',
    iconDescription: 'GitHub icon',
    readableName: 'GitHub',
    themeColor: '#1A1A1A',
    previewBtnThemeType: 'dark',
  },
  FrontendMentor: {
    iconComponent: <FrontendMentorIcon />,
    iconComponentForPreviewBtn: <FrontendMentorIcon id='preview-btn' />, 
    iconPath: '/icons/platforms/icon-frontend-mentor.svg',
    iconDescription: 'Frontend Mentor icon',
    readableName: 'Frontend Mentor',
    themeColor: '#FFFFFF',
    previewBtnThemeType: 'light',
  },
  Twitter: {
    iconComponent: <TwitterIcon />,
    iconComponentForPreviewBtn: <TwitterIcon id='preview-btn'/>,
    iconPath: '/icons/platforms/icon-twitter.svg',
    iconDescription: 'Twitter icon',
    readableName: 'Twitter',
    themeColor: '#43B7E9',
    previewBtnThemeType: 'dark',
  },
  LinkedIn: {
    iconComponent: <LinkedInIcon />,
    iconComponentForPreviewBtn: <LinkedInIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-linkedin.svg',
    iconDescription: 'LinkedIn icon',
    readableName: 'LinkedIn',
    themeColor: '#2D68FF',
    previewBtnThemeType: 'dark',
  },
  YouTube: {
    iconComponent: <YouTubeIcon />,
    iconComponentForPreviewBtn: <YouTubeIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-youtube.svg',
    iconDescription: 'YouTube icon',
    readableName: 'YouTube',
    themeColor: '#EE3939',
    previewBtnThemeType: 'dark',
  },
  Facebook: {
    iconComponent: <FacebookIcon />,
    iconComponentForPreviewBtn: <FacebookIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-facebook.svg',
    iconDescription: 'Facebook icon',
    readableName: 'Facebook',
    themeColor: '#2442AC',
    previewBtnThemeType: 'dark',
  },
  Twitch: {
    iconComponent: <TwitchIcon />,
    iconComponentForPreviewBtn: <TwitchIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-twitch.svg',
    iconDescription: 'Twitch icon',
    readableName: 'Twitch',
    themeColor: '#EE3FC8',
    previewBtnThemeType: 'dark',
  },
  DevTo: {
    iconComponent: <DevToIcon />,
    iconComponentForPreviewBtn: <DevToIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-devto.svg',
    iconDescription: 'Dev.to icon',
    readableName: 'Dev.to',
    themeColor: '#333333',
    previewBtnThemeType: 'dark',
  },
  Codewars: {
    iconComponent: <CodewarsIcon />,
    iconComponentForPreviewBtn: <CodewarsIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-codewars.svg',
    iconDescription: 'Codewars icon',
    readableName: 'Codewars',
    themeColor: '#8A1A50',
    previewBtnThemeType: 'dark',
  },
  Codepen: {
    iconComponent: <CodepenIcon />,
    iconComponentForPreviewBtn: <CodepenIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-codepen.svg',
    iconDescription: 'Codepen icon',
    readableName: 'Codepen',
    themeColor: '#1e1f26',
    previewBtnThemeType: 'dark',
  },
  FreeCodeCamp: {
    iconComponent: <FreeCodeCampIcon />,
    iconComponentForPreviewBtn: <FreeCodeCampIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-freecodecamp.svg',
    iconDescription: 'freeCodeCamp icon',
    readableName: 'freeCodeCamp',
    themeColor: '#302267',
    previewBtnThemeType: 'dark',
  },
  GitLab: {
    iconComponent: <GitLabIcon />,
    iconComponentForPreviewBtn: <GitHubIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-gitlab.svg',
    iconDescription: 'GitLab icon',
    readableName: 'GitLab',
    themeColor: '#EB4925',
    previewBtnThemeType: 'dark',
  },
  Hashnode: {
    iconComponent: <HashnodeIcon />,
    iconComponentForPreviewBtn: <HashnodeIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-hashnode.svg',
    iconDescription: 'Hashnode icon',
    readableName: 'Hashnode',
    themeColor: '#0330D1',
    previewBtnThemeType: 'dark',
  },
  StackOverflow: {
    iconComponent: <StackOverflowIcon />,
    iconComponentForPreviewBtn: <StackOverflowIcon id='preview-btn' />,
    iconPath: '/icons/platforms/icon-stack-overflow.svg',
    iconDescription: 'Stack Overflow icon',
    readableName: 'Stack Overflow',
    themeColor: '#EC7100',
    previewBtnThemeType: 'dark',
  },
}

export const icons = {
  email: <EmailIcon />,
  password: <PasswordIcon />,
  links: <LinksIconHeader />,
  profile: <ProfileDetailsIconHeader />
}