cd migration

SOURCE_REPO_TO_MIGRATE=$1
TARGET_REPO_TO_MIGRATE=$2

SROUCE_REPO_NAME=$3

GIT_CLONE_FOLDER=~/Desktop/migration_test
# ----------------------------------------------------------------
GIT_REMOTE=migration

rm -rf $GIT_CLONE_FOLDER
mkdir -p $GIT_CLONE_FOLDER

sleep 2

echo "SOURCE_REPO_TO_MIGRATE : $1"
echo "TARGET_REPO_TO_MIGRATE : $2"
echo "SROUCE_REPO_NAME : $3"
echo "git clone $SOURCE_REPO_TO_MIGRATE $GIT_CLONE_FOLDER/$SROUCE_REPO_NAME"

git clone "$SOURCE_REPO_TO_MIGRATE" "$GIT_CLONE_FOLDER/$SROUCE_REPO_NAME"

sleep 5

cd $GIT_CLONE_FOLDER/$SROUCE_REPO_NAME

# # # NEW_REMOTE=$(echo "${GIT_CLONE/$sourceOrg/$destOrg}") 
# # # NEW_REMOTE=$(echo "${NEW_REMOTE/$sourceProj/$destProj}") 


# echo "NEW REMOTE - $NEW_REMOTE "
echo "GIT REMOTE ADD $GIT_REMOTE $TARGET_REPO_TO_MIGRATE"
git remote add $GIT_REMOTE $TARGET_REPO_TO_MIGRATE
git fetch --all

sleep 5

# # # # # #

# # # # The actual git migration.
# # # # Get list of branches for the source repo
# # # # Push all the branches to the destination repository.
for branch in `git branch -a | grep remotes | grep -v HEAD`; do
   git branch --track ${branch#remotes/$GIT_REMOTE/} $branch
   branch=$(echo $branch | cut -d'/' -f 3)
   git checkout $branch
   git push -u $GIT_REMOTE -f
done

# # # # # Clean up local environment after migration current repository.
# git remote rm az
# cd ..
# rm -rf $SROUCE_REPO_NAME