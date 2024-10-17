```bash

# enter /ios folder
cd ios

# run this if throw an error
brew link --overwrite cocoapods

# using npm
npx pod-install

# using npm
npm run ios


# run this inside /ios if throw an error when 'npm run ios'
rm -rf Pods && pod install    

```