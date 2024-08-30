# DEPLOYMENT STEPS
*npm run build*
vite will produce a client side output in the dist folder

From VSCode, deploy -> select the dist directory.

In Azure App Service Configuration, specify startup command to be 
*npx serve*

If deploying from the root folder, use 
*npx serve -s dist*

# React + TypeScript + Vite
