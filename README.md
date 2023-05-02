# MultiMeet
![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![GitHub Workflow Status](https://img.shields.io/github/workflow/status/parmus/multimeet/build-and-push-docker-image)](https://github.com/parmus/multimeet/actions/workflows/build-and-push-docker-image.yaml)

_(This project has been deprecated and abandoned. Feel free to steal it, if you find it useful in any way)_

Simple drop-in replacement for https://meet.google.com/ for meeting rooms

**Features**
- Choose which calendar to show
- Detects and shows Microsoft Teams links in invites
- Configurable whether to open Microsoft Teams links in browser or Microsoft Teams application

## Usage
MultiMeet is publicly hosted at https://multimeet.parmus.dk for anyone to use

Alternatively, you're also free to host MultiMeet yourself.

## Installation

### Usage Helm chart

[Helm](https://helm.sh) must be installed to use the charts.  Please refer to
Helm's [documentation](https://helm.sh/docs) to get started.

Once Helm has been set up correctly, add the repo as follows:

  helm repo add multimeet https://parmus.github.io/multimeet

If you had already added this repo earlier, run `helm repo update` to retrieve
the latest versions of the packages.  You can then run `helm search repo
multimeet` to see the charts.

To install the multimeet chart:

    helm install multimeet multimeet/multimeet

To uninstall the chart:

    helm delete multimeet

## External resources
https://icon-icons.com/icon/videoconference-remote-work-communication-meeting-online/156845
https://developers.google.com/identity/branding-guidelines
