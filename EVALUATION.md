# The steps you take to make the library great to use

There wasn't much time so I used a `typescript-starter` to generate a boiler plate typescript app
which would give me various features already setup such as

- ES Lint
- Unit testing
- Prettier
- Doc generation
- Examples of usage

These are things that I think make a library easy to maintain and contribute to

# How you set up the code for further collaborative development

## Prettier on autosave

I configured prettier and the vscode settings so that tiles are auto-formatted on a save.
This means that there's just one way to format a document and that way the team or tech lead
can decide how its formatted. This allows developers to concentrate on coding rather than formatting
documents.

## Unit testing with debugging

I ensured that it was easy to write a unit test and that it was easy to set a breakpoint and debug.
This is critical in ensuring its working from the start, as more junior developers may not be so
inclined to write unit tests if they can't figure out how to run them or debug them easily.

## Spell Checker

This was included in the `typescript-starter` package actually, but its a great idea, it means developers
can spend less time code reviewing and spell checking, We could setup a pipeline so that when there are
spelling mistakes, the build fails.

## Doc generation

To know how to use the library, The docs have lists of classes and their public methods and examples of how to use them

# Your approach to testing

I wrote my unit test first, I went for the Arrange Act Assert approach (AAA)

I wrote my unit test to show that if we resolve to a container that was registered,
when we call a method on it, we get the expected result.

# How you deal with feature gaps and edge cases

I documented feature gaps and this is how I would extend the library's functionality: -

## Functionality

- Option for singleton on transient instances
- The ability to inject dependencies into dependencies, at the moment, I think it will just work for 1 layer,
  to make this I make sure that when I generate a new instance it passes in the container, so it may inject
  the dependencies into the instance it instantiates.

## Library

- Switch testing framework / or alter setup so that you can run the test with the debug test option rather than play - however this will suffice for now
- Contributing.md - I would document which scripts do what in the package.json
- PR Template
- Issue template
