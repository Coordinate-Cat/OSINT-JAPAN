import { converteMdToJSON } from 'md-to-json-converter'
import hljs from 'highlight.js'
import path from 'path'

const __dirname = path.resolve();
const contentPath = path.join(__dirname, '/content')
const outputPath = path.join(__dirname, '/src/data/posts.json')

export const remarkableOptions = {
  html: true,
  breaks: true,
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  typographer:  false,
  highlight: (str, lang) => {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value;
        } catch (err) {
            console.log(err)
        }
      }
  
      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {
          console.log(err)
      }
  
      return ''; 
    }
}

converteMdToJSON({
    contentPath,
    outputPath,
    remarkableOptions: remarkableOptions
  }).then(() => {
    console.log('Successfully Converted markdown files into JSON')
  }).catch((err) => {
    console.log('error:', err);
  })