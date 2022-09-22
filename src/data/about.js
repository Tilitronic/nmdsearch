import { Sources } from "../components/Sources.js"

const introText = `
The MDSearch page was created primarily to search for the meaning of 
an English word in several sources at once. When I watched cartoons or 
read books in English and looked for definitions of unfamiliar words, 
I often found myself having to look up the word in several places because 
the first place provided unclear definition, definition that don't fit or 
no definition at all. It annoyed me!
`

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
        text: 'The web page is build using JS with React frontend library. Some APIs functional and user managing is realised with backend writed on Node.js. For storing logged users data the page is using Mongo database free plane. Styling for now is realised with Material UI library. Frontend is hosted for free on XXX and backend — on heroku. The whole code is avaliable on my github.'
    },
    {
        header: 'Contact',
        text: 'You can contact mi with mail'
    },
    {
        header: 'License',
        text: 'The whole thing is coverd with MIT license wich you are agreed with using the web page services.'
    }
  ]