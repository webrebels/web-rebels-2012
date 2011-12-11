Webrebels.org
=============

This is the web site for the Web Rebels conference.

License
-------

Copyright (C) 2011 The Web Rebels Conference

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

Development Environment
-----------------------

Refer to
[the Heroku Dev Center](http://devcenter.heroku.com/articles/node-js)
for the recommended version of Node.js. At the time of writing, this
is version 0.4.7. We recommend that you use
[N](https://github.com/visionmedia/n) to manage your Node versions:

    $ npm install -g n
    $ n 0.4.7

Install the [Heroku Toolbelt](http://toolbelt.heroku.com/), and log in
to your Heroku account:

    $ heroku auth:login
    
Now clone the Github repo and configure it for deployment to Heroku:

    $ git clone git@github.com:webrebels/webrebels.org.git
    $ cd webrebels.org
    $ npm install
    $ git remote add staging git@heroku.com:webrebels-staging.git
    $ git remote add production git@heroku.com:webrebels.git

You can now deploy the app to the different server environments using
`git push`:

    $ git push staging
    $ git push production

You can use the Heroku Toolbelt to monitor the app:

    $ heroku logs --remote staging
    $ heroku logs --remote production


