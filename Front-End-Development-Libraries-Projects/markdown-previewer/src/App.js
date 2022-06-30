import React from "react";
import { marked } from "marked";
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      markdown: `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:

Here's some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There are also [links](https://www.freecodecamp.org).

> Block Quotes (not working yet)

- And of course, there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That looks like this.

1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/FreeCodeCamp_logo.svg/320px-FreeCodeCamp_logo.svg.png)
      `,
    }
  }

  updateMarkdown(markdown) {
    this.setState({ markdown });
  }

  render() {

    marked.setOptions({
      breaks: true
    })

    return (
      <div className="App">
        <div className="container">

          <div className='col text-center'>
            <div className='mark-input'>
              <div className="editorHeader">
              Editor
              </div>
              <textarea
                value={this.state.markdown}
                onChange={(text) => { this.updateMarkdown(text.target.value) }}
                id="editor"
              ></textarea>
            </div>
          </div>
          <div className="previewerHeader">
            Previewer
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: marked(this.state.markdown) }}
            id="preview"
          ></div>

        </div>
      </div>
    );
  }
}
