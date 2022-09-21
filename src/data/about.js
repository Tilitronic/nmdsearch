import { Sources } from "../components/Sources.js"

export const pageData = [
    {
      header: 'Indroduction',
      text: "MDSearch webpage in firs place is createt to provide definitions of English words from multiple sources. In My personal expirience during reading books or watchin cartoons in English it was often not enough to check definition just in one place, because definition always can be unclear, wrong to context or even absent, because word is a slang and I should check it in My belowed Urban Dictionary."
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