#

import os
# import config

print("Starting production deploy...")

if input("You are about to deploy to production. Are you sure? (y/n) ") != "y":
    exit()

print("Running Tests....")

tests = os.system(f'yarn test')
if tests != 0:
    print("ERROR: Tests Failed")
    exit()


print("Building app....")
os.system(f'yarn build')


print("Deploying built files to server....")
os.system(f'scp -r ../dist/* jmilanes@159.89.52.125:/var/www/project-whiteboard.com')
print("Deploy Done!")
