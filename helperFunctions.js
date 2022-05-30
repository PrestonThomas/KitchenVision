/* eslint-disable prettier/prettier */
//file name: helperFunctions.js

const credentials = require('./config.json');

// For security reasons, we're using a file named config.json to store our API key. This file is not tracked by git, so it won't be committed to Gitea or GitHub.
// Please create a file named config.json with the following content: { "apiKey": "YOUR_API_KEY" } and save it in the same directory as this file.
// For our API key, please ask Preston.

async function checkForLabels(base64) {

    return await
      fetch('https://vision.googleapis.com/v1/images:annotate?key=' + credentials.apiKey, {
        method: 'POST',
        body: JSON.stringify({
          'requests': [
            {
              'image': {
                'content': base64,
              },
              'features': [
                {
                  'type': 'TEXT_DETECTION',
                },
              ],
            },
          ],
        }),
      }).then((response) => {
        console.log(response);
        return response.json();
      }, (err) => {
        console.error('promise rejected');
        console.error(err);
      });
  }
export default checkForLabels;