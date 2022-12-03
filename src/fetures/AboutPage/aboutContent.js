import { Sources } from './Sources';
function makeALink(phrase, link){
  return `<a href='${link}' target='_blank' rel='noreferrer noopener'>${phrase}</a>`;
}

const introText = `The MDSearch page as a non-commercial project was created primarily to search for the meaning of 
an English word in several sources at once. When I watched cartoons or 
read books in English and looked for definitions of unfamiliar words, 
I often found myself having to look up the word in several places because 
the first place provided unclear definition, definition that don't fit or 
no definition at all. It annoyed me! So looking for ideas for my learning 
project in React I finally came up with this page.`;

const github = makeALink('GitHub', 'https://github.com/Tilitronic/nmdsearch');
const technologiesText = `The web page is built with React library. 
Global state managing realized with React Redux and routing with 
React Router libraries. User managing and some APIs functional are 
realized with the backend written in Node.js. For storing user's 
data the page is using Mongo database (free plane). Styling ant theming is 
done mostly with SCSS, icons are from Material UI. The frontend is hosted for free on Netlify and 
backend — on Heroku. The code is available on my ${github}.`;

export const pageData = [
  {
    header: 'Indroduction',
    text: introText
  },
  {
    header: 'APIs and services',
    elements: <Sources/>
  },
  {
    header: 'Technologies',
    text: technologiesText
  },
  {
    header: 'Contact',
    text: 'You can contact me via e-mail:<br/>mdsearch.m1nkl@aleeas.com'
  },
  {
    header: 'License',
    text: 'The MDSearch page is covered by GNU General Public License v3 or any later version.'
  }
];