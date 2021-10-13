# ioc-ts-max

Provides an IoC container which can be used for registering and resolving dependencies.

# Development Decisions

Decided to go with https://github.com/bitjson/typescript-starter

Its an npm package that generates you a boiler plate typescript library that includes features such as:-

- prettier
- eslint
- testing framework
- ability to build and publish documentation

Was generated by running

`npx typescript-starter`

from the command line and filling in some basic options

# TODO

> get to a point where I can TDD the ioc container
> get the basic behaviour working (e.g. register and resolve)
> clean up remainants of boiler plate that aren't required (e.g. number.spec.ts)

> checks
> Ensure the prettier rules work automatically and we get good linting
> ensure the tests are easily runable
> Ensure the docs are good and have some examples about how to use it
> Check the readme is good

> Stretch goals
> See if we can get another app to consume this library
