# Running qodo-cover locally with Docker

navigate to this directory

```sh
cd templated_tests/go/taskmgr
```

build the image

```sh
docker build --platform linux/amd64 -t taskmgr-qodo-cover --build-arg ACTION_REF=v0.1.12 .
```

run

```sh
docker run --platform linux/amd64 -v $(pwd):/app -w /app -e OPENAI_API_KEY=$OPENAI_API_KEY taskmgr-qodo-cover cover-agent-pro \
  --project-language "go" \
  --project-root "." \
  --test-command "go test ./... -coverprofile=coverage.out && gocover-cobertura < coverage.out > coverage.xml" \
  --code-coverage-report-path "coverage.xml" \
  --coverage-type "cobertura" \
  --model "gpt-4o-2024-11-20" \
  --max-iterations "3" \
  --desired-coverage "100" \
  --run-each-test-separately "false" \
  --source-folder "." \
  --test-folder "."
```

## Task Manager CLI

This repository provides a simple command-line task manager application written in Go. It manages tasks with basic operations like adding and listing them, and marking tasks as done. It’s organized into multiple packages and includes test coverage reporting in Cobertura format.

### Prerequisites

- Go 1.23+ (or a fairly recent version of Go)
- `gocover-cobertura` tool for Cobertura coverage conversion

### Installation

Make sure you have Go and `gocover-cobertura` installed:

```bash
go install github.com/t-yuki/gocover-cobertura@latest
```

### Building

To build the `taskmgr` binary:

```bash
go build ./cmd/taskmgr
```

This will create a `taskmgr` executable in the current directory.

### Usage

```bash
./taskmgr [command] [arguments]
```

#### Commands

- `add <title>`: Adds a new task with the given title.
- `list`: Lists all tasks.
- `done <index>`: Marks the task at `<index>` as done.

Example:

```bash
./taskmgr add "Buy milk"
./taskmgr list
./taskmgr done 0
```

### Running Tests

To run all tests:

```bash
go test ./...
```

### Generating Coverage Report

To generate a Cobertura format coverage report:

```bash
go test ./... -coverprofile=coverage.out && gocover-cobertura < coverage.out > coverage.xml
```

This creates `coverage.xml` which you can use with CI tools that support Cobertura reports.
