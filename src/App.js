import './index.css';

// import logoImg from './assets/images/logo-devlinks-small.svg';
import EmailIcon from './components/icons/EmailIcon';
import PasswordIcon from './components/icons/PasswordIcon';
import LinksIconHeader from './components/icons/LinksIconHeader';
import ProfileDetailsIconHeader from './components/icons/ProfileDetailsIconHeader';
import PreviewIconHeader from './components/icons/PreviewIconHeader';
import IllustrationEmpty from './components/illustrations/IllustrationEmpty';
import DragAndDropIcon from './components/icons/DragAndDropIcon';
import GitHubIcon from './components/icons/GitHubIcon';
import ChevronDownIcon from './components/icons/ChevronDownIcon';
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react';
import FrontendMentorIcon from './components/icons/FrontendMentorIcon';
import TwitterIcon from './components/icons/TwitterIcon';
import LinkedInIcon from './components/icons/LinkedInIcon';
import YouTubeIcon from './components/icons/YouTubeIcon';
import FacebookIcon from './components/icons/FacebookIcon';
import TwitchIcon from './components/icons/TwitchIcon';
import DevToIcon from './components/icons/DevToIcon';
import CodewarsIcon from './components/icons/CodewarsIcon';
import FreeCodeCampIcon from './components/icons/FreeCodeCampIcon';
import GitLabIcon from './components/icons/GitLabIcon';
import HashnodeIcon from './components/icons/HashnodeIcon';
import StackOverflowIcon from './components/icons/StackOverflowIcon';
import TextInputWithIcon from './components/UI/TextInputWithIcon';
import UploadImageIcon from './components/icons/UploadImageIcon';
import ArrowRightIcon from './components/icons/ArrowRightIcon';
import CodepenIcon from './components/icons/CodepenIcon';

function App() {
  return (
    <div className="App">
      {/***** login page *********/}
      <header>
        <figure>
          {/* <img src={logoImg} alt='logo' /> */}
        </figure>
        <h1>
          devlinks
        </h1>
      </header>

      <main>
        <h2>Login</h2>
        <p>Add your details below to get back into the app</p>
        
        <form method='post'>
          {/* tuck label into bottom container ? */}
          <label for='email'>Email address</label>
          <div name='email-input' id='email-input'>
            {/* check semantic, accessibility */}
            <div name='email-icon' id='email-icon'>
              <EmailIcon />
            </div>
            <input type='email' name='email' placeholder='dude@place.gg' autoComplete='email' required />
          </div>
        

          <label for='password'>Password</label>
          <div name='password-input' id='password-input'>
            <div name='password-icon' id='password-icon'>
              <PasswordIcon />
            </div>
            <input type='password' name='password' placeholder='Enter your password' required />
          </div>

          <button type='submit'>Login</button>
        </form>
        <section>
          <p>Don&apos;t have an account?</p>
          <button>Create account</button>
        </section>
      </main>


      {/***** signup page *********/}
      <header>
        <figure>
          {/* <img src={logoImg} alt='logo' /> */}
        </figure>
        <h1>
          devlinks
        </h1>
      </header>

      <main>
        <h2>Create account</h2>
        <p>Let&apos;s get you started sharing your links!</p>

        <form method='post'>
          <label for='email'>Email address</label>
          <div name='email-input' id='email-input'>
            <div name='email-icon' id='email-icon'>
              <EmailIcon />
            </div>
            <input type='email' name='email' placeholder='dude@place.gg' required />
          </div>


          <label for='password'>Create password</label>
          <div name='password-input' id='password-input'>
            <div name='password-icon' id='password-icon'>
              <PasswordIcon />
            </div>
            <input type='password' name='password' placeholder='At least 8 characters' min={8} required />
          </div>

          <label for='password'>Confirm password</label>
          <div name='password-input' id='password-input'>
            <div name='password-icon' id='password-icon'>
              <PasswordIcon />
            </div>
            <input type='password' name='password' placeholder='At least 8 characters' min={8} required />
          </div>

          <p>Password must contain at least 8 characters</p>

          <button type='submit'>Create new account</button>
        </form>
        <section>
          <p>Already have an account?</p>
          <button>Login</button>
        </section>
      </main>


      {/***** customize-your-links page 1/2 *********/}
      <header>
        <figure>
          {/* <img src={logoImg} alt='logo' /> */}
        </figure>
        <nav>
          <ul>
            <li>
              <button name='links' id='links'>
                <LinksIconHeader />
              </button>
            </li>
            <li>
              <button name='profile-details' id='profile-details'>
                <ProfileDetailsIconHeader />
              </button>
            </li>
          </ul>
        </nav>
        <button name='preview' id='preview'>
          <PreviewIconHeader />
        </button>
      </header>

      <main>
        <h1>
          Customize your links
        </h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
        <button name='add-link' id='add-link'>
          + Add new link
        </button>

        {/* check semantic, accessibility */ }
        <figure>
          <IllustrationEmpty />
        </figure>

        <h2>
          Let&apos;s get you started
        </h2>
        <p>
          Use the &ldquo;Add new link&rdquo; button to get started. Once you have more than one link, you can reorder and edit them. We&apos;re here to help you share your profiles with everyone!
        </p>
      </main>

      <footer>
        <button>
          Save
        </button>
      </footer>

      {/***** customize-your-links page 2/2 *********/}
      <header>
        <figure>
          {/* <img src={logoImg} alt='logo' /> */}
        </figure>
        <nav>
          <ul>
            <li>
              <button name='links' id='links'>
                <LinksIconHeader />
              </button>
            </li>
            <li>
              <button name='profile-details' id='profile-details'>
                <ProfileDetailsIconHeader />
              </button>
            </li>
          </ul>
        </nav>
        <button name='preview' id='preview'>
          <PreviewIconHeader />
        </button>
      </header>

      <main>
        <h1>
          Customize your links
        </h1>
        <p>Add/edit/remove links below and then share all your profiles with the world!</p>
        <button name='add-link' id='add-link'>
          + Add new link
        </button>

        <div name='links' id='links'>
          <ul>
            <li>
              <DragAndDropIcon />
              <span>Link #1</span>
              <button>Remove</button>

              <div name='platform-dropdown' id='platforms'>
                <label for="platform-dropdown">Platform</label>

                <Menu __demoMode>
                  <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
                    Options
                    {/* <ChevronDownIcon className="size-4 fill-white/60" /> */}
                    <ChevronDownIcon />
                  </MenuButton>
                  <Transition
                    enter="transition ease-out duration-75"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <MenuItems
                      anchor="bottom end"
                      className="w-52 origin-top-right rounded-xl border border-white/5 bg-white/5 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
                    >
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-grey-300 data-[focus]:bg-white/10">
                          <GitHubIcon />
                          GitHub
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 text-grey-300 data-[focus]:bg-white/10">
                          <FrontendMentorIcon />
                          Frontend Mentor
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          {/* <Square2StackIcon className="size-4 fill-white/30" /> */}
                          <TwitterIcon />
                          Twitter
                        </button>
                      </MenuItem>
                      <div className="my-1 h-px bg-white/5" />
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <LinkedInIcon />
                          Linkedin
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <YouTubeIcon />
                          YouTube
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <FacebookIcon />
                          Facebook
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <TwitchIcon />
                          Twitch
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                        <DevToIcon />
                          Dev.to
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <CodewarsIcon />
                          Codewars
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <CodepenIcon />
                          Codepen
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <FreeCodeCampIcon />
                          freeCodeCamp
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <GitLabIcon />
                          GitLab
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <HashnodeIcon />
                          Hashnode
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                          <StackOverflowIcon />
                          Stack Overflow
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>

              <TextInputWithIcon />
            </li>
          </ul>
        </div>        
      </main>

      <footer>
        <button>
          Save
        </button>
      </footer>


      {/***** profile details *********/}
      <header>
        <figure>
          {/* <img src={logoImg} alt='logo' /> */}
        </figure>
        <nav>
          <ul>
            <li>
              <button name='links' id='links'>
                <LinksIconHeader />
              </button>
            </li>
            <li>
              <button name='profile-details' id='profile-details'>
                <ProfileDetailsIconHeader />
              </button>
            </li>
          </ul>
        </nav>
        <button name='preview' id='preview'>
          <PreviewIconHeader />
        </button>
      </header>

      <main>
        <h1>
          Profile Details
        </h1>
        <p>
          Add your details to create a personal touch to your profile.
        </p>

        <form>

          <div id='profile-picture-upload' name='profile-picture-upload'>
            <figure>
              <figcaption>Profile picture</figcaption>
              <div>
                <UploadImageIcon />
                <p>+ Upload Image</p>
              </div>
            </figure>
            <small>Image must be below 1024x1024px. Use PNG or JPG format.</small>
          </div>

          <label htmlFor='first-name'>First name</label>
          <input name='first-name' id='first-name' type='text' />

          <label htmlFor='last-name'>Last name</label>
          <input name='last-name' id='last-name' type='text' />

          <label htmlFor='email'>Email</label>
          <input name='email' id='email' type='email' />

          <section>
            <button type='submit'>
              Save
            </button>
          </section>
        </form>
      </main>

      {/***** preview *********/}
      <header>
        <nav>
          <ul>
            <li>
              <button>
                Back to Editor
              </button>
            </li>
            <li>
              <button>
                Share Link
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main>

        {/* avatar */}
        {/* <div className="flex -space-x-2 overflow-hidden"> */}
        <figure>
          {/* <img
            className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
            src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          /> */}
          <figcaption>
            <h1>
              Ali el-Shorbagy
            </h1>
            <p>ali_s@example.com</p>
          </figcaption>
        </figure>

        <ul id='links'>
          <li>
            <button>
              <GitHubIcon />
              GitHub
              <ArrowRightIcon />
            </button>
          </li>
          <li>
            <button>
              <YouTubeIcon />
              YouTube
              <ArrowRightIcon />
            </button>
          </li> 
          <li>
            <button>
              <LinkedInIcon />
              LinkedIn
              <ArrowRightIcon />
            </button>
          </li> 
        </ul>
      </main>

    </div>
  );
}

export default App;
