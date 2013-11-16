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

## Development Environment

    $ git clone git@github.com:webrebels/webrebels.org.git
    $ cd webrebels.org
    $ npm install

To simplify development, you can have your local server restart
automatically whenever you change something by launching it through
Runlol:

    $ npm install -g runlol
    $ runlol

Or just do:

    $ node server.js

## Deploying

Install the [jitsu-cli](https://www.nodejitsu.com/documentation/jitsu/), and log in the conference account and deploy:

    $ jitsu deploy

That's it, a new version is deployed. This app is deployed as a subdomain on (2012.webrebels.org)[http://2012.webrebels.org]

