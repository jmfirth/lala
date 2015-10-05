# Lala

> A pattern-based ignore generator.

Lala is a command line program for generating common, pattern-based ignore files.  Lala leverages the well-built templates provided in the [github/gitignore](https://github.com/github/gitignore) repository using the the [GitHub API](https://developer.github.com/v3/).  Lala was inspired by [karan/joe](https://github.com/karan/joe).

## Installation

Lala is meant to be installed as a global npm module, making the program `lala` available everywhere in your terminal:

```
$ npm install -g lala
```

## Help

For command line help:

```
$ lala help
```

## Usage

### List Ignore Templates

To get a list of available ignore templates:

```sh
# Lists available ignore templates
$ lala list
```

### Output Ignore Templates

Lala can output both individual and combinations of ignore templates.  Lala outputs them as console messages which can be piped into another file for use.

Command line pattern:

```
lala ignore <template...>
```

As a real-world example, let's build an ignore file for a [Git](https://git-scm.com) repository containing a [Visual Studio](https://www.visualstudio.com) solution with [ASP.NET](http://www.asp.net/)/C# projects that leverage [node](https://nodejs.org)/[npm](https://www.npmjs.com) tooling:

```sh
# Create a file containing the ignore pattern templates for a Git repository
$ lala ignore visualstudio node > .gitignore

# Or create the file by individually appending each ignore pattern template
$ lala ignore visualstudio >> .gitignore
$ lala ignore node >> .gitignore

# Or use a Mercurial repository instead
$ lala visualstudio node > .hgignore
```

## Configuration

Lala uses the [GitHub API](https://developer.github.com/v3/) to pull down the latest templates from the [github/gitignore](https://github.com/github/gitignore) repository.  The [GitHub API](https://developer.github.com/v3/) allows up to 60 requests per hour, unauthenticated, for a given IP address.  In all but the most extreme usage scenarios you would have a difficult time exceeding that rate limit with Lala alone.

### View Current Rate Limit

To see your rate limit for the current configuration of Lala:

```sh
# Check your rate limit
$ lala limit
```

### Configure GitHub API Authorization

In the event that you need to increase your rate limit beyond what is provided anonymously, you can set your GitHub username and password or API token:

```sh
# Run the configuration wizard
$ lala config

# Or bypass the configuration wizard and send the values by command line parameters
$ lala config -u <GitHub_username> -p <GitHub_password_or_token>
```
