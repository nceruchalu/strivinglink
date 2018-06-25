# strivinglink

## About strivinglink.com
|         |                                                    |
| ------- | -------------------------------------------------- |
| Author  | Nnoduka Eruchalu                                   |
| Date    | 05/21/2017                                         |
| Website | [http://strivinglink.com](http://strivinglink.com) |

This is Striving Link Ltd's website.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)

## Installation

* `git clone <repository-url>` this repository
* `cd strivinglink`
* `npm install`

## Running / Development

* `broccoli serve`
* Visit your app at [http://localhost:4200](http://localhost:4200)
* Visit specific pages by using the filename in `app/templates/` and changing
  `.hbs` to `.html`. Ex: http://localhost:4200/404.html

### Building

* `rm -rf dist && broccoli build dist` (development)
* `rm -rf dist && BROCCOLI_ENV=production broccoli build dist` (production)

### Deploying
* Create webfaction app with the following settings:
  * App category: `Static`
  * App type: `Static/CGI/PHP-7.0`
* Upload assets to S3 bucket dedicated to static files
  * Make everything public
  * Set metadata `Cache-Control`: `public, max-age=31536000, s-maxage=31536000`
* Ensure you're using a Cloudfront distribution that is configured to
  **Compress Objects Automatically**
* Copy over new files to server:

  ```
  scp dist/* dist/.htaccess dist/assets/img/favicon/browserconfig.xml <destination>

  ```

## Further Reading / Useful Links

* [brocolijs](http://broccolijs.com/)
