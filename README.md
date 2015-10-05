# Lala

> A pattern-based ignore generator.

Lala is a command line tool for generating common, pattern-based ignore files.  Lala leverages the well-built templates provided in the [github/gitignore](https://github.com/github/gitignore) repository using the the [GitHub API](https://developer.github.com/v3/).  Lala was inspired by [karan/joe](https://github.com/karan/joe).

## Installation

```
npm install -g lala
```

## Usage

### Listing Ignore Templates

To get a list of available ignore templates:

```sh
# Lists available ignore templates
lala list
```

### Using Ignore Templates

Lala can output both individual and combinations of ignore templates.  Lala outputs them as console messages which can be piped into another file for use.

Command line pattern:

```sh
lala  ignore <template...>
```

As a real-world example, let's build an ignore file for a [Git](https://git-scm.com) repository containing a [Visual Studio](https://www.visualstudio.com) solution with [ASP.NET](http://www.asp.net/)/C# projects that leverage [node](https://nodejs.org)/[npm](https://www.npmjs.com) tooling:

```sh
# Create a .gitignore file containing ignore patterns for Visual Studio and node projects
lala ignore visualstudio node > .gitignore

# Another way
lala ignore visualstudio >> .gitignore
lala ignore node >> .gitignore

# Using Mercurial instead
lala visualstudio node > .hgignore
```

## GitHub API Authentication

GitHub allows up to 60 requests per hour, unauthenticated, for a given IP address.  In all but the most extreme usage scenarios you would have a difficult time exceeding that rate limit with Lala alone.

### Seeing Your Rate Limit

To see your rate limit for the current configuration of Lala:

```sh
# Check your rate limit
lala limit
```

### Authenticating With GitHub API

If the rate limit is not enough, or you just want to authenticate anyways, the following optional command line parameters are available:

```
-u --username  (optional) GitHub username for authentication
-p --password  (optional) GitHub password or API token for authentication
```

### Using Authentication

```sh
# Check your authenticated limit
lala -u <user> -p <pass_or_token> limit

# Look at the template list
lala -u <user> -p <pass_or_token> list

# Create a .gitignore file containing ignore patterns for Visual Studio and node projects
lala -u <user> -p <pass_or_token> ignore visualstudio node > .gitignore
```
