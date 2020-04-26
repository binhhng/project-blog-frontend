# Project blog frontend
## Setting:
1. Connect to Backend
    - Setting in 2 file ```.env.development.local``` and ```.env.production.local```
2. Setting router
    - Setting in ```src/configs/routers/index.js```
3. Setting Provider
    - Setting in ```src/utils/provider/index.js```

## Usage:
1. Running with command:
    - install package ( first time clone code )
    > npm install
    - Start
    > npm run start
    - Build
    > npm run build
2. Catching error from backend
```javascript
import { DecodeError } from '@utils'

try {
  ...
} catch (e => {
  console.log(DecodeError(e))
})
```
3. Using alias
    - Đối với các thư mục cấp 0 từ ```src```, vui lòng tạo file ```index.js``` để ```export``` các component ở trong thư mục cấp 0 đó.
    - Sau khi ```export``` các bạn có thể ```import``` theo cách sau.
```javascript
import { ... } from '@components'
import { ... } from '@configs'
import { ... } from '@pages'
import { ... } from '@tools'
import { ... } from '@utils'
```
4. Support Dynamic Import
```javascript
import('@pages/login').then(({ default: Component }) => {
  return <Component />
})
```
5. Support i18next
    - Edit file ```index``` in folder ```config/i18n``` to translate
6. Support eslint 
    - delete ```src/``` in file ```.eslintignore``` and add script ```"prestart": "npm run eslint-fix"``` into file ```package.json``` to use
7. This is a best guide for you!