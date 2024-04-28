# School Bus Driver Support App

## Project Overview

The School Bus Driver Support App is a specialized navigation tool designed for K-12 school bus drivers, prioritizing safety and efficiency in school transportation.

## Team members
University of Michigan, Kexuan Huang, Wengran Xiao, Lingxiao Du, Zhongyi Zhang, Xiwei Yang

## Developer Guide

### Run in Local

#### Install Related Packages

```bash
npm install
```

#### Run in Expo Go

```bash
npx expo start --clear
```

#### Run in iOS emulator

```bash
npm run ios --clear
```

#### Connect to Supabase

Create a `supabaseClient.js` file in the root directory and store the API initialization in it. The file should be like:

```js
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = YOUR_URL;
const supabaseKey = YOUR_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
```
You can find your URL and keys in the Supabase settings.

#### Connect to Google Map API

Create a `Secrets.js` file in the root directory and store the Google Map API in it. The file should be like:

```js
const GOOGLE_API_KEY = YOUR_API_KEY
export { GOOGLE_API_KEY }
```

## Main features

### Routes and Navigation
<img width="400" alt="image" src="https://github.com/SI699-FleetLab/School-Bus-Driver-Support/assets/112583498/1b9b9230-6576-4e3b-8e24-1589d0322c53">

### Post and Pre checks
<img width="400" alt="image" src="https://github.com/SI699-FleetLab/School-Bus-Driver-Support/assets/112583498/8cd7c07f-23b5-4dee-a834-2ac875c6909b">

## Edit Availability
<img width="400" alt="image" src="https://github.com/SI699-FleetLab/School-Bus-Driver-Support/assets/112583498/69129f7d-7ac0-4197-b310-c7a7d0bb2a24">

## Vehicle Detail and Damage Report
<img width="400" alt="image" src="https://github.com/SI699-FleetLab/School-Bus-Driver-Support/assets/112583498/7f9623dc-1e09-4043-beb1-04ca3e47c695">

